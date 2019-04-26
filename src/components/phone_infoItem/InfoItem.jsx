import React, { Component, Fragment } from 'react';
import styles from './InfoItem.scss';
import { WhiteSpace, } from 'antd-mobile';
import deletImg from '../../assets/phone/delet.png';
import moment from 'moment';
import axios from 'UTILS/axios';
class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowImg: false
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
                return ['', '删除']
            }
        } else {
            if (this.props.type == 0) {
                return ['驳回', '同意']
            }
            if (this.props.type == 1 || this.props.type == 2) {
                return ['修改', '删除']
            }
            if (this.props.type == 'showing') {
                return ['撤下', '修改']
            }
        }
        return ['', ''];
    }
    showImg(showImgSrc) {
        this.props.showImg && this.props.showImg(true, showImgSrc)
    }
    ope(str) {
        if (this.props.roleId == 102) {
            if (str == '修改') {
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?role_id=102&show_id=' + this.props.id;
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
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?role_id=103&show_id=' + this.props.id;
            }
            if (str == '撤下') {
                this.goDown();
            }
            if (str == '驳回') {
                this.check(2);
            }
            if (str == '同意') {
                this.check(1);
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
    render() {
        let operationMode = this.getOperationMode();
        // console.log(this.props.roleId, this.props.type, this.props.id)
        return <Fragment>
            <div className={styles['box']}>
                <div className={styles['top']}>
                    <span className={styles['left']}>学生姓名</span>
                    {this.props.roleId == 103 && <span className={styles['right']}>高一三班</span>}
                </div>
                <div className={styles['content']}>
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>标题:</div>
                        <div className={styles['text']}>
                            <p>{this.props.title || ''}</p>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>时间:</div>
                        <div className={styles['text']}>
                            <p>{this.props.show_time ? moment(this.props.show_time).format('YYYY-MM-DD') : ''}</p>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>描述:</div>
                        <div className={styles['text']}>
                            <p>{this.props.desc || ''}</p>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>展示天数:</div>
                        <div className={styles['text']}>
                            <p>sdfsdfsdf sdf sdf sdsdfsd sd</p>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    {

                        this.props.createtime && <div className={styles['textWrap']}>
                            <div className={styles['title']}>申请时间:</div>
                            <div className={styles['text']}>
                                <p>{moment(this.props.createtime).format('YYYY-MM-DD HH:mm:ss')}</p>
                            </div>
                        </div>
                    }
                    <WhiteSpace size="sm" />
                    <div className={styles['imgWrap']}>
                        <div className={styles['imgItem']}>
                            <img className={styles['delet']} src={deletImg} alt="" />
                            <img onClick={() => { this.showImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg') }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                        <div className={styles['imgItem']}>
                            <img className={styles['delet']} src={deletImg} alt="" />
                            <img src="" alt="" />
                        </div>
                        <div className={styles['imgItem']}>
                            <img className={styles['delet']} src={deletImg} alt="" />
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                        <div className={styles['imgItem']}>
                            <img className={styles['delet']} src={deletImg} alt="" />
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                        <div className={styles['imgItem']} style={{ marginRight: 0 }}>
                            <img className={styles['delet']} src={deletImg} alt="" />
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
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