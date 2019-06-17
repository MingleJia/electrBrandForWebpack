/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import {Select} from 'antd';
import { Calendar } from 'antd-mobile';
import styles from './SelectsBlock.scss';
import date3x from 'ASSETS/date3x.png';

const Option = Select.Option;
  
const now = new Date();
class SelectsBlock extends Component {
    originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
    state = {
        data: [],
        clazzes: ['高一(1)班', '高一(10)班', '高一(12)班'], // 班级选项
        types: ['上午进班', '上午离班', '下午进班', '下午离班','晚自习进班', '晚自习离班', '选修班', '行政班',  '考试'], // 考勤类型
        chosenClazz: '', // 当前选中的班级值
        chosenObj: '', // 当前选中的对象值
        chosenType: '', // 当前选中的类型值
        maskOpen: false, // true时 显示遮罩层
        clazzopen: false, // true时表示班级的下拉框被展开
        show: false,
    }

    componentDidMount() {
    }

    // 弹出遮罩层
    showMask = (str, open) => {
        // console.log('open:', open)
        if (str === 'clazz') {
            if (open) {
                this.setState({
                    maskOpen: true,
                    clazzopen: true
                });
            } else {
                this.setState({
                    maskOpen: false,
                    clazzopen: false
                });
            }
        } else {
            if (open) {
                this.setState({
                    maskOpen: true,
                    statusopen: true
                });
            } else {
                this.setState({
                    maskOpen: false,
                    statusopen: false
                });
            }
        }
    }

    // 切换班级select框时
    handleClazzChange = (value) => {
        console.log(`selected clazz ${value}`);
        this.setState({
            chosenClazz: value,
            dataList: [],
        });
    }
    
    // 切换对象select框
    handleObjChange = (value) => {
        console.log('当前对象是：', value);
        this.setState({
            chosenObj: value
        })
    }
    // 切换类型select框时
    handleTypeChange = (value) => {
        console.log(`selected 类型 ${value}`);
        this.setState({
            chosenType: value,
        })
    }

    // 展开Calendar组件
    showCalendar = () => {
        this.setState({
            show:true
        })
    }

    // Calendar组件“确定”按钮点击事件
    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime,
            endTime,
        });
    }

    // Calendar组件取消”按钮点击事件
    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: undefined,
            endTime: undefined,
        });
    }

    // 时间格式CST转GMT
    getTaskTime = (strDate) => {
        var date = new Date(strDate);
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var str = m+"."+d;
        return str;
    };

    render() {
        const {clazzes, types, chosenClazz, chosenObj, chosenType, clazzopen, maskOpen, show, startTime, endTime} = this.state;
        const selects = 
        <>
            <div className={styles.selectWrapper}>
                <ul className={styles.clazzSelect}>
                    <li>
                        <Select
                            value={chosenClazz || '班级'} 
                            onChange={this.handleClazzChange.bind(this)} 
                            dropdownMatchSelectWidth = {false}
                            className={clazzopen ? styles.curSelect : ''}
                            onDropdownVisibleChange = {this.showMask.bind(this, 'clazz')}
                        >
                            {clazzes && clazzes.length > 0 && clazzes.map((clazz, index) => <Option key={index} value={clazz}>{clazz}</Option>)}
                        </Select>
                    </li>
                    <li>
                        {/* 对象 */}
                        <Select 
                            value={chosenObj || '学生'}
                            onChange={this.handleObjChange.bind(this)}
                            dropdownMatchSelectWidth = {false}
                            className={clazzopen ? styles.curSelect : ''}
                            onDropdownVisibleChange = {this.showMask.bind(this, 'obj')}
                        >
                            <Option value="学生">学生</Option>
                        </Select>
                    </li>
                    <li>
                        {/* 类型 */}
                        <Select
                            value={chosenType || '类型'} 
                            onChange={this.handleTypeChange.bind(this)} 
                            dropdownMatchSelectWidth = {false}
                            className={clazzopen ? styles.curSelect : ''}
                            onDropdownVisibleChange = {this.showMask.bind(this, 'type')}
                        >
                            {types && types.length > 0 && types.map((type, index) => <Option key={index} value={type}>{type}</Option>)}
                        </Select>
                    </li>
                    <li>
                        <span className={styles.calWraper} onClick={this.showCalendar.bind(this)}>
                            {
                                !(startTime&&endTime) ? (<span className={styles.message}>时间</span>) : (<span className={styles.period}>{this.getTaskTime(startTime)}~{this.getTaskTime(endTime)}</span>)
                            }
                            <img className={styles.dateLogo} src={date3x} alt=""/>
                        </span>
                    </li>
                </ul>
            </div>
            <Calendar
                visible={show}
                onCancel={this.onCancel.bind(this)}
                onConfirm={this.onConfirm.bind(this)}
                defaultDate={now}
                minDate={new Date(+now - 5184000000)}
                maxDate={new Date(+now + 31536000000)}
            />
        </>;

        const content = <Fragment>{selects}</Fragment>
        return (
            <div className={styles.pageWraper}>
                {maskOpen ? (<div className={styles.mask}></div>) : ''}
                {content}
            </div>
        );
    }
}

export default SelectsBlock;