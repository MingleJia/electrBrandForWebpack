import React,{Component} from 'react';
import styles from './index.scss';

class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrExpan :[],
            noticeList : [],
        }
    }

    componentDidMount(){
        let noticeList = [
            {
                title:111,
            },
            {
                title:222,
            },
            {
                title:113331,
            },
            {
                title:144411,
            },
        ];
        this.setState({
            noticeList:noticeList,
        })
    }

    //展开收起
    checkStatus = (value) => {
        let { arrExpan,  }  = this.state;
        arrExpan.includes(value) ? arrExpan.splice(arrExpan.indexOf(value),1) : arrExpan.push(value);
        this.setState({
            arrExpan : arrExpan,
        })
    }

    render(){
        let { arrExpan, noticeList } = this.state;
        const notice = (
            <div className={styles['container']}>
                <ul className={styles['list']}>
                    {
                        noticeList.length !== 0 && noticeList.map((item,index)=>{
                            return(
                                <li className={styles['content']} key={index}>
                                    <div className={styles['title']}>
                                            <div className={styles['clickexpand']} onClick={ ()=>this.checkStatus(index) }>
                                                { arrExpan.includes(index) ? '收起' : '展开' }
                                                <div className={`${arrExpan.includes(index) ? styles['collapse'] : styles['expand'] }`}></div>
                                            </div> 
                                            <span className={styles['titlename']}>关于开展2019年全市学校卫生与健康专项监督检查的通知</span>
                                            <span className={styles['time']}>2019-03-28  11:32</span>
                                    </div>
                                    <div className={`${ arrExpan.includes(index) ? styles['detail'] : styles['detailHidden'] }`}>
                                            <p className={styles['text']}>
                                            为全面贯彻落实党的十九大精神，深入实施健康中国战略，加强推进教育现代化，持续强化对全市学校（含托幼机构）传染病防控与食堂食品安全监管，有效防控学校传染病疫情和食物中毒等突发公共卫生事件发生，全力保障广大师生生命安全与身体健康，经研究决定在全市学校（含托幼机构）继续开展以学校食堂食品安全、生活饮用水卫生、学校传染病防控、教学及生活环境为主要内容的专项监督检…
                                            为全面贯彻落实党的十九大精神，深入实施健康中国战略，加强推进教育现代化，持续强化对全市学校（含托幼机构）传染病防控与食堂食品安全监管，有效防控学校传染病疫情和食物中毒等突发公共卫生事件发生，全力保障广大师生生命安全与身体健康，经研究决定在全市学校（含托幼机构）继续开展以学校食堂食品安全、生活饮用水卫生、学校传染病防控、教学及生活环境为主要内容的专项监督检…
                                            </p>
                                    </div>
                                </li>
                            )
                        })
                    }
                    
                    {/* <li className={styles['content']}>
                        <div className={styles['title']}>
                                <div className={styles['clickexpand']}>
                                    收起<div className={styles['collapse']}></div>
                                </div>
                                <span className={styles['titlename']}>关于开展2019年全市学校卫生与健康专项监督检查的通知</span>
                                <span className={styles['time']}>2019-03-28  11:32</span>
                        </div>
                        <div className={styles['detail']}>
                                <p className={styles['text']}>
                                为全面贯彻落实党的十九大精神，深入实施健康中国战略，加强推进教育现代化，持续强化对全市学校（含托幼机构）传染病防控与食堂食品安全监管，有效防控学校传染病疫情和食物中毒等突发公共卫生事件发生，全力保障广大师生生命安全与身体健康，经研究决定在全市学校（含托幼机构）继续开展以学校食堂食品安全、生活饮用水卫生、学校传染病防控、教学及生活环境为主要内容的专项监督检…
                                </p>
                        </div>
                    </li> */}
                </ul>
            </div>
        )
        return notice;
    }
}

export default Notice