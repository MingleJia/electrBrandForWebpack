import React, { Component, Fragment } from 'react';
import styles from './InfoItem.scss';
import { WhiteSpace, } from 'antd-mobile';
import deletImg from '../../assets/phone/delet.png';
class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowImg: false
        }
    }

    componentDidMount() {
    }
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
                return ['撤回', '修改']
            }
        }
        return ['', ''];
    }
    showImg(showImgSrc) {
        this.props.showImg && this.props.showImg(true, showImgSrc)
    }
    render() {
        let operationMode = this.getOperationMode();
        // console.log(this.props.roleId, this.props.type)
        return <Fragment>
            <div className={styles['box']}>
                <div className={styles['top']}>
                    <span className={styles['left']}>学生姓名</span>
                    <span className={styles['right']}>高一三班</span>
                </div>
                <div className={styles['content']}>
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>标题:</div>
                        <div className={styles['text']}>
                            <p>{this.props.title||''}</p>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>时间:</div>
                        <div className={styles['text']}>
                            <p>sdfsdfsdf sdf sdf sdsdfsd sd</p>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>描述:</div>
                        <div className={styles['text']}>
                            <p>sdfsdfsdf sdf sdf sdsdfsd sd双方的的风格覆盖的风格的风格的风格的风格的风格的风格覆盖覆盖豆腐干风格的法国队复古风格覆盖的风格地方地方</p>
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
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>申请时间:</div>
                        <div className={styles['text']}>
                            <p>sdfsdfsdf sdf sdf sdsdfsd sd</p>
                        </div>
                    </div>
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
                        <span className={styles['l1']}>{operationMode[1]}</span>
                        <span className={styles['l2']}>{operationMode[0]}</span>
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