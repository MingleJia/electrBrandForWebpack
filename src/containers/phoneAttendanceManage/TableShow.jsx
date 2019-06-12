/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

/* eslint-disable no-console */
import React, { Component } from 'react';
import { Table, Checkbox } from 'antd';
import {Picker} from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {setTableShow} from 'MODULES/root/actions';
import styles from './TableShow.scss';

const columns = [
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      className:'sName',
    },
    {
      title: '考勤时间',
      dataIndex: 'attendenceTime',
      align:'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
        render: (text) => <span className={styles.ope}>{text}</span>,
    },

  ];
const data = [
    {
      key: '1',
      date: '3.3',
      status: '迟到',
      name: '上官',
      age: 32,
      address: 'New York',
      attendenceTime: '08:30',
      operation: '修改',
    },
    {
      key: '2',
      date: '3.4',
      status: '早退',
      name: '欧阳俊',
      age: 42,
      address: 'London',
      attendenceTime: '08:30',
      operation: '修改'
    },
    {
      key: '3',
      date: '3.5',
      status: '正常',
      name: '上官欧阳',
      age: 32,
      address: 'Sidney',
      attendenceTime: '08:30',
      operation: '修改'
    }
];

const columnsEdit = [
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '考勤时间',
      dataIndex: 'attendenceTime',
    },
  ];
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
    isMultiEdit: PropTypes.bool,
    history: PropTypes.object,
    root: PropTypes.object
};

class TableShow extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        dataEdit: [
            {
              key: '11',
              date: '4.3',
              status: '迟到',
              name: 'John Brown',
              attendenceTime: '08:30',
            },
            {
              key: '21',
              date: '2.4',
              status: '早退',
              name: 'Jim Green',
              attendenceTime: '08:30',
            },
            {
              key: '31',
              date: '2.5',
              status: '正常',
              name: 'Joe Black',
              attendenceTime: '08:30',
            }
        ],
        isMultiEdit: true, // true时表示当前为修改状态
        selectedRowKeys: [], // 当前选中行的key值集合
        hasSelectAll: false, // 为true时表示全选，false表示取消全选
        // statusAfterEdit: '',
    }
    componentDidMount() {
        this.setState({
            // eslint-disable-next-line react/prop-types
            isMultiEdit: this.props.isMultiEdit,
        }, () => {
            let isMultiEdit = this.props.isMultiEdit;
            var els =  document.getElementsByClassName('ant-table-selection-column');
            [].forEach.call(els, function(el, index) {
                if(isMultiEdit) {
                    if(index !== 0) {
                        el.style.display = 'block';
                    }
                } else {
                    el.style.display = 'none';
                }
            });
        })
    }

    onScrollChange = (val) => {
        console.log(val);
    }

    // 点击整行选中
    selectRow = (record) => {
        if(this.props.isMultiEdit) {
            const selectedRowKeys = [...this.state.selectedRowKeys];
            if (selectedRowKeys.indexOf(record.key) >= 0) {
              selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
            } else {
              selectedRowKeys.push(record.key);
            }
            this.setState({ selectedRowKeys }, () => {console.log('点击行之后的selectedRowKeys：', this.state.selectedRowKeys)});
        } else {
             // 单行的修改操作
             console.log('当行修改的数据:', this.props);
             this.props.history.push('/phone/SingleEdit');
             this.props.setTableShow({
                rowkey: record.key
             })
        }
    }

    // 点击table区的checkbox时触发
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    // 模仿的全选功能
    selectAllMock = () => {
        let dataAllKeys = [];
        let {dataEdit} = this.state;
        dataEdit.map((item) => {
            dataAllKeys.push(item.key);
        });
        this.setState({
            hasSelectAll: !this.state.hasSelectAll
        }, () => {
            let {hasSelectAll} = this.state;
            if(hasSelectAll) {
                this.setState({
                    selectedRowKeys:dataAllKeys,
                })
            } else {
                this.setState({
                    selectedRowKeys:[],
                })
            }
        })
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
        const {isMultiEdit, dataEdit, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange.bind(this),
        };
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
        return (
            <div className={styles.wrap}>
                <Table rowSelection={rowSelection}
                       columns={isMultiEdit ? columnsEdit :columns}
                       dataSource={isMultiEdit ? dataEdit : data}
                       className={styles.table}
                       pagination = {false}
                       onRow={(record) => ({
                            onClick: () => {
                                this.selectRow(record);
                            },
                        })}
                />

                {/* 底部操作fixed框 */}
                <div className={`${styles.footWrap} ${isMultiEdit ? '' : styles.hide}`}>
                    <Checkbox onChange={this.selectAllMock.bind(this)}><span className={styles.txt}>全选</span></Checkbox>
                    <span className={styles.edit}>
                        {
                            selectedRowKeys && selectedRowKeys.length > 0 ? editTxtActive : (<span>修改状态</span>)
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