import React,{Component, Fragment} from 'react';
import styles from './index.scss';
import Clock from './clock';
import IncentiveRank from './incentiveRank';
import TodayLessonSchedule from "./todayLessonSchedule";
import Notice from './Notice';
import Tab from 'COMPONENTS/tab';

class Home extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const home = (
            <Fragment>
                <div className={styles['header']}>
                    <span className={styles['class-info']}>
                        <span className={styles['school-name']}>杭州市西湖区第一中学</span>
                        <i></i>
                        <span className={styles['class-name']}>高三（1）班</span>
                    </span>
                    <Clock />
                </div>
                <div className={styles['container']}>
                    <IncentiveRank />
                    <div>
                        <TodayLessonSchedule />
                        <Notice />
                    </div>
                </div>
                <Tab />
            </Fragment>
        )
        return home;
    }
}

export default Home;