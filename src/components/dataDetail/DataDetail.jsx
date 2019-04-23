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
            dataList: [],
            id: this.getId(),
            visible: false,
            showImgSrc: ''
        }
    }
    //返回首页
    backHome = () => {
        window.history.back(-1);
    }
    getId() {
        return parseInt(window.location.href.split('?')[1].split('=')[1])
    }
    static getDerivedStateFromProps(props) {
        //当父级传入的props发生变化的时候就执行这里 return 新的state,相当于setState
        return {
            dataList: props.dataList,
            // id: parseInt(props.id),
            subjectInfo: props.subjectInfo,
        }
    }
    componentDidMount() {


    }
    nextBtn() {
        this.setState({
            id: this.state.id + 1,
        })
    }
    prevBtn() {
        this.setState({
            id: this.state.id - 1,
        })
    }
    showImg(showImgSrc) {
        this.setState({
            visible: !this.state.visible,
            showImgSrc: showImgSrc
        });
    }
    render() {
        let { id, dataList } = this.state;
        let dataListNow = dataList.length > 1 ? dataList[id] : {};
        // console.log(id);
        // console.log(dataListNow);
        return <Fragment>
            <div onClick={() => { this.showImg() }} style={{ display: `${this.state.visible ? 'block' : 'none'}` }} className={styles['showImg']}>
                <img src={this.state.showImgSrc} alt="" />
            </div>
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['back']} onClick={() => this.backHome()}>
                        <img className={styles['backimg']} src={backImg}></img><span>返回</span>
                    </div>
                    {
                        dataList.length > 1 && <div className={styles['btnWrap']}>
                            {
                                id != 0 && <span className={styles[id == dataList.length - 1 ? 'onlyOneBtn' : 'prevBtn']} onClick={() => this.prevBtn()}>上一个</span>
                            }
                            {

                                id != dataList.length - 1 && <span className={styles[id == 0 ? 'onlyOneBtn' : 'nextBtn']} onClick={() => this.nextBtn()}>下一个</span>
                            }
                        </div>
                    }
                </div>
                <div className={styles['content']}>
                    <div className={styles['title']}>
                        <span className={styles['titlename']}>{dataListNow.title || '暂无标题'}</span>
                        <span className={styles['time']}>12:233</span>
                    </div>
                    <div className={styles['detail']}>
                        <p className={styles['text']}>{dataListNow.desc || '暂无内容'}</p>

                        {
                            //https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg
                            (dataListNow.images || []).map((item, index) =>
                                <div
                                    key={index}
                                    className={styles['imgWarp']}>
                                    <img
                                        onClick={()=>{this.showImg(item.image)}}
                                        className={styles['img']}
                                        src={item.image} />
                                </div>)
                        }
                        {
                            dataListNow.comment ? <p className={styles['text']}><span>教师评价:</span>{dataListNow.comment || '暂无内容'}</p> : null
                        }
                    </div>
                </div>
            </div>
        </Fragment>;
    }
}

export default DataDetail;
DataDetail.defaultProps = {};
DataDetail.propTypes = function () { };
DataDetail.propTypes = {};