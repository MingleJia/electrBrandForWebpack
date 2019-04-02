import React,{Component} from 'react';
import styles from './index.scss';
import axios from 'UTILS/axios';

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={
            scheduleType : 0 , //课表类型 0 班级 1场地
            arrCol : [], //  课表的行
            col: 0, //
            row: 0, //
            arrRow : [], //课表的列
            arrHeader: [], //课表的头
            subjectInfo : [],  //课表信息
        }
    }

    componentDidMount(){
        axios('get','http://192.168.20.146:3000/mock/168/getBoardClassSchedule',{
            data:{
                schoolId : 123,
                classId : 123,
            },
            ticket: 'VDBSVlBRPT07Wm5kbVlIYz07ODU4NQ=='
        }).then((json)=>{
            let arrCol = [];
            let arrRow = [];
            for(let i=0;i < json.data.colHeader.length;i++){
                arrCol.push(i);
            }
            for(let i=0;i < json.data.rowHeader.length;i++){
                arrRow.push(i);
            }
            let subjectInfo = {
                '1_1':[
                    {
                        subName: '数学数学数学',
                        classType: 2,	
                        classTime: '08:00~08:45',
                    },
                    {
                        subName: '数学',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    },
                ],
                '1_2':{
                    subName: '数学',
                    classType: 1,	
                    classTime: '08:00~08:45',
                }
            }
            window.console.log(subjectInfo['1_1'].length);

            this.setState({
                col : json.data.colHeader.length,
                row : json.data.rowHeader.length,
                subjectInfo : subjectInfo,
                arrRow : arrRow,
                arrCol : arrCol,
                arrHeader: json.data.rowHeader,
            })
        })
    }

    //课表类型切换
    checkSchedule = (value) => {
        this.setState({
            scheduleType: value,
        })
    }

    render(){
        const { scheduleType, arrCol, arrRow, arrHeader ,subjectInfo} = this.state;
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
                                    <div className={styles['name']}>星期{index}</div>
                                    <div className={styles['time']}>03-18</div>
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
                                        <span className={styles['timeId']}>第一节</span>
                                    </div>
                                    {
                                        arrCol.map((subject,value)=>{
                                            return(
                                                <div className={styles['subjectname']} key={value}>
                                                    <div className={styles['lesson']}>
                                                        <div className={styles['name']}>
                                                            <span className={styles['lessonname']}>
                                                                {
                                                                    (value+1)+'_'+(index+1) in subjectInfo ? subjectInfo[(value+1)+'_'+(index+1)].subName : ''
                                                                }
                                                            </span>
                                                            <span className={` ${ (value+1)+'_'+(index+1) in subjectInfo ? subjectInfo[(value+1)+'_'+(index+1)].classType===2 ? styles['elective'] : styles['electivehidden'] : styles['electivehidden']} `}>选修班</span>
                                                        </div>
                                                        <div className={styles['time']}>
                                                                {
                                                                    (value+1)+'_'+(index+1) in subjectInfo ? subjectInfo[(value+1)+'_'+(index+1)].classTime : ''
                                                                } 
                                                        </div>
                                                    </div>   
                                                </div>
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
        )
        return schedule;
    }
}

export default Schedule