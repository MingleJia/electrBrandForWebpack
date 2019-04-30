import React, { Component, Fragment } from 'react';
import styles from './index.scss';
import Clock from './clock';
import IncentiveRank from './incentiveRank';
import StudentStyle from './studentStyle/StudentStyle';
import TodayLessonSchedule from "./todayLessonSchedule";
import Notice from './Notice';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: '',
            className: '',
            isShowStudentStyle: false,
        }
    }

    componentDidMount() {
        axios('get', '/api/index/header').then((json) => {
            this.setState({
                schoolName: json.data.schoolName,
                className: json.data.className,
            })
        })
    }

    render() {
        const { schoolName, className } = this.state;
        const home = (
            <Fragment>
                <div className={styles['header']}>
                    <span className={styles['class-info']}>
                        <span className={styles['school-name']}>{schoolName}</span>
                        <i></i>
                        <span className={styles['class-name']}>{className}</span>
                    </span>
                    <Clock />
                </div>
                <div className={styles['container']}>
                    {
                        this.state.isShowStudentStyle
                            ?
                            <IncentiveRank />
                            :
                            <StudentStyle />
                    }
                    <div>
                        <TodayLessonSchedule />
                        <Notice />
                    </div>
                </div>
                <Tab getTabList={(tabList) => {
                    let isShowStudentStyle = !!tabList.find(item => item.base_name == '学生风采');
                    this.setState({
                        isShowStudentStyle
                    })
                }} />
            </Fragment>
        )
        return home;
    }
}

export default Home;