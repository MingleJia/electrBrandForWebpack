import React, { Component, Fragment } from 'react';
import styles from './ClassTable.scss';
import noClassImg from 'ASSETS/home/class.png';

class ClassTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrRow: [],      //课表的行
            arrHeader: [],    //课表的头 课表的列
            subjectInfo: [],    //课表信息
            loading: true, //加载中
        }
    }

    componentDidMount() {
    }
    static getDerivedStateFromProps(props) {
    //当父级传入的props发生变化的时候就执行这里 return 新的state,相当于setState
        return {
            arrRow: props.arrRow,
            arrHeader: props.arrHeader,
            subjectInfo: props.subjectInfo,
        }
    }
    //列内容
    rowRender = (index, value, subjectInfo) => {
        return (
            <div className={styles['subjectname']} key={value}>
                {
                    (value + 1) + '_' + (index + 1) in subjectInfo && subjectInfo[(value + 1) + '_' + (index + 1)].map((lesson, lessonId) => {
                        return (
                            this.LessonRender(lessonId, subjectInfo[(value + 1) + '_' + (index + 1)])
                        )
                    })
                }
            </div>
        )
    }

    //填充课表内容
    LessonRender = (lessonId, subjectInfo) => {
        return (
            <div className={styles['lesson']} key={lessonId}>
                <div className={` ${styles['name']} ${subjectInfo.length > 1 ? styles['nameSm'] : ''}`}>
                    <span className={styles['lessonname']}>
                        {subjectInfo[lessonId].subName}
                    </span>
                    <div className={` ${subjectInfo[lessonId].classType === 2 ? styles['elective'] : styles['electivehidden']} `}>选修班</div>
                </div>
                <div className={` ${styles['time']} ${subjectInfo.length > 1 ? styles['timeSm'] : ''}`}>
                    {subjectInfo[lessonId].classTime}
                </div>
            </div>
        )
    }
    render() {
        const { arrRow, arrHeader, subjectInfo, } = this.state;
        //缺省图
        const defaultPage = (
            <div className={styles['defaultImg']}>
                <img src={noClassImg} alt=""/>
                <p className={styles['text']}>暂无课表</p>
            </div>
        )
        //时间
        const classSchedule = (
            <div className={styles['classSchedule']}>
                <ul className={styles['scheduleHead']}>
                    <li className={styles['timetype']}>
                        <div className={styles['type']}>节次</div>
                    </li>
                    {
                        arrHeader.map((item, index) => {
                            return (
                                <li className={styles['timetype']} key={index}>
                                    <div className={styles['name']}>{item.indexName}</div>
                                    <div className={styles['time']}>{item.indexDate}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
        //课表内容
        const contentSchedule = (
            <div className={styles['contentSchedule']}>
                <ul className={styles['subjectList']}>
                    {
                        arrRow.map((item, index) => {
                            return (
                                <li className={styles['subject']} key={index}>
                                    <div className={styles['subjectname']}>
                                        <span className={styles['timeId']}>{item.indexName}</span>
                                    </div>
                                    {
                                        arrHeader.map((subject, value) => {
                                            return (
                                                this.rowRender(index, value, subjectInfo)
                                            )
                                        })
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
        const lessonContent = (
            <Fragment>
                {classSchedule}
                {contentSchedule}
            </Fragment>
        )
        return <Fragment>
            <div className={styles['containerLesson']}>
                { JSON.stringify(subjectInfo) === "{}" ? defaultPage : lessonContent }
            </div>
        </Fragment>
    }
}

export default ClassTable;
ClassTable.defaultProps = {};
ClassTable.propTypes = function(){};
ClassTable.propTypes = {};