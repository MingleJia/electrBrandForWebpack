import React,{Component} from 'react';
import styles from './index.scss';

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={
            scheduleType : 0 , //课表类型 0 班级 1场地
        }
    }


    //课表类型切换
    checkSchedule = (value) => {
        this.setState({
            scheduleType: value,
        })
    }

    render(){
        const { scheduleType} = this.state;
        const classSchedule = (
            <div className={styles['classSchedule']}>
                <ul className={styles['scheduleHead']}>
                    <li className={styles['timetype']}>
                        <div className={styles['type']}>节次</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期一</div>
                        <div className={styles['time']}>03-18</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期二</div>
                        <div className={styles['time']}>03-19</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期三</div>
                        <div className={styles['time']}>03-20</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期四</div>
                        <div className={styles['time']}>03-21</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期五</div>
                        <div className={styles['time']}>03-22</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期六</div>
                        <div className={styles['time']}>03-23</div>
                    </li>
                    <li className={styles['timetype']}>
                        <div className={styles['name']}>星期日</div>
                        <div className={styles['time']}>03-24</div>
                    </li>                    
                </ul>
            </div>
        )
        const contentSchedule = (
            <div className={styles['contentSchedule']}>
                <ul className={styles['subjectList']}>
                    <li className={styles['subject']}>
                        <div className={styles['lessonType']}>第一节</div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>数学</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                    </li>
                    <li className={styles['subject']}>
                        <div className={styles['lessonType']}>第二节</div>
                        <div className={styles['subjectname']}>
                            <div className={styles['name']}>语文</div>
                            <div className={styles['time']}>08:00~08:45</div>
                        </div>
                    </li>                    
                </ul>
            </div>
        )
        const schedule = (
            <div className={styles['container']}>
                <div className={styles['tabsList']}>
                    <ul>
                        <li className={`${scheduleType === 0 ? styles['tab-active'] : '' }`} onClick={ ()=>this.checkSchedule(0) }>本班级课程表</li>
                        <li className={`${scheduleType === 1 ? styles['tab-active'] : '' }`} onClick={ ()=>this.checkSchedule(1) }>本场地课程表</li>
                    </ul>
                </div>
               {classSchedule}
               {contentSchedule}
            </div>
        )
        return schedule;
    }
}

export default Schedule