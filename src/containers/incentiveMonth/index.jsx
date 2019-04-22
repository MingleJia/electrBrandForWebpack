import React,{Component, Fragment} from 'react';
// import {Popover} from 'antd';
// import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import { flowerImg, creditImg, firstImg, secondImg, thirdImg, goodImg } from 'ASSETS/home';
// import { flowerImg, creditImg, firstImg, secondImg, thirdImg, tipsWhiteImg, goodImg } from 'ASSETS/home';
import { backImg } from 'ASSETS/header';
import axios from 'UTILS/axios';
import Loading from 'COMPONENTS/loading';

class IncentiveMonth extends Component{
    constructor(props){
        super(props)
        this.state = {
            flowerRank : [],
            scoreRank : [],
            congratulations:[],
            loading: true,
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        axios('get', '/api/index/rank?type=2',).then((json)=>{
            this.setState({
                flowerRank: json.data.flowerRank||[],
                scoreRank: json.data.scoreRank||[],
            });
        }).then(()=>{
            this.setState({
                loading:false,
            })
        })
        axios('get', '/api/index/congratulation').then((json)=>{
            let arrCongratulations = [];
            for (let i in json.data) {
                arrCongratulations.push(json.data[i]); 
            }
            this.setState({ congratulations: arrCongratulations });
        })
    }

    listItem=({ userName, value }, index)=>{
        const rankImg = [ firstImg, secondImg, thirdImg ];
        return (
            <li key={index}>
                { index < 3 ? <img src={ rankImg[index] }></img> : <span className={styles['ranking']}>{ index + 1 }</span> }
                <span className={styles['student-name']}>{ userName }</span>
                <span className={styles['number']}>{ value > 999 ? '999+' : value }</span>
            </li>
        )
    }

    //返回
    backHome = () => {
        window.history.back(-1);
    }

    render(){
        const { flowerRank, scoreRank,congratulations,loading } = this.state;
        const encouragement = (
            <div className={styles['encouragement']}>
                <img src={ goodImg }></img>
                <span>
                    { flowerRank.length!==0 || scoreRank.length!==0 && congratulations.length !== 0 ? congratulations[Math.floor(Math.random() * congratulations.length)] : '' }
                </span>
            </div>
        )

        //悬浮排行榜规则提示框
        // const tips = (
        //     <div className={styles['tips']}>
        //         <p>若获得奖励数相同，则以优先获得为准。</p>
        //         <p>数据每日零点更新。</p>
        //     </div>
        // )

        const rankcontent = (
            <Fragment>
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
                                            flowerRank.slice(0,10).map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                    <ul id='clone-rank-list'>
                                        {
                                            flowerRank.slice(10).map((item, index)=>{
                                                return this.listItem(item, index+10);
                                            })
                                        }
                                    </ul>
                                </Fragment> : 
                                <p className={styles['no-data']}>本月排名暂未产生<br/>敬请期待明日公布</p>
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
                                            scoreRank.slice(0,10).map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                    <ul id='clone-rank-list'>
                                        {
                                            scoreRank.slice(10).map((item, index)=>{
                                                return this.listItem(item, index+10);
                                            })
                                        }
                                    </ul>
                                </Fragment> : 
                                <p className={styles['no-data']}>本月排名暂未产生<br/>敬请期待明日公布</p>
                            }
                        </div>
                    </div>
                </div>
                { flowerRank.length !==0 || scoreRank.length!==0 ?  encouragement : '' }
            </Fragment>
        )
        const incentiveMonth = (
            <Fragment>
                <div className={styles['title']}>
                    <div className={styles['back']} onClick={() => this.backHome()}>
                        <img className={styles['backimg']} src={ backImg }></img><span>返回</span>
                    </div>
                    <span>
                        本月激励排行榜
                        {/* <Popover placement="bottomLeft" content={tips} trigger="click" overlayClassName="monthRank">
                            <img src={ tipsWhiteImg }></img>
                        </Popover> */}
                    </span>
                </div>
                
                { loading? <Loading/> : rankcontent  }
               
                {/* <Tab /> */}
            </Fragment>
        )
        return incentiveMonth;
    }
}

export default IncentiveMonth;