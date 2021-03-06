import React, { Component } from 'react';
import styles from './index.scss';
// import { home, attendance, studentStyle, campusStyle, personalCenter } from 'ASSETS/tab';
import { home, attendance, } from 'ASSETS/tab';
import { NavLink } from 'react-router-dom'
import axios from 'UTILS/axios';
// const dic = {
//     '首页': {
//         to: '/home',
//         src: home,
//         title: '首页'
//     },
//     '考勤': {
//         to: '/campusstyle',
//         src: attendance,
//         title: '考勤'22
//     },
//     '学生风采': {
//         to: '/campusStyle',
//         src: studentStyle,
//         title: '学生风采'
//     },
//     '校园风采': {
//         to: '/campusStyle',
//         src: campusStyle,
//         title: '校园风采'
//     },
//     '个人中心': {
//         to: '/campusStyle',
//         src: personalCenter,
//         title: '个人中心'
//     },
// }
const defaultTab = [
    {
        "base_name": "首页",
        "url": "/home",
        "icon": home
    },
    // {
    //     "base_name": "校园风采",
    //     "url": "/campusStyle",
    //     "icon": campusStyle
    // },
    // {
    //     "base_name": "学生风采",
    //     "url": "/studentsStyle",
    //     "icon": studentStyle
    // },
]
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: JSON.parse(window.localStorage.getItem('tabList')) || defaultTab
        }
    }
    componentDidMount() {
        //返回数据不好看暂时先写死
        setInterval(() => {
            const myDate = new Date();
            //在每天早6点晚6点自动刷新
            if ((myDate.getHours() == 6 && myDate.getMinutes() == 0) || (myDate.getHours() == 18 && myDate.getMinutes() == 0)) {
                window.localStorage.removeItem('tabList');
                this.setState({
                    tabList: JSON.parse(window.localStorage.getItem('tabList')) || defaultTab
                }, () => { this.getNavBar() })

            }
        }, 59000);
        this.getNavBar();
        // this.props.getTabList && this.props.getTabList( [{
        //     "base_name": "学生风采",
        //     "url": "/studentsStyle",
        //     "icon": studentStyle
        // },]);
    }
    getNavBar() {
        axios('get', '/api/index/nav').then(json => {
            const tabList = json.data.nav_bar;
            this.setState({
                tabList: JSON.parse(window.localStorage.getItem('tabList')) || [
                    ...this.state.tabList,
                    ...tabList
                ]
            }, () => {
                window.localStorage.setItem("tabList", JSON.stringify(this.state.tabList));
            })

            this.props.getTabList && this.props.getTabList(tabList || []);
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
                    tabList.map(
                        (item, index) => <NavLink key={index} to={item.url || '/home'} activeClassName={styles['tab-active']}>
                            <img src={item.icon || attendance}></img>
                            <div className={styles['title']}>{item.base_name}</div>
                        </NavLink>)
                }
            </div>
        )
        return tab;
    }
}

export default Tab;
Tab.propTypes = function () { };