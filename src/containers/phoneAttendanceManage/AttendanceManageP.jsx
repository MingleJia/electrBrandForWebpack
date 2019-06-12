import React, { Component } from 'react';
import SelectsBlock from './SelectsBlock.jsx';
import TableShow from './TableShow.jsx';
import styles from './AttendanceManageP.scss';

class AttendanceManageP extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        document.addEventListener('deviceready', function() {
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                {
                    groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                    groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                    id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                    order: 0, //二级子菜单（下拉菜单）显示顺序
                    count: 0, //未读数量显示
                    icon: "", //按钮图片
                    isShowNum: false, //未读数量是否显示
                    title: '选择' //按钮标题
                }
            ]]);
        })
    }

    

    render() {
        const {data} = this.state;

        return (
            <div className={styles.container}>
                <SelectsBlock></SelectsBlock>
                <TableShow isMultiEdit={false}/>
                {data}
            </div>
        );
    }
}

export default AttendanceManageP;