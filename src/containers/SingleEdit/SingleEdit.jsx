/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Picker, List} from 'antd-mobile';
import {setTableShow} from 'MODULES/root/actions';
import styles from './SingleEdit.scss';

const season = [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
];
Component.propTypes = {
    root: propTypes.object
}
class SingleEdit extends Component {
    state = {
        pickerValue: '迟到',
        sValue: ['2013', '春'],
    }

     // Picker点击“确定”按钮时
     changeStatus = (val) => {
        let {selectedRowKeys, dataEdit} = this.state;
        let tableData = JSON.parse(JSON.stringify(dataEdit)); // 深拷贝一个数组，防止对原数组进行不可预知干扰
        tableData.filter((item) => {
            if (selectedRowKeys.includes(item.key)) {
                item.status = val[0];
            }
        })
        this.setState({
            dataEdit:tableData
        })
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const rowkey = this.props.root.rowkey;
        return (
            <div className={styles.wholeWrap}>
                <span>{rowkey}</span>
                <ul>
                    <li className={styles.itemWrap}>
                        <span className={styles.itemTitle}>考勤类型</span>
                        <span className={styles.itemValue}>上午进班</span>
                    </li>
                    <li className={styles.itemWrap}>
                        <span className={styles.itemTitle}>日期</span>
                        <span className={styles.itemValue}>2019-01-05</span>
                    </li>
                    {/* 根据接口返回的类型数据判断显示 */}
                    <li className={styles.itemWrap}>
                        <span className={styles.itemTitle}>学科</span>
                        <span className={styles.itemValue}>生物</span>
                    </li>
                    <li className={styles.itemWrap}>
                        <span className={styles.itemTitle}>学生姓名</span>
                        <span className={styles.itemValue}>林超则</span>
                    </li>
                    <li className={styles.itemWrap}>

                    <Picker
                        data={season}
                        extra="迟到"
                        cols={1}
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                        onOk={v => this.setState({ sValue: v })}
                        >
                        <List.Item arrow="horizontal">状态</List.Item>
                    </Picker>
                    </li>
                </ul>
            </div>
        )
    }
}

// export default SingleEdit;
export default connect(
    ({root}) => ({
    root: root,
}), {setTableShow}
)(withRouter(SingleEdit))