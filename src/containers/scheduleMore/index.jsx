import React,{Component} from 'react';
import styles from './index.scss';
// import axios from 'UTILS/axios';

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={
            scheduleType : 0 , //课表类型 0 班级 1场地
            arrCol : [], //  课表的列
            col: 0, // 列
            row: 0, //行
            arrRow : [], //课表的行
            arrHeader: [], //课表的头
            subjectInfo : [],  //课表信息
        }
    }

    componentDidMount(){
        // axios('get','http://192.168.20.146:3000/mock/168/getBoardClassSchedule',{
        //     data:{
        //         schoolId : 123,
        //         classId : 123,
        //     },
        //     ticket: 'VDBSVlBRPT07Wm5kbVlIYz07ODU4NQ=='
        // }).then(()=>{
            let col = 7;
            let row = 7;
            let headerNum = 7;
            let arrHeader = [];
            let arrCol = [];
            let arrRow = [];
            for(let i=0;i < col;i++){
                arrCol.push(i);
            }
            for(let i=0;i < row;i++){
                arrRow.push(i);
            }
            for(let i=0;i < headerNum;i++){
                arrHeader.push(i);
            }
            let subjectInfo = {
                '1_1':[
                    {
                        subName: '道德与社会公...',
                        classType: 2,	
                        classTime: '08:00~08:45',
                    },
                    {
                        subName: '数学',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    },
                ],
                '2_2':[
                    {
                        subName: '数学',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    }
                ],
                '3_5':[
                    {
                        subName: '理综',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    }
                ],
                '4_1':[
                    {
                        subName: '语文',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    },
                    {
                        subName: '物理',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    },
                ],
                '6_3':[
                    {
                        subName: '语文',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    },
                    {
                        subName: '物理',
                        classType: 1,	
                        classTime: '08:00~08:45',
                    },
                ]
            }
            this.setState({
                // col : json.data.colHeader.length,
                // row : json.data.rowHeader.length,
                col :7,
                row: 7,
                subjectInfo : subjectInfo,
                arrRow : arrRow,
                arrCol : arrCol,
                arrHeader: arrHeader,
                // arrHeader: json.data.rowHeader,
                // lessons: 
            })
        // })
    }

    //课表类型切换
    checkSchedule = (value) => {
        this.setState({
            scheduleType: value,
        })
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
                        {
                            subjectInfo[lessonId].subName
                        }
                    </span>
                    <span className={` ${ subjectInfo[lessonId].classType === 2 ? styles['elective'] : styles['electivehidden']} `}>选修班</span>
                </div>
                <div className={` ${styles['time']} ${subjectInfo.length > 1 ? styles['timeSm'] : '' }`}>
                    {
                        subjectInfo[lessonId].classTime
                    } 

                </div>
            </div>
        )      
    }

    render(){
        const { scheduleType, arrCol, arrRow, arrHeader ,subjectInfo, } = this.state;
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
                                        <span className={styles['timeId']}>第{index}节</span>
                                    </div>
                                    {
                                        arrCol.map((subject,value)=>{
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