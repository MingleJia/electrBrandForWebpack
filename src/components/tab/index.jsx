import React,{Component} from 'react';
import styles from './index.scss';
import home from 'ASSETS/tab/home.png';
import attendance from 'ASSETS/tab/attendance.png';
import studentStyle from 'ASSETS/tab/studentStyle.png';
import campusStyle from 'ASSETS/tab/campusStyle.png';
import personalCenter from 'ASSETS/tab/personalCenter.png';
import { NavLink } from 'react-router-dom'

class Tab extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const tab = (
            <div className={styles['tab']}>
                <NavLink to='/home' activeClassName={styles['tab-active']}>
                    <img src={ home }></img>
                    <div className={styles['title']}>首页</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ attendance }></img>
                    <div className={styles['title']}>考勤</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ studentStyle }></img>
                    <div className={styles['title']}>学生风采</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ campusStyle }></img>
                    <div className={styles['title']}>校园风采</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ personalCenter }></img>
                    <div className={styles['title']}>个人中心</div>
                </NavLink>
            </div>
        )
        return tab;
    }
}

export default Tab;