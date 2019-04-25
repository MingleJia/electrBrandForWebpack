import React, { Component, Fragment } from 'react';
import styles from './InfoItem.scss';
import { WingBlank, WhiteSpace } from 'antd-mobile';
class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
    render() {

        return <Fragment>
            <div className={styles['box']}>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <div className={styles['top']}>
                        <span className={styles['left']}>学生姓名</span>
                        <span className={styles['right']}>高一三班</span>
                    </div>
                </WingBlank>
                <WhiteSpace size="lg" />
                {/* <WingBlank size="lg"> */}
                <div className={styles['content']}>
                    <div className={styles['textWrap']}>
                        <div className={styles['title']}>标题:</div>
                        <div className={styles['text']}>
                            <p>sdfsdfsdf sdf sdf sdsdfsd sd双方</p>
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

                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />

                        </div>
                        <div className={styles['imgItem']}>
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                        <div className={styles['imgItem']}>
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                        <div className={styles['imgItem']}>
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                        <div className={styles['imgItem']} style={{marginRight:0}}>
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg" alt="" />
                        </div>
                    </div>
                </div>
                {/* </WingBlank> */}
            </div>
        </Fragment >
    }
}

export default InfoItem;