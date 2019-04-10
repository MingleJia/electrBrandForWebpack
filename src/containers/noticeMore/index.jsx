import React,{Component, Fragment} from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import axios from 'UTILS/axios';
import moment from 'moment';
class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrExpan :[],
            noticeList : [],
            curPage : 1,
            pageSize: 10,
            contents : {}, //收起展开内容区
        }
    }

    componentDidMount(){
        this.getNoticeList();
    }

    //获取通知列表
    getNoticeList = () => {
        axios('get','/api/index/notice',{
            current_page: 1,
            page_size : 20,
        }).then((json)=>{
            let { arrExpan } = this.state;
            arrExpan.push(json.data.dataList[0].id);
            this.getNoticeContent(json.data.dataList[0].id);
            this.setState({       
                noticeList : json.data.dataList,
                arrExpan : arrExpan,
            })
        })
    }
    //展开收起
    checkStatus = (value) => {
        let { arrExpan,  }  = this.state;
        arrExpan.includes(value) ? arrExpan.splice(arrExpan.indexOf(value),1) : arrExpan.push(value) && this.getNoticeContent(value);
        this.setState({
            arrExpan : arrExpan,
        })
    }

    //通知详情
    getNoticeContent = (id) => {
        axios('get','/api/notice/getNoticeContent',{
            id: id,
        }).then((json)=>{
            let { contents } = this.state;
            contents[id] = json.data.content;
            this.setState({
                contents
            })
        })
    }

    //渲染展开通知内容
    renderContent = (id) => {
        return(
            <div className={`${ this.state.arrExpan.includes(id) ? styles['detail'] : styles['detailHidden'] }`} dangerouslySetInnerHTML={{__html:`${ this.state.contents[id] }`}} >
                                       
            </div>
        )
    }
    render(){
        let {arrExpan,noticeList,contents} = this.state;
        const notice = (
            <Fragment>
                <BackPrevHeader />
                <div className={styles['container']}>
                    <ul className={styles['list']}>
                        {
                            noticeList.length !== 0 && noticeList.map((item,index)=>{
                                return(
                                    <li className={styles['content']} key={index}>
                                        <div className={styles['title']}>
                                            <div className={styles['clickexpand']} onClick={ ()=>this.checkStatus(item.id) }>
                                                { arrExpan.includes(item.id) ? '收起' : '展开' }
                                                <div className={`${arrExpan.includes(item.id) ? styles['collapse'] : styles['expand'] }`}></div>
                                            </div> 
                                            <span className={styles['titlename']}>{item.title}</span>
                                            <span className={styles['time']}>{ moment(item.createtime).format('YYYY-MM-DD HH:mm')}</span>
                                        </div>
                                        {  contents[item.id] && arrExpan.includes(item.id) ? this.renderContent(item.id) : '' }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Tab />
            </Fragment>
        )
        return notice;
    }
}

export default Notice