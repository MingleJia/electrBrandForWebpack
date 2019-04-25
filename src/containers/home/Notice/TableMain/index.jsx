import React,{Component} from 'react';
import style from './index.scss';
import Polling from 'UTILS/polling';
import axios from 'UTILS/axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { noNoticeImg } from 'ASSETS/home';
import Loading from 'COMPONENTS/loading';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNotice } from 'MODULES/root/actions';

class TableMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList : [],
            content : '',  //通知只有一条时的内容区
            loadingnotice: true,
        };
        const timer = new Polling({
            timeout: 1000*100,
            fn: this.getNoticeList
        });
        this.timer = timer;
    }

    static propTypes = {
        history: PropTypes.object,
        setNotice: PropTypes.func,
        root: PropTypes.object,
    }

    componentDidMount() {
        // TODO: 开启定时器
        this.timer.loop();
        // this.getNoticeList();
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
            if( json.data.length !== 0 && json.data.dataList.length === 1 ){
                this.getNoticeContent(json.data.dataList[0].id);
            }
            this.setState({       
                noticeList : json.data.dataList||[],
            })
        }).then(()=>{
            this.setState({       
                loadingnotice : false,
            })
        })
    }

    //通知详情
    getNoticeContent = (id) => {
        axios('get', '/api/notice/getNoticeContentWithNoPic', {
            id: id,
        }).then((json) => {
            this.setState({
                content: json.data.content,
            })
        })
    }

    jumpDetailNotice = (index,id) => {
        window.console.log(index)
        this.props.setNotice({
            noticeId: id,
            noticeNum: index,
        })
    }

    renderTableLine = ({ title, start,id }, index) => {
        return(
            <Link to='/noticemore'iv className={style['line']} key={index} onClick={ ()=> this.jumpDetailNotice(index,id) }>
                <div className={style['lineStyle']}>
                    <span className={style['title']}>{title}</span>
                    <span className={style['start']}>{moment(start).format('YYYY-MM-DD HH:mm')}</span>
                </div>
                {
                    this.state.content !== '' ? this.renderContent() : ''
                }
            </Link>
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
        const { noticeList,loadingnotice } = this.state;
        const defaultPage = (
            <div className={style['defaultImg']}>
                <img src={noNoticeImg} />
                <p className={style['text']}>暂无通知</p> 
            </div>
        )
        const noticeContent = (
            <div className={style['noticeList']}>
                {
                    noticeList.slice(0,3).map((ele,index) => 
                        this.renderTableLine(ele,index)
                    )
                }
            </div>  
        )
        return (
            <div className={style['tableContent']}>
                { loadingnotice ? <Loading/> : noticeList.length === 0 ? defaultPage : noticeContent }
            </div>
        );
    }
}
TableMain.defaultProps = {};
TableMain.propTypes = function(){};
TableMain.propTypes = {};

export default connect(
    ({ root }) => ({
        root: root,
    }), { setNotice }
)(TableMain)