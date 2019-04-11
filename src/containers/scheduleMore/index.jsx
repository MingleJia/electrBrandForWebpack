import React,{Component, Fragment} from 'react';
import styles from './index.scss';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={
            scheduleType : 0 , //课表类型 0 班级 1场地
            arrRow : [],      //课表的行
            arrHeader: [],    //课表的头 课表的列
            subjectInfo : [],    //课表信息
        }
    }

    componentDidMount(){
        this.getClassSchedule();
    }

    //获取班级课表
    getClassSchedule = () => {
        axios('get','/api/schedule/getClassSchedule',{
        }).then((json)=>{
            this.setState({       
                subjectInfo : json.data.schedule||{},
                arrRow : json.data.rowHeader,
                arrHeader: json.data.colHeader,
            })
        })
    }

    //获取场地课表
    getAreaSchedule = () => {
        axios('get','/api/schedule/getAreaSchedule',{
        }).then((json)=>{
            this.setState({       
                subjectInfo : json.data.schedule||{},
                arrRow : json.data.rowHeader,
                arrHeader: json.data.colHeader,
            })
        })
    }

    //课表类型切换
    checkSchedule = (value) => {
        this.setState({
            scheduleType: value,
        })
        value === 0 ? this.getClassSchedule() : this.getAreaSchedule();
    }

    //列内容
    rowRender = (index,value,subjectInfo) => {
        return(
            <div className={styles['subjectname']} key={value}>
                {
                    (value+1)+'_'+(index+1) in subjectInfo &&  subjectInfo[(value+1)+'_'+(index+1)].map((lesson,lessonId)=>{
                        return(
                            this.LessonRender( lessonId,subjectInfo[(value+1)+'_'+(index+1)] )  
                        )
                    })
                }
            </div>
        )
    }

    //填充课表内容
    LessonRender = (lessonId,subjectInfo) =>{
        return(
            <div className={styles['lesson']} key={lessonId}>
                <div className={` ${styles['name']} ${subjectInfo.length > 1 ? styles['nameSm'] : '' }`}>
                    <span className={styles['lessonname']}>
                        { subjectInfo[lessonId].subName }
                    </span>
                    <span className={` ${ subjectInfo[lessonId].classType === 2 ? styles['elective'] : styles['electivehidden']} `}>选修班</span>
                </div>
                <div className={` ${styles['time']} ${subjectInfo.length > 1 ? styles['timeSm'] : '' }`}>
                    { subjectInfo[lessonId].classTime } 
                </div>
            </div>
        )      
    }

    render(){
        const { scheduleType, arrRow, arrHeader ,subjectInfo, } = this.state;
        //时间
        const classSchedule = (
            <div className={styles['classSchedule']}>
                <ul className={styles['scheduleHead']}>
                    <li className={styles['timetype']}>
                        <div className={styles['type']}>节次</div>
                    </li>
                    {
                        arrHeader.map((item,index)=>{
                            return(
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
                        arrRow.map((item,index)=>{ 
                            return(
                                <li className={styles['subject']} key={index}>
                                    <div className={styles['subjectname']}>
                                        <span className={styles['timeId']}>{item.indexName}</span>
                                    </div>
                                    {
                                        arrHeader.map((subject,value)=>{
                                            return(
                                                this.rowRender(index,value,subjectInfo)
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
        const schedule = (
            <Fragment>
                <BackPrevHeader />
                <div className={styles['container']}>
                    <div className={styles['tabsList']}>
                        <ul>
                            <li className={`${scheduleType === 0 ? styles['tab-active'] : '' }`} onClick={ ()=>this.checkSchedule(0) }>本班级课程表</li>
                            <li className={`${scheduleType === 1 ? styles['tab-active'] : '' }`} onClick={ ()=>this.checkSchedule(1) }>本场地课程表</li>
                        </ul>
                    </div>
                    { classSchedule }
                    { contentSchedule }
                </div>
                <Tab />
            </Fragment>
        )
        return schedule;
    }
}

export default Schedule;