import React,{Component, Fragment} from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import axios from 'UTILS/axios';
class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrExpan :[0,],
            noticeList : [],
            curPage : 1,
            pageSize: 20,
        }
    }

    componentDidMount(){
        axios('get','/api/index/notice',{
            current_page: 1,
            page_size : 20,
        }).then((json)=>{
            let arrExpand = [];
            this.setState({       
                noticeList : json.data.dataList,
                arrExpan : arrExpand.push(json.data.dataList[0].id),
            })
            window.console.log(arrExpand.push(json.data.dataList[0].id))
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
        }).then(()=>{

        })
    }

    render(){
        let { arrExpan, noticeList } = this.state;
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
                                                { arrExpan.includes(index) ? '收起' : '展开' }
                                                <div className={`${arrExpan.includes(item.id) ? styles['collapse'] : styles['expand'] }`}></div>
                                            </div> 
                                            <span className={styles['titlename']}>{item.title}</span>
                                            <span className={styles['time']}>{item.createtime}</span>
                                        </div>
                                        <div className={`${ arrExpan.includes(item.id) ? styles['detail'] : styles['detailHidden'] }`} dangerouslySetInnerHTML={{__html:`${item.title}`}}>

                                        </div>
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