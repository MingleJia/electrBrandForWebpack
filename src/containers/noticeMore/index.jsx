import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import styles from './index.scss';
import axios from 'UTILS/axios';
import moment from 'moment';
import { collapseImg, expandImg, } from 'ASSETS/campusstyle';
import { noNoticeImg } from 'ASSETS/home';
import { loadingImg } from 'ASSETS/loading';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNotice } from 'MODULES/root/actions';

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
            loading: true,//正在加载中,未来可以用来设置loading
        }
    }

    static propTypes = {
        setNotice: PropTypes.func,
        root: PropTypes.object,
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
            //默认数据展示,根据首页点击的通知展示，否则默认展示第一条
            let { arrExpan } = this.state;
            if (idx == 1) {
                arrExpan.push(json.data.dataList[this.props.root.noticeNum].id);
                this.getNoticeContent(json.data.dataList[this.props.root.noticeNum].id);
            }
            // let noticeList=json.data.dataList;
            this.setState({
                noticeList: [
                    ...this.state.noticeList,
                    ...json.data.dataList,
                ],
                arrExpan: arrExpan,
                lock: true,
                loading: true
            })
            
        }).then(() => {
            this.setState({
                loading: false
            })
            let offsetList = document.getElementById('contentList');
            let ulList = document.getElementById('wrapList');
            if(ulList.scrollHeight > 988){
                offsetList.scrollTop = 100*this.props.root.noticeNum;
            }
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
            contents[id] = json.data.content;
            this.setState({
                contents
            })
        })
    }

    //渲染展开通知内容
    renderContent = (id) => {
        return (
            <div className={`${this.state.arrExpan.includes(id) ? styles['detail'] : styles['detailHidden']}`} dangerouslySetInnerHTML = {{ __html: `${this.state.contents[id]}` }}>
            
            </div>
        )
    }
    //下拉加载
    onTouchMove(e) {
        e.preventDefault();
        let offsetHeight = this.container.offsetHeight;
        let scrollHeight = this.container.scrollHeight;
        let scrollTop = this.container.scrollTop;
        if (scrollTop + offsetHeight >= scrollHeight - 100 && this.state.lock) {
            this.setState({
                idx: this.state.idx + 1,
                lock: false
            }, () => {
                this.getNoticeList(this.state.idx);
            })
        }
    }
    //如果滑到底部就返回,针对移动端
    goToBottom() {
        let offsetHeight = this.container.offsetHeight;
        let scrollHeight = this.container.scrollHeight;
        let scrollTop = this.container.scrollTop;
        //必须没有数据且拉到底部,且整体高度大于898,且消息长度大于8条
        if (this.state.isOver && scrollTop + offsetHeight > scrollHeight - 90 && scrollHeight > 898 &&this.state.noticeList.length > 8 ) {
            this.backTimer = setInterval(() => {
                offsetHeight = this.container.offsetHeight;
                scrollHeight = this.container.scrollHeight;
                scrollTop = this.container.scrollTop;
                this.container.scrollTop -= 10
                if (scrollTop + offsetHeight + 80 < scrollHeight) clearInterval(this.backTimer);
            }, 10)
        }

    }
    render() {
        let { arrExpan, noticeList, contents, loading, isOver } = this.state;
        const defaultPage = (
            <div className={styles['defaultImg']}>
                <img src={noNoticeImg} />
                <p className={styles['text']}>暂无通知</p>
            </div>
        )
        const noticeContent = (
            <div ref={(container) => { this.container = container }}
                className={styles['container']}
                onTouchEnd={() => { this.goToBottom() }}
                onScroll={(e) => { this.onTouchMove(e) }}
                id="contentList"
                >
                <ul className={styles['list']} id="wrapList">
                    {
                        noticeList.length !== 0 && noticeList.map((item, index) => {
                            return (
                                <li className={styles['content']} key={index}  onClick={() => this.checkStatus(item.id)}>
                                    <div className={styles['title']}>
                                        <div className={styles['clickexpand']}>
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
                                    {contents[item.id] && arrExpan.includes(item.id) ? this.renderContent(item.id) : ''}
                                </li>
                            )
                        })
                    }
                    <div style={{ display: `${isOver && noticeList.length > 8 ? 'block' : 'none'}` }} className={styles['noMore']}>没有更多数据</div>
                </ul>
            </div>
        )
        const notice = (
            <Fragment>
                <BackPrevHeader />
                {
                    loading ? <div className={styles['loading']}>
                        <img src={loadingImg} />
                    </div> : null
                }
                {noticeList.length === 0 ? defaultPage : noticeContent}
                {/* <Tab /> */}
            </Fragment>
        )
        return notice;
    }
}

export default connect(
    ({ root }) => ({
        root: root,
    }), { setNotice }
)(Notice)