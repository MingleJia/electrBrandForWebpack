import * as config from 'ROUTER/index';

export const routerConfig = [
    {
        path:'/',
        component: config.Login,    // 登陆页
        exact: true
    },
    {
        path:'/home',
        component: config.Home,    // 首页
        exact: true
    },
    {
        path:'/incentivemonth',
        component: config.IncentiveMonth,    // 激励月排行榜
        exact: true
    },
    {
        path:'/schedulemore',
        component: config.ScheduleMore,    // 更多课表
        exact: true
    },
    {
        path:'/noticemore',
        component: config.NoticeMore,    // 更多通知
        exact: true
    },
    {
        path:'/campusstyle',
        component: config.CampusStyle,    // 校园风采
        exact: true
    },
    {
        path:'/campusstyle/more',
        component: config.CampusStyleMore,    // 校园风采更多
        exact: true
    },
    {
        path:'/campusstyle/detail',
        component: config.CampusStyleDetail,    // 校园风采详情
        exact: true
    },
    // {
    //     path:'/studentsStyle',
    //     component: config.StudentsStyle,    // 学生风采
    //     exact: true
    // },
    {
        path:'/studentsStyle/more',
        component: config.StudentsStyleMore,    // 更多学生风采
        exact: true
    },
    {
        path:'/studentsStyle/deatil',
        component: config.StudentsStyleDetail,    // 学生风采详情
        exact: true
    },
    //手机端页面
    {
        path:'/phone/studentsStyle',
        component: config.StudentsStyleP,    // 学生风采
        exact: true
    },
    {
        path:'/phone/studentsStyle/edit',
        component: config.StudentsStyleEditP,    // 学生风采
        exact: true
    },
]