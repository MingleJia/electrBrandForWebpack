import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import axios from 'UTILS/axios';
import moment from 'moment';
import { collapseImg, expandImg, } from 'ASSETS/campusstyle';
import { noNoticeImg } from 'ASSETS/home';
class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrExpan: [],//用来存储已经展开的列
            noticeList: [],
            curPage: 1,
            pageSize: 10,
            contents: {}, //收起展开内容区
            idx: 1,//下拉请求第几波数据
            isOver: false,//下拉是否已经到最底部
            lock: true,//正在加载中,未来可以用来设置loading
        }
    }

    componentDidMount() {
        this.getNoticeList(this.state.idx);
    }

    //获取通知列表
    getNoticeList = (idx) => {
        //已经拉到数据底部就直接return
        if (this.state.isOver) return;
        axios('get', '/api/index/notice', {
            current_page: idx,
            page_size: 20,
        }).then((json) => {
            //如果没有数据(小于20条消息就表示没有数据),下次就不在请求接口
            if (json.data.dataList.length < 20) {
                this.setState({
                    isOver: true
                })
            }
            //默认第一条数据展示
            let { arrExpan } = this.state;
            if (idx == 1) {
                arrExpan.push(json.data.dataList[0].id);
                this.getNoticeContent(json.data.dataList[0].id);
            }

            // let noticeList=json.data.dataList;
            this.setState({
                noticeList: [
                    ...this.state.noticeList,
                    ...json.data.dataList,
                ],
                arrExpan: arrExpan,
                lock: true
            })
        }).then(()=>{
            this.setState({
                lock: false,
            })
        })
    }
    //展开收起
    checkStatus = (value) => {
        let { arrExpan, } = this.state;
        arrExpan.includes(value) ? arrExpan.splice(arrExpan.indexOf(value), 1) : arrExpan.push(value) && this.getNoticeContent(value);
        this.setState({
            arrExpan: arrExpan,
        })
    }

    //通知详情
    getNoticeContent = (id) => {
        axios('get', '/api/notice/getNoticeContent', {
            id: id,
        }).then((json) => {
            let { contents } = this.state;
            contents[id] = json.data;
            this.setState({
                contents
            })
        })
    }

    //渲染展开通知内容
    renderContent = (id) => {
        return (
            <div className={`${this.state.arrExpan.includes(id) ? styles['detail'] : styles['detailHidden']}`} >
                <p className={styles['noticeContent']}>{ this.state.contents[id].content }</p>
                <div className={styles['wrap']}>
                    {
                        this.state.contents[id].accessorys.length !== 0 && this.state.contents[id].accessorys.map((img,index)=>{
                            {
                                return(
                                    <div className={styles['imgBlock']} key={index}>
                                        <img src={img.fileUrl} className={styles['noticeimg']} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
    //下拉加载
    onTouchMove(e) {
        e.preventDefault();
        let offsetHeight = this.container.offsetHeight
        let scrollHeight = this.container.scrollHeight
        let scrollTop = this.container.scrollTop
        if (scrollTop + offsetHeight >= scrollHeight - 100 && this.state.lock) {
            this.setState({
                idx: this.state.idx + 1,
                lock: false
            }, () => {
                this.getNoticeList(this.state.idx);
            })
        }
    }
    render() {
        let { arrExpan, noticeList, contents, lock } = this.state;
        const defaultPage = (
            <div className={styles['defaultImg']}>
                <img src={noNoticeImg} />
                <p className={styles['text']}>暂无通知</p> 
            </div>
        )
        const noticeContent = (
            <div ref={(container) => { this.container = container }} className={styles['container']} onScroll={(e) => { this.onTouchMove(e) }}>
                <ul className={styles['list']}>
                    {
                        noticeList.length !== 0 && noticeList.map((item, index) => {
                            return (
                                <li className={styles['content']} key={index}>
                                    <div className={styles['title']}>
                                        <div className={styles['clickexpand']} onClick={() => this.checkStatus(item.id)}>
                                            {
                                                arrExpan.includes(item.id)
                                                    ?
                                                    <Fragment>
                                                        <span>收起</span><img src={collapseImg} className={styles['collapse']} />
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <span>展开</span><img src={expandImg} className={styles['expand']} />
                                                    </Fragment>
                                            }
                                        </div>
                                        <span className={styles['titlename']}>{item.title}</span>
                                        <span className={styles['time']}>{moment(item.start).format('YYYY-MM-DD HH:mm')}</span>
                                    </div>
                                    { contents[item.id] && arrExpan.includes(item.id) ? this.renderContent(item.id) : ''}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
        const notice = (
            <Fragment>
                <BackPrevHeader />
                    { lock ? '' : noticeList.length === 0 ? defaultPage : noticeContent}
                <Tab />
            </Fragment>
        )
        return notice;
    }
}

export default Notice