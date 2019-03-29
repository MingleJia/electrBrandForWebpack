import React from 'react';
import Loadable from "react-loadable";

const Loading = () => <div></div>;
const timeout = 1000;

//文件按需加载批处理
// 首页
export const Home = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});
// 激励月排行榜
export const IncentiveMonth = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});
// 更多课表
export const ScheduleMore = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});
// 更多通知
export const NoticeMore = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});
// 校园风采
export const CampusStyle = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});
// 校园风采更多
export const CampusStyleMore = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});
// 校园风采详情
export const CampusStyleDetail = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});