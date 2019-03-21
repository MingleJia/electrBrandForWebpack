import React from 'react';
import Loadable from "react-loadable";
const Loading = () => <div></div>;
const timeout = 1000;

//文件按需加载批处理
export const classGrouping = Loadable({
	loader: () => import("CONTAINERS/index"),
	loading: Loading,
	timeout: timeout
});