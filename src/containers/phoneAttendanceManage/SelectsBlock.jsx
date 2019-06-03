/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import {Select} from 'antd';
import styles from './SelectsBlock.scss';

const Option = Select.Option;
class SelectsBlock extends Component {
    state = {
        data: [],
        clazzes: ['高一(1)班', '高一(10)班', '高一(12)班'], // 班级选项
        types: ['上午进班', '上午离班', '下午进班', '下午离班','晚自习进班', '晚自习离班', '选修班', '行政班',  '考试'], // 考勤类型
        chosenClazz: '', // 当前选中的班级值
        chosenType: '', // 当前选中的类型值
        maskOpen: false, // true时 显示遮罩层
        clazzopen: false, // true时表示班级的下拉框被展开
    }

    componentDidMount() {
        // 从url获取参数 如果没有的话 就设置默认值clazzs[0] 
        const initClazz = parseInt(this.getQueryString('initClazz')) || 0;
        const initType = parseInt(this.getQueryString('initType')) || 0;
        this.setState({
            chosenClazz: initClazz,
            chosenType: initType,
        });
    }

    // 获取url中的班级和状态初始值
    getQueryString = (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        // let r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }  
        return null;
    }

    // 弹出遮罩层
    showMask = (str, open) => {
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
        }, () => {
            // 当班级切换时，将状态select归零
            this.setState({
                chosenType: this.state.types[0]
            });
        });
    }

    // 切换类型select框时
    handleTypeChange = (value) => {
        this.setState({
            chosenType: value,
        })
    }

    render() {
        const {clazzes, types, chosenClazz, chosenType, clazzopen, maskOpen} = this.state;
        const selects = 
        <>
            <div className={styles.selectWrapper}>
                <Select
                    value={chosenClazz || '班级'} 
                    onChange={this.handleClazzChange.bind(this)} 
                    dropdownMatchSelectWidth = {false}
                    className={clazzopen ? styles.curSelect : ''}
                    onDropdownVisibleChange = {this.showMask.bind(this, 'clazz')}
                >
                    {clazzes && clazzes.length > 0 && clazzes.map((clazz, index) => <Option key={index} value={clazz}>{clazz}</Option>)}
                </Select>
                {/* 对象 */}
                <Select value='学生' disabled></Select>
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
                <div className={styles.titleSty}>考勤管理</div>
            </div>
        );
    }
}

export default SelectsBlock;