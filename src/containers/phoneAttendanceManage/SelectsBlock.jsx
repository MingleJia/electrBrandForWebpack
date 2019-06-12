/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import {Select} from 'antd';
import { List, Calendar } from 'antd-mobile';
import styles from './SelectsBlock.scss';

const Option = Select.Option;
const extra = {
    '2017/07/15': { info: 'Disable', disable: true },
  };
  
const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };
Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
      extra[+date] = info;
    }
});
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
        en: false,
        show: false,
        config: {},
    }

    componentDidMount() {
        // 从url获取参数 如果没有的话 就设置默认值clazzs[0] 
        // const initClazz = parseInt(this.getQueryString('initClazz')) || 0;
        // const initType = parseInt(this.getQueryString('initType')) || 0;
        // this.setState({
        //     chosenClazz: initClazz,
        //     chosenType: initType,
        // });
    }

    // 获取url中的班级和状态初始值
    // getQueryString = (name) => {
    //     let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //     let r = window.location.search.substr(1).match(reg);
    //     // let r = this.props.location.search.substr(1).match(reg);
    //     if (r != null) {
    //         return unescape(r[2]);
    //     }  
    //     return null;
    // }

    // 弹出遮罩层
    showMask = (str, open) => {
        console.log('open:', open)
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
        // console.log(`selected clazz ${value}`);
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
        this.setState({
            chosenType: value,
        })
    }

    renderBtn(zh, en = {}) {
    
        return (
          <List.Item arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
              });
            }}
          >
            {this.state.en ? en : zh}
          </List.Item>
        );
    }

    onSelectHasDisableDate = (dates) => {
        console.warn('onSelectHasDisableDate', dates);
    }

    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime,
            endTime,
        });
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: undefined,
            endTime: undefined,
        });
    }

    getDateExtra = date => extra[+date];

    render() {
        const {clazzes, types, chosenClazz, chosenObj, chosenType, clazzopen, maskOpen} = this.state;
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
                        <span className={styles.calWraper}>
                            <List className="calendar-list" style={{ backgroundColor: 'white' }}>
                            {this.renderBtn('时间', 'Select DateTime Range (Shortcut)', { pickTime: true, showShortcut: true })}
                            {
                                this.state.startTime &&
                                <List.Item>Time1: {this.state.startTime.toLocaleString()}</List.Item>
                            }
                            {
                                this.state.endTime &&
                                <List.Item>Time2: {this.state.endTime.toLocaleString()}</List.Item>
                            }
                            </List>
                            <Calendar
                            visible={this.state.show}
                            onCancel={this.onCancel}
                            onConfirm={this.onConfirm}
                            onSelectHasDisableDate={this.onSelectHasDisableDate.bind(this, '不可选')}
                            getDateExtra={this.getDateExtra}
                            defaultDate={now}
                            minDate={new Date(+now - 5184000000)}
                            maxDate={new Date(+now + 31536000000)}
                            />
                        </span>
                    </li>
                </ul>
                
                
                

                




            </div>
        </>;

        const content = 
        <Fragment>
            {selects}
        </Fragment>
        return (
            <div className={styles.pageWraper}>
                {maskOpen ? (<div className={styles.mask}></div>) : ''}
                {content}
            </div>
        );
    }
}

export default SelectsBlock;