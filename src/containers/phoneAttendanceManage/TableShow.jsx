/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {Checkbox, Icon} from 'antd';
import {Picker} from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {setTableShow} from 'MODULES/root/actions';
import styles from './TableShow.scss';
import DefaultP from './DefaultP.jsx';


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
const PULLSAFEMARGIN = 200; // 上拉加载时的安全距离
Component.propTypes = {
    isMultiEdit: PropTypes.bool,
    history: PropTypes.object,
    root: PropTypes.object
};

class TableShow extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        dataList: [
            {
              id: '11',
              date: '4.3',
              status: '迟到',
              name: '欧阳',
              attendenceTime: '08:30',
            },
            {
              id: '21',
              date: '2.4',
              status: '早退',
              name: '欧阳刚刚',
              attendenceTime: '08:30',
            },
            {
              id: '31',
              date: '2.5',
              status: '正常',
              name: '欧阳娜娜刚',
              attendenceTime: '08:30',
            }
        ],
        isMultiEdit: true, // true时表示当前为修改状态
        selectedRowKeys: [], // 当前选中行的key值集合
        hasSelectAll: false, // 为true时表示全选，false表示取消全选
        selectedIdArr: [], // 选中的id数组
        allIdArr: [], // dataList的所有数据id汇总
        curPage: 1,
        totalPage: 0, 
        pullLoading: false, // true时显示上拉加载动图
        isAllowHttp: true, // true时继续发起请求
        isOver: false, //true表示已经是最后一页数据了，没有更多了
    }
    componentDidMount() {
        // 此处请求接口数据
        this.getData(1);
        // 对返回的接口数据进行处理
        let {dataList} = this.state;
        let dataAllIds = [];
        dataList && dataList.length > 0 && dataList.map((item) => {
            dataAllIds.push(item.id);
        });
        this.setState({
            // eslint-disable-next-line react/prop-types
            isMultiEdit: this.props.isMultiEdit,
            allIdArr: dataAllIds,
        });

        // 处理多页请求
        window.addEventListener('scroll', this.handleScroll);
    }

    // 根据搜索条件查询数据
    getData = () => {
        // 请求接口
        // isOver: json.data.data.length < 10 ? true : false
    }

    // 单选修改：修改单条table选项时
    editSingle = (id) => {
        this.props.history.push('/phone/SingleEdit');
        this.props.setTableShow({
            rowkey: id
        })
    }

    // 批量修改：选中某行或取消某行的选中
    rowChose = (rowId) => {
        // console.log('当前选中行的id:', rowId);
        let arr = JSON.parse(JSON.stringify(this.state.selectedIdArr)); // 深拷贝一个数组，防止对原数组进行不可预知干扰
        let location = arr.indexOf(rowId);
        if(location !== -1) { // 已经存在
            arr.splice(location,1);
        } else {
            arr.push(rowId)
        }
        this.setState({
            selectedIdArr: arr,
        }, () => {
            let {allIdArr, selectedIdArr} = this.state;
            if(allIdArr.length === selectedIdArr.length) {
                this.setState({
                    hasSelectAll: true
                })
            }
        })
    }

    // 底部fixed区的全选按钮功能
    selectAllMock = () => {
        let {allIdArr} = this.state;

        this.setState({
            hasSelectAll: !this.state.hasSelectAll
        }, () => {
            let {hasSelectAll} = this.state;
            if(hasSelectAll){
                this.setState({
                    selectedIdArr:allIdArr,
                });
            } else {
                this.setState({
                    selectedIdArr:[],
                })
            }
        })
    }

    // Picker点击“确定”按钮时
    changeStatus = (val) => {
        let {selectedIdArr, dataList} = this.state;
        let tableData = JSON.parse(JSON.stringify(dataList)); // 深拷贝一个数组，防止对原数组进行不可预知干扰
        tableData.filter((item) => {
            if (selectedIdArr.includes(item.id)) {
                item.status = val[0];
                // 同时需要设置table item中的考勤时间为该状态的开始时间
            }
        })
        this.setState({
            dataList:tableData
        })
    }

    // 父组件state中的isMultiEdit变化时 子组件的isMultiEdit也要相应变化。
    // props表示父组件传来的值，state表示当前组件内的值。return相当于setState
    static getDerivedStateFromProps(props, state){
        if(props.isMultiEdit !== state.isMultiEdit){
            return {
                isMultiEdit:props.isMultiEdit
            }
        }
        return null;
    }

    // 上拉加载
    handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        if(scrollTop + windowHeight + PULLSAFEMARGIN >= scrollHeight  && this.state.isAllowHttp){
            this.setState({
                isAllowHttp:false
            }, () => {
                let {curPage, totalPage} = this.state;
                if(curPage !== totalPage) {
                    this.setState({
                        pullLoading:true
                    });
                    this.getData(curPage + 1);
                }
            })
        }
    }

    render() {
        const {isMultiEdit, dataList, selectedIdArr, allIdArr, pullLoading, isOver} = this.state;
        const editTxtActive =
        <>
            <Picker
                data={season}
                okText={<div style={{ color: '#4ea375' }}>确定</div>}
                dismissText={<div style={{ color: '#999999' }}>取消</div>}
                cols={1}
                title='选择状态'
                onOk={this.changeStatus.bind(this)}
            >
                <span className={styles.turnActive}>修改状态</span>
            </Picker>
        </>;
        // 非批量修改时
        const normalTable = 
        <>
            <div className={styles.tableMock}>
                <div className={styles.tableHeader}>
                    <span className={styles.hItem}>日期</span>
                    <span className={styles.hItem}>状态</span>
                    <span className={styles.hItem}>姓名</span>
                    <span className={styles.hItem}>考勤时间</span>
                    <span className={`${styles.hItem} ${styles.opeation}`}>操作</span>
                </div>
                <ul className={styles.tBodyWrap}>
                    {
                        dataList && dataList.length > 0 && dataList.map((item) => {
                            const {id, date, status, name, attendenceTime} = item;
                            return (
                                <li key={id} className={styles.tBodyItem} onClick={this.editSingle.bind(this, id)}>
                                    <span className={styles.bItem}>{date}</span>
                                    <span className={styles.bItem}>{status}</span>
                                    <span className={`${styles.bItem} ${styles.bName}`}>{name}</span>
                                    <span className={`${styles.bItem} ${styles.bDate}`}>{attendenceTime}</span>
                                    <span className={`${styles.bItem} ${styles.bEdit}`}>修改</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </>

        const MultiTable = 
        <>
            <div>
                <div className={styles.multiTable}>
                    <div className={styles.multiHeader}>
                        <span className={styles.multiHDate}>日期</span>
                        <span className={styles.multiHSta}>状态</span>
                        <span className={styles.multiHName}>姓名</span>
                        <span className={styles.multiHTime}>考勤时间</span>
                    </div>
                    <ul className={styles.multiBodyWrap}>
                        {
                            dataList && dataList.length > 0 && dataList.map((item) => {
                                const {id, date, status, name, attendenceTime} = item;
                                return (
                                    <li key={id} className={styles.multiBodyItem} onClick={this.rowChose.bind(this,id)}>
                                        <span className={styles.multiBCheck}>
                                            <Checkbox checked={selectedIdArr.indexOf(`${id}`) !== -1}></Checkbox>
                                        </span>
                                        <span className={styles.multiBDate}>{date}</span>
                                        <span className={styles.multiBStatus}>{status}</span>
                                        <span className={styles.multiBName}>{name}</span>
                                        <span className={styles.multiBTime}>{attendenceTime}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </>

        const dropLoading = (
            <div className={styles.noMoreData}>
                {
                    isOver ? '没有更多了' : (<Icon type="loading" className={styles.loadingIcon}/>)
                }
                
            </div>
        );
        return (
            <div className={styles.wrap}>
                {/* table布局区 */}
                {
                    dataList && dataList.length===0 ? <DefaultP/> : (isMultiEdit ? MultiTable : normalTable)
                }
                {pullLoading ? dropLoading : null}
                {/* 底部操作fixed框 */}
                <div className={`${styles.footWrap} ${isMultiEdit ? '' : styles.hide}`}>
                    <Checkbox onChange={this.selectAllMock.bind(this)} checked={selectedIdArr.length===allIdArr.length}><span className={styles.txt}>全选</span></Checkbox>
                    <span className={styles.edit}>
                        {
                            selectedIdArr && selectedIdArr.length > 0 ? editTxtActive : (<span>修改状态</span>)
                        }
                    </span>
                </div>
            </div>
        );
    }
}

// export default TableShow;
export default connect(
    ({root}) => ({
    root: root,
}), {setTableShow}
)(withRouter(TableShow))