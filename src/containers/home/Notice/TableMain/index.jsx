import React from 'react';
import style from './index.scss';
import Polling from 'UTILS/polling';
import axios from 'UTILS/axios';
import moment from 'moment';
import { noNoticeImg } from 'ASSETS/home';

export default class TableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList : [],
            content : '',  //通知只有一条时的内容区
        };
        const timer = new Polling({
            timeout: 1000*100,
            fn: this.getNoticeList
        });
        this.timer = timer;
    }
    componentDidMount() {
        // TODO: 开启定时器
        this.timer.loop();
        this.getNoticeList();
       
    }
    componentWillUnmount(){
        this.timer.destroy();
    }
    //获取通知列表
    getNoticeList = () => {
        axios('get','/api/index/notice',{
            current_page: 1,
            page_size : 20,
        }).then((json)=>{
            this.props.changeNoticeList(json.data.dataList||[]);
            if( json.data.dataList.length === 1 ){
                this.getNoticeContent(json.data.dataList[0].id);
            }
            this.setState({       
                noticeList : json.data.dataList,
            })
        }) 
    }

    //通知详情
    getNoticeContent = (id) => {
        axios('get', '/api/notice/getNoticeContent', {
            id: id,
        }).then((json) => {
            this.setState({
                content: json.data.content,
            })
        })
    }

    renderTableLine = ({ title, start }, index) => {
        return(
            <div className={style['line']} key={index}>
                <div className={style['lineStyle']}>
                    <span className={style['title']}>{title}</span>
                    <span className={style['start']}>{moment(start).format('YYYY-MM-DD HH:mm')}</span>
                </div>
                {
                    this.state.content !== '' ? this.renderContent() : ''
                }
            </div>
        )
    }
    //只有一条通知时渲染内容区
    renderContent = () => {
        return (
            <div className={style.detail} >
                { this.state.content }
            </div>
        )
    }
    render() {
        const { noticeList } = this.state;
        return (
            <div className={style['tableContent']}>
            {
                noticeList.length === 0 ? 
                    <div className={style['defaultImg']}>
                        <img src={noNoticeImg} />
                        <p className={style['text']}>暂无通知</p> 
                    </div>
                :
                <ul>
                    {
                        noticeList.slice(0,3).map((ele,index) => 
                            this.renderTableLine(ele,index)
                        )
                    }
                </ul>
            }
                
            </div>
        );
    }
}
TableMain.defaultProps = {};
TableMain.propTypes = function(){};
TableMain.propTypes = {};
