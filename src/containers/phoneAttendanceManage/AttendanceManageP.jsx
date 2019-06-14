import React, { Component } from 'react';
import SelectsBlock from './SelectsBlock.jsx';
import TableShow from './TableShow.jsx';
import styles from './AttendanceManageP.scss';

class AttendanceManageP extends Component {
    state = {
        data: [],
        isMultiEdit: false, // true时显示“取消”；false时显示“选择”
    }

    componentDidMount() {
        const _this = this;
        document.addEventListener('deviceready', function () {
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                {
                    title: '选择' //按钮标题
                }
            ]]);
        }, false);
        window.clickMenu = () => {
            _this.setState({
                isMultiEdit: !_this.state.isMultiEdit
            }, () => {
                if (_this.state.isMultiEdit) {
                    window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                        {
                            title: '取消' //按钮标题
                        }
                    ]]);
                } else {
                    window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                        {
                            title: '选择' //按钮标题
                        }
                    ]]);
                }
            })


        }
    }



    render() {        
        return (
            <div className={styles.container}>
                <SelectsBlock></SelectsBlock>
                <TableShow isMultiEdit={this.state.isMultiEdit}/>

            </div>
        );
    }
}

export default AttendanceManageP;