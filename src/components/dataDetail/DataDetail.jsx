import React, { Component, Fragment } from 'react';
// import BackPrevHeader from 'COMPONENTS/backPrev';
// import DataList from 'COMPONENTS/dataList/DataList';
// import Tab from 'COMPONENTS/tab';
import moment from 'moment';
import styles from './DataDetail.scss';
import { backImg } from 'ASSETS/header';
import axios from 'UTILS/axios';
class DataDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            id: this.getId(),
            visible: false,
            showImgSrc: '',

            show_id: this.getId(),
            show: {},
            canDown: 0,
            canUp: 0
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
        this.getData();

    }
    getData(type) {
        axios('get', '/api/eboardshow/read', {
            show_id: this.state.show_id,
            type
        }).then((json) => {
            this.setState({
                show: json.data.show,
                show_id: json.data.show.id,
                canDown: json.data.canDown,
                canUp: json.data.canUp
            })
        })
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
        let { show, canDown, canUp } = this.state;
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
                        (canDown || canUp) && <div className={styles['btnWrap']}>
                            {
                                canUp && <span className={styles[!canDown ? 'onlyOneBtn' : 'prevBtn']} onClick={() => this.getData('up')}>上一个</span>
                            }
                            {

                                canDown && <span className={styles[!canUp ? 'onlyOneBtn' : 'nextBtn']} onClick={() => this.getData('down')}>下一个</span>
                            }
                        </div>
                    }
                </div>
                <div className={styles['content']}>
                    <div className={styles['title']}>
                        <span className={styles['titlename']}>{show.title || '暂无标题'}</span>
                        <span className={styles['time']}>{moment(show.show_time * 1000).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className={styles['detail']}>
                        <p className={styles['text']}>{show.desc || '暂无内容'}</p>

                        {
                            //https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg
                            (show.images || []).map((item, index) =>
                                <div
                                    key={index}
                                    className={styles['imgWarp']}>
                                    <img
                                        onClick={() => { this.showImg(item.image) }}
                                        className={styles['img']}
                                        src={item.image} />
                                </div>)
                        }
                        {
                            show.comment ? <p className={styles['text']}><span>教师评价:</span>{show.comment || '暂无内容'}</p> : null
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