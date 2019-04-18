import React, { Component, Fragment } from 'react';
// import BackPrevHeader from 'COMPONENTS/backPrev';
// import DataList from 'COMPONENTS/dataList/DataList';
// import Tab from 'COMPONENTS/tab';
import styles from './DataDetail.scss';
import { backImg } from 'ASSETS/header';
// import { Carousel } from 'antd-mobile';
class DataDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    //返回首页
    backHome = () => {
        window.history.back(-1);
    }
    componentDidMount() {

    }

    render() {

        return <Fragment>
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['back']} onClick={() => this.backHome()}>
                        <img className={styles['backimg']} src={backImg}></img><span>返回</span>
                    </div>
                    {
                        <div className={styles['btnWrap']}>
                            <span className={styles['prevBtn']} onClick={() => this.prevBtn()}>上一个</span>
                            <span className={styles['nextBtn']} onClick={() => this.nextBtn()}>下一个</span>
                        </div>
                    }
                </div>
                <div className={styles['content']}>
                    <div className={styles['title']}>
                        <span className={styles['titlename']}>标题标题标题</span>
                        <span className={styles['time']}>12:233</span>
                    </div>
                    <div className={styles['detail']}>
                        <p className={styles['text']}>瑟瑟发抖十点十分士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫士大夫沙发上都给顺丰到付</p>


                        <div
                            className={styles['imgone']}>
                            <img className={styles['img']} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg'} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>;
    }
}

export default DataDetail;