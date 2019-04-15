import React, { Component } from 'react';
import styles from './index.scss';
import { home, attendance, studentStyle, campusStyle, personalCenter } from 'ASSETS/tab';
import { NavLink } from 'react-router-dom'
import axios from 'UTILS/axios';
const dic = {
    '首页': {
        to: '/home',
        src: home,
        title: '首页'
    },
    '考勤': {
        to: '/campusstyle',
        src: attendance,
        title: '考勤'
    },
    '学生风采': {
        to: '/campusstyle',
        src: studentStyle,
        title: '学生风采'
    },
    '校园风采': {
        to: '/campusStyle',
        src: campusStyle,
        title: '校园风采'
    },
    '个人中心': {
        to: '/campusStyle',
        src: personalCenter,
        title: '个人中心'
    },
}
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: ['首页', '考勤', '学生风采', '校园风采', '个人中心']
        }
    }
    componentDidMount() {
        //返回数据不好看暂时先写死
        setInterval(() => {
            const myDate = new Date();
            if ((myDate.getHours() == 6 && myDate.getMinutes() == 0) || (myDate.getHours() == 18 && myDate.getMinutes() == 0)) {
                this.getNavBar();
            }
        }, 59000);
        this.getNavBar();
    }
    getNavBar() {
        axios('get', '/api/index/nav').then(json => {
            const tabList = json.data.nav_bar.filter(item => dic[item]);
            this.setState({
                tabList: tabList.length == 0 ? ['首页', '考勤', '学生风采', '校园风采', '个人中心'] : tabList
            })
            this.props.getTabList&&this.props.getTabList(tabList.length == 0 ? ['首页', '考勤', '学生风采', '校园风采', '个人中心'] : tabList);
        })
    }
    render() {
        let { tabList } = this.state;
        const tab = (
            <div className={styles['tab']}>
                {/* 写固定的内容 */}
                {/* <NavLink to='/home' activeClassName={styles['tab-active']}>
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
                </NavLink> */}
                {
                    //动态生成tab
                    tabList.filter(item => dic[item]).map(
                        (item, index) => <NavLink key={index} to={dic[item].to} activeClassName={styles['tab-active']}>
                            <img src={dic[item].src}></img>
                            <div className={styles['title']}>{dic[item].title}</div>
                        </NavLink>)
                }
            </div>
        )
        return tab;
    }
}

export default Tab;
Tab.propTypes = function(){};