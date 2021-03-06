import React from 'react';
import Loadable from "react-loadable";

const Loading = () => <div></div>;
const timeout = 1000;

//文件按需加载批处理
// 登陆页
export const Login = Loadable({
	loader: () => import("CONTAINERS/login/index"),
	loading: Loading,
	timeout: timeout
});
// 首页
export const Home = Loadable({
	loader: () => import("CONTAINERS/home/index"),
	loading: Loading,
	timeout: timeout
});
// 激励月排行榜
export const IncentiveMonth = Loadable({
	loader: () => import("CONTAINERS/incentiveMonth/index"),
	loading: Loading,
	timeout: timeout
});
// 更多课表
export const ScheduleMore = Loadable({
	loader: () => import("CONTAINERS/scheduleMore/index"),
	loading: Loading,
	timeout: timeout
});
// 更多通知
export const NoticeMore = Loadable({
	loader: () => import("CONTAINERS/noticeMore/index"),
	loading: Loading,
	timeout: timeout
});
// 校园风采
export const CampusStyle = Loadable({
	loader: () => import("CONTAINERS/campusStyle/index"),
	loading: Loading,
	timeout: timeout
});
// 校园风采更多
export const CampusStyleMore = Loadable({
	loader: () => import("CONTAINERS/campusStyle/campusMore/index"),
	loading: Loading,
	timeout: timeout
});
// 校园风采详情
export const CampusStyleDetail = Loadable({
	loader: () => import("CONTAINERS/campusStyle/campusDetail/index"),
	loading: Loading,
	timeout: timeout
});
//学生风采
export const StudentsStyle = Loadable({
	loader: () => import("CONTAINERS/studentsStyle/StudentsStyle"),
	loading: Loading,
	timeout: timeout
});
//更多学生风采
export const StudentsStyleMore = Loadable({
	loader: () => import("CONTAINERS/studentsStyle/StudentsStyleMore"),
	loading: Loading,
	timeout: timeout
});
//学生风采详情
export const StudentsStyleDetail = Loadable({
	loader: () => import("CONTAINERS/studentsStyle/StudentsStyleDetail"),
	loading: Loading,
	timeout: timeout
});
// 手机端页面
export const StudentsStyleP = Loadable({
	loader: () => import("CONTAINERS/phoneStudentStyle/StudentsStyleP"),
	loading: Loading,
	timeout: timeout
});
//编辑
export const StudentsStyleEditP = Loadable({
	loader: () => import("CONTAINERS/phoneStudentStyle/StudentsStyleEditP"),
	loading: Loading,
	timeout: timeout
});
//手机空白页
export const BlankP = Loadable({
	loader: () => import("CONTAINERS/phoneBlank/BlankP"),
	loading: Loading,
	timeout: timeout
});
// 考勤管理 app端
export const AttendanceManageP = Loadable({
    loader: () => import("CONTAINERS/phoneAttendanceManage/AttendanceManageP"),
	loading: Loading,
	timeout: timeout
});
// 考勤管理-修改状态（单条） app端
export const SingleEdit = Loadable({
    loader: () => import("CONTAINERS/SingleEdit/SingleEdit"),
	loading: Loading,
	timeout: timeout
});