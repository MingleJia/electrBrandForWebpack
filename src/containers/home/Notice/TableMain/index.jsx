import React from 'react';
import style from './index.scss';
import Polling from 'UTILS/polling';
import axios from 'UTILS/axios';
import moment from 'moment';

export default class TableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList : [],
        };
        const timer = new Polling({
            timeout: 1000*10,
            fn: this.fetchNoticeData
        });
        this.timer = timer;
    }
    componentDidMount() {
        // TODO: 开启定时器
        // this.timer.loop();
        this.getNoticeList();
       
    }
    //获取通知列表
    getNoticeList = () => {
        axios('get','/api/index/notice',{
            current_page: 1,
            page_size : 20,
        }).then((json)=>{
            this.setState({       
                noticeList : json.data.dataList,
            })
        }) 
    }
    
    fetchNoticeData = () => {
        
    }

    renderTableLine = ({ title, start }, index) => {
        return(
            <div className={style['lineStyle']} key={index}>
                <span className={style['title']}>{title}</span>
                <span className={style['start']}>{moment(start).format('YYYY-MM-DD HH:mm')}</span>
            </div>
        )
    }
    render() {
        const { noticeList } = this.state;
        return (
            <div className={style['tableContent']}>
                <ul>
                    {
                        noticeList.map((ele,index) => 
                            this.renderTableLine(ele,index)
                        )
                    }
                </ul>
            </div>
        );
    }
}

