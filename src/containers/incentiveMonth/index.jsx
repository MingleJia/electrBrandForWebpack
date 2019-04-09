import React,{Component, Fragment} from 'react';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import { flowerImg, creditImg, firstImg, secondImg, thirdImg, tipsWhiteImg, goodImg } from 'ASSETS/home';
import axios from 'UTILS/axios';

class IncentiveMonth extends Component{
    constructor(props){
        super(props)
        this.state = {
            flowerRank : [],
            scoreRank : [],
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        axios('get', '/api/index/rank?type=2',).then((json)=>{
            this.setState({
                flowerRank: json.data.flowerRank,
                scoreRank: json.data.scoreRank,
            });
        })
    }

    listItem=({ userName, value }, index)=>{
        const rankImg = [ firstImg, secondImg, thirdImg ];
        return (
            <li key={index}>
                { index < 3 ? <img src={ rankImg[index] }></img> : <span className={styles['ranking']}>{ index + 1 }</span> }
                <span className={styles['student-name']}>{ userName }</span>
                <span className={styles['number']}>{ value }</span>
            </li>
        )
    }
    render(){
        const { flowerRank, scoreRank } = this.state;
        const encouragement = (
            <div className={styles['encouragement']}>
                <img src={ goodImg }></img>
                <span>
                    哇~~~~~~真棒！！！<br />
                    辛勤耕耘，快乐收获
                </span>
            </div>
        )
        const incentiveMonth = (
            <Fragment>
                <div className={styles['title']}>
                    <span>
                        本月激励排行榜
                        <img src={ tipsWhiteImg }></img>
                    </span>
                </div>
                <div className={styles['container']}>
                    <div className={styles['item']}>
                        <img src={ flowerImg } className={styles['icon']}></img>
                        <p className={styles['item-title']}>红花奖励TOP20</p>
                        <div className={styles['list']}>
                            {
                                flowerRank.length !== 0 ?
                                <Fragment>
                                    <ul id='original'>
                                        { 
                                            flowerRank.map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                </Fragment> : 
                                <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                            }
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <img src={ creditImg } className={styles['icon']}></img>
                        <p className={styles['item-title']}>勤学分奖励TOP20</p>
                        <div className={styles['list']}>
                            {
                                scoreRank.length !== 0 ?
                                <Fragment>
                                    <ul id='original'>
                                        { 
                                            scoreRank.map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                    <ul id='clone-rank-list'>
                                        {
                                            scoreRank.map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                </Fragment> : 
                                <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                            }
                        </div>
                    </div>
                </div>
                { flowerRank.length !==0 || scoreRank.length!==0 ?  encouragement : '' }
                <Tab />
            </Fragment>
        )
        return incentiveMonth;
    }
}

export default IncentiveMonth;