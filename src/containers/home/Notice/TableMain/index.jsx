import React from 'react';
import style from './index.scss';
import Polling from 'UTILS/polling';
import axios from 'UTILS/axios';
import moment from 'moment';
<<<<<<< HEAD
import noInfoImg from 'ASSETS/home/info.png';
=======
import { noNoticeImg } from 'ASSETS/home';
>>>>>>> 49cc75add5456578723efde536e0932fb702133e

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
            this.props.changeNoticeList(json.data.dataList||[]);
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
