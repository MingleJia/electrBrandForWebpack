import React, { Component, Fragment } from 'react';
import styles from './InfoItem.scss';
import moment from 'moment';
import axios from 'UTILS/axios';
// import Dialog from '../../components/phoneDialog/dialog';
import { showToast } from '../../utils/method';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;
/**
 *  @param {回调函数组件执行操作操作后给父级使用} upload Function
 *  @param {角色信息 102是家长 103是班主任} roleId String
 *  @param {是否展示顶部} showTop Boolean
 *  @param {tab栏型号 showing:展示中 0待审批 1已同意 2已驳回} type String
 *  @param {标题} title String
 *  @param {发生时间} show_time String
 *  @param {展示天数} show_days String
 *  @param {描述} desc String
 *  @param {图片数组} images Array
 *  @param {教师评价} comment String
 *  @param {班级名称} class_name String
 *  @param {学生姓名} student_name String
 *  @param {类似于token用来识别账号请求数据} ticket String
 *  @param {是否展示申请时间} isShowApprovalTime Boolean
 */
class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isShowDialog: false,
            // isShowDialog2: false,
            // isShowDialog3: false,
            // dislogTitle: '',
            // okText: '',
            // cancelText: '',
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
                // this.setState({
                //     isShowDialog3: true,
                //     dislogTitle: '即将撤回该条学生风采？',
                //     okText: '撤回',
                //     cancelText: '取消'
                // })
                // this.withdraw();
                this.showAlert(() => { this.withdraw() }, () => { }, '提示', '即将撤回该条学生风采？', '撤回', '取消');
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
                // this.setState({
                //     isShowDialog: true,
                //     dislogTitle: '撤下后，电子班牌将不展示该条信息？',
                //     okText: '撤下',
                //     cancelText: '取消'
                // })
                this.showAlert(() => { this.goDown() }, () => { }, '提示', '撤下后，电子班牌将不展示该条信息？', '撤下', '取消');
            }
            if (str == '驳回') {
                // this.setState({
                //     isShowDialog2: true,
                //     dislogTitle: '您已驳回，是否告知家长原因?',
                //     okText: '告知',
                //     cancelText: '取消'
                // })
                this.showAlert(() => { this.check(2); }, () => { this.check(2); }, '提示', '您已驳回，是否告知家长原因?', '告知', '取消');
            }
            if (str == '同意') {
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?nodecheck=1&role_id=103&show_id=' + this.props.id + '&ticket=' + this.props.ticket;
            }
            if (str == '删除') {
                this.delete();
            }
        }
    }
    /**
     * @param {点确定执行的函数} okFn Fn
     * @param {点取消执行的函数} noFn Fn
     * @param {弹窗标题} title str
     * @param {弹窗文字} text str
     * @param {确定按钮文字} oktext str
     * @param {取消按钮文字} notext str
     */
    showAlert = (okFn, noFn, title, text, oktext, notext) => {
        const titleStyle = {
            color: '#333333',
            fontSize: '5vw',
            fontFamily: 'PingFang-SC-Bold',
            lineHeight: '7vw'
        }
        const okTextStyle = {
            color: '#4ea375',
            fontSize: '5vw',
            fontFamily: 'PingFang-SC-Medium'
        }
        const noTextStyle = {
            color: '#999999',
            fontSize: '5vw',
            fontFamily: 'PingFang-SC-Medium'
        }
        const textStyle = {
            color: '#5a5a5a',
            fontSize: '4vw',
            fontFamily: 'PingFang-SC-Medium'
        }
        const alertInstance = alert(<span style={titleStyle}>{title}</span>, <span style={textStyle}>{text}</span>, [
            { text: <span style={noTextStyle}>{notext}</span>, onPress: () => noFn() },
            { text: <span style={okTextStyle}>{oktext}</span>, onPress: () => okFn() },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            alertInstance.close();
        }, 500000);
    };
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
    /**
     * 审批操作
     * @param {审批类型 1:同意 2:驳回} n Number 
     */
    check(n) {
        axios('post', '/api/show/audit', {
            show_id: this.props.id,
            audit_status: n
        }, 'form').then((json) => {
            // console.log(json);
            if (json.code == 1) {
                // 刷新列表
                this.props.upload && this.props.upload()
            } else {
                showToast(json.msg)
            }
        })
    }
    /**
     * 查看大图
     * @param {图片地址||路径} path String
     */
    showImg = (path) => {
        window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'openPicture', [{ 'path': path }]);
    }
    render() {
        // let { isShowDialog, isShowDialog2, isShowDialog3, dislogTitle, okText, cancelText } = this.state;
        let operationMode = this.getOperationMode();
        return <Fragment>

            {/* <Dialog
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
            <Dialog
                isShow={isShowDialog3}
                onOk={() => {
                    this.setState({
                        isShowDialog3: false
                    }, () => {
                        // this.goDown();
                        this.withdraw();
                    })
                }}
                onCancel={() => {
                    this.setState({
                        isShowDialog3: false
                    })
                }}
                dislogTitle={dislogTitle}
                okText={okText}
                cancelText={cancelText}
            /> */}
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
                                        onClick={() => { this.showImg(item.image) }}
                                        src={item.image} alt="" />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={styles['bottom']}>
                    {this.props.isShowApprovalTime && <div className={styles['point']}></div>}
                    <p>
                        {this.props.isShowApprovalTime && <span className={styles['approvalTitle']}>审批时间</span>}{moment(this.props.approvalTime * 1000).format('YYYY-MM-DD HH:mm')}
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