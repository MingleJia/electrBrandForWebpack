import React, { Component, Fragment } from 'react';
import styles from './InfoItem.scss';
import moment from 'moment';
import axios from 'UTILS/axios';
import Dialog from '../../components/phoneDialog/dialog';
class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDialog: false,
            isShowDialog2: false,
            dislogTitle: '',
            okText: '',
            cancelText: '',
        }
    }

    componentDidMount() {
    }
    //设置操作节点
    getOperationMode() {
        if (this.props.roleId == 102) {
            if (this.props.type == 0) {
                return ['撤回', '修改']
            }
            if (this.props.type == 1 || this.props.type == 2) {
                return ['', '']
            }
        } else {
            if (this.props.type == 0) {
                return ['驳回', '同意']
            }
            if (this.props.type == 1 || this.props.type == 2) {
                return ['', '']
            }
            if (this.props.type == 'showing') {
                return ['撤下', '修改']
            }
        }
        return ['', ''];
    }
    ope(str) {
        if (this.props.roleId == 102) {
            if (str == '修改') {
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?role_id=102&show_id=' + this.props.id + '&ticket=' + this.props.ticket;
            }
            if (str == '撤回') {
                this.withdraw();
            }
            if (str == '删除') {
                this.delete();
            }
        }
        if (this.props.roleId == 103) {
            if (str == '修改') {
                // console.log(this.props.ticket)
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?role_id=103&show_id=' + this.props.id + '&ticket=' + this.props.ticket;
            }
            if (str == '撤下') {
                this.setState({
                    isShowDialog: true,
                    dislogTitle: '即将撤下该条学生风采?',
                    okText: '撤下',
                    cancelText: '取消'
                })
            }
            if (str == '驳回') {
                this.setState({
                    isShowDialog2: true,
                    dislogTitle: '您已驳回,确定告知家长原因?',
                    okText: '告知',
                    cancelText: '取消'
                })
            }
            if (str == '同意') {
                this.check(1);
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?role_id=103&show_id=' + this.props.id + '&ticket=' + this.props.ticket;
            }
            if (str == '删除') {
                this.delete();
            }
        }
    }
    //撤回消息
    withdraw() {
        axios('post', '/api/show/recall', {
            show_id: this.props.id
        }, 'form').then((json) => {
            // console.log(json);
            if (json.code == 1) {
                // 刷新列表
                this.props.upload && this.props.upload()
            }
        })
    }
    // 撤下展示
    goDown() {
        axios('post', '/api/show/withdraw', {
            show_id: this.props.id
        }, 'form').then((json) => {
            // console.log(json);
            if (json.code == 1) {
                // 刷新列表
                this.props.upload && this.props.upload()
            }
        })
    }
    //删除消息
    delete() {
        axios('post', '/api/show/del', {
            show_id: this.props.id,
        }, 'form').then((json) => {
            // console.log(json);
            if (json.code == 1) {
                // console.log(json)
                // 刷新列表
                this.props.upload && this.props.upload()
            }
        })
    }
    //审核: 1同意 2驳回
    check(n) {
        axios('post', '/api/show/audit', {
            show_id: this.props.id,
            audit_status: n
        }, 'form').then((json) => {
            // console.log(json);
            if (json.code == 1) {
                // 刷新列表
                this.props.upload && this.props.upload()
            }
        })
    }
    //查看大图
    showImg = (path) => {
        window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'openPicture', [{ 'path': path }]);
    }
    render() {
        let { isShowDialog, isShowDialog2, dislogTitle, okText, cancelText } = this.state;
        let operationMode = this.getOperationMode();
        // console.log(this.props.roleId, this.props.type, this.props.id)
        return <Fragment>
            <Dialog
                isShow={isShowDialog}
                onOk={() => {
                    this.setState({
                        isShowDialog: false
                    }, () => {
                        this.goDown();
                    })
                }}
                onCancel={() => {
                    this.setState({
                        isShowDialog: false
                    })
                }}
                dislogTitle={dislogTitle}
                okText={okText}
                cancelText={cancelText}
            />
            <Dialog
                isShow={isShowDialog2}
                onOk={() => {
                    this.setState({
                        isShowDialog2: false
                    }, () => {
                        this.check(2);
                        //告知家长
                    })
                }}
                onCancel={() => {
                    this.setState({
                        isShowDialog2: false
                    }, () => {
                        this.check(2);
                    })
                }}
                dislogTitle={dislogTitle}
                okText={okText}
                cancelText={cancelText}
                left={'100vw'}
            />
            <div className={styles['box']}>
                {
                    this.props.showTop && <div className={styles['top']}>
                        <span className={styles['left']}>{this.props.student_name || ''}</span>
                        {this.props.roleId == 103 && <span className={styles['right']}>{this.props.class_name || ''}</span>}
                    </div>
                }
                <div className={styles['content']}>

                    {
                        (this.props.class_name && !this.props.showTop) && <div className={styles['textWrap']}>
                            <div className={styles['title']}>班级:</div>
                            <div className={styles['text']}>
                                <p>{this.props.class_name}</p>
                            </div>
                        </div>
                    }

                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>标题:</div>
                        <div className={styles['text']}>
                            <p>{this.props.title || ''}</p>
                        </div>
                    </div>
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>发生时间:</div>
                        <div className={styles['text']}>
                            <p>{this.props.show_time ? moment(this.props.show_time * 1000).format('YYYY-MM-DD') : ''}</p>
                        </div>
                    </div>
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>描述:</div>
                        <div className={styles['text']}>
                            <p>{this.props.desc || ''}</p>
                        </div>
                    </div>
                    {

                        this.props.comment && < div className={styles['textWrap']}>
                            <div className={styles['title']}>教师点评:</div>
                            <div className={styles['text']}>
                                <p>{this.props.comment}</p>
                            </div>
                        </div>
                    }
                    {

                        this.props.show_days && < div className={styles['textWrap']}>
                            <div className={styles['title']}>展示天数:</div>
                            <div className={styles['text']}>
                                <p>{this.props.show_days}</p>
                            </div>
                        </div>
                    }
                    {

                        this.props.createtime && <div className={styles['textWrap']}>
                            <div className={styles['title']}>申请时间:</div>
                            <div className={styles['text']}>
                                <p>{moment(this.props.createtime * 1000).format('YYYY-MM-DD HH:mm:ss')}</p>
                            </div>
                        </div>
                    }
                    <div className={styles['imgWrap']}>
                        {/* <div className={styles['imgItem']}>
                            <img onClick={() => { this.showImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg') }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div> */}
                        {
                            (this.props.images || []).map(
                                (item, index) => <div key={index} className={styles['imgItem']}>
                                    <img
                                        onClick={() => { this.showImg(item) }}
                                        src={item.image} alt="" />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={styles['bottom']}>
                    <p>审批时间2019-04-29 23:00
                        <span
                            onClick={() => { this.ope(operationMode[1]) }}
                            className={styles['l1']}
                        >{operationMode[1]}</span>
                        <span
                            onClick={() => { this.ope(operationMode[0]) }}
                            className={styles['l2']}
                        >{operationMode[0]}</span>
                    </p>
                </div>
            </div>
        </Fragment >
    }
}

export default InfoItem;
InfoItem.defaultProps = {};
InfoItem.propTypes = function () { };
InfoItem.propTypes = {};