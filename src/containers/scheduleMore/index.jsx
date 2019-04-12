import React,{Component, Fragment} from 'react';
import styles from './index.scss';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';
import ClassTable from 'COMPONENTS/classTable/ClassTable.jsx';
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
    render(){
        const { scheduleType, arrRow, arrHeader ,subjectInfo } = this.state;
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
                    <ClassTable arrRow={arrRow} arrHeader={arrHeader} subjectInfo={subjectInfo} />
                </div>
                <Tab />
            </Fragment>
        )
        return schedule;
    }
}

export default Schedule;