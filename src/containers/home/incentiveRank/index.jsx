import React,{Component, Fragment} from 'react';
import {Popover} from 'antd';
import styles from './index.scss';
import { tipsImg, moreImg, flowerImg, creditImg, firstImg, secondImg, thirdImg, } from 'ASSETS/home';
import noImg from '../../../assets/campusstyle/no-img.png';
import { Link } from 'react-router-dom';
import axios from 'UTILS/axios';
import Loading from 'COMPONENTS/loading';

class Rank extends Component{
    constructor(props){
        super(props);
        this.state = {
            flowerRank: [], // 红花排行
            scoreRank: [],  // 勤学排行
            congratulations: [],    // 祝贺语
            loading: true,
        }
    }

    componentDidMount(){
        this.getData(); 
    }

    componentWillUnmount(){
        clearInterval(this.flowerScroll);
        clearInterval(this.scoreRankScoll);
    }

    getData=()=>{
        axios('get', '/api/index/rank?type=1',).then((json)=>{
            this.setState({
                flowerRank: json.data.flowerRank,
                scoreRank: json.data.scoreRank,
            });
        }).then(()=>{
            const { flowerRank,scoreRank } = this.state;
            this.setState({
                loading: false,
            })
            if(flowerRank.length !== 0 && flowerRank.length > 5){
                const rankList = document.getElementById('rank-list-flower');
                const original = document.getElementById('original-flower');
                this.flowerScroll = setInterval(()=>{
                    if(rankList.scrollTop > original.offsetHeight){
                        rankList.scrollTop = 0;
                    }else{
                        rankList.scrollTop += 1;
                    }
                }, 20);
            }
            if( scoreRank.length!== 0 && scoreRank.length > 5 ){
                const rankScore = document.getElementById('rank-list-score');
                const originalScore = document.getElementById('original-score');
                this.scoreRankScoll = setInterval(()=>{
                    if(rankScore.scrollTop > originalScore.offsetHeight){
                        rankScore.scrollTop = 0;
                    }else{
                        rankScore.scrollTop += 1;
                    }
                }, 20);
            }
            
        })
        axios('get', '/api/index/congratulation').then((json)=>{
            let arrCongratulations = [];
            for (let i in json.data) {
                // arrCongratulations.push(json.data[i]); 
                // console.log(i)
                if(json.data[i].type==3){
                    arrCongratulations.push(json.data[i].content)
                }
            }

            // json.data.forEach((item)=>{
            //     if(item.type==1){
            //         arrCongratulations.push(item.content)
            //     }
            // })
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

    render(){
        const { flowerRank, scoreRank, congratulations,loading } = this.state;

        //悬浮排行榜规则提示框
        const tips = (
            <div className={styles['tips']}>
                <p>若获得奖励数相同，则以优先获得为准。</p>
                <p>数据每日零点更新。</p>
            </div>
        )

        const incentivemonth = (
            <Link to='/incentivemonth' className={styles['more']}>
                月排行榜<img src={ moreImg }></img>
            </Link>
        )

        const rankContent=(
            <div className={styles['container']}>
                <div className={styles['item']}>
                    <img src={ flowerImg } className={styles['icon']}></img>
                    <p className={styles['item-title']}>红花奖励TOP20</p>
                    <div className={styles['rank-list']} id='rank-list-flower'>
                        {
                            flowerRank.length !== 0 ?
                            <Fragment>
                                <ul id='original-flower'>
                                    { 
                                        flowerRank.map((item, index)=>{
                                            return this.listItem(item, index);
                                        })
                                    }
                                </ul>
                                {
                                    flowerRank.length  > 5 ? 
                                    <Fragment>
                                        <ul id='clone-rank-list-flower'>
                                        {
                                            flowerRank.map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                    </Fragment>  :
                                    ''
                                }
                            </Fragment> : 
                            <div className={styles['no-data-wrap']}>
                                <img src={noImg} alt=""/>
                                <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles['item']}>
                    <img src={ creditImg } className={styles['icon']}></img>
                    <p className={styles['item-title']}>勤学分奖励TOP20</p>
                    <div className={styles['rank-list']} id='rank-list-score'>
                        {
                            scoreRank.length !== 0 ?
                            <Fragment>
                                <ul id='original-score'>
                                    { 
                                        scoreRank.map((item, index)=>{
                                            return this.listItem(item, index);
                                        })
                                    }
                                </ul>
                                {
                                    scoreRank.length  > 5 ? 
                                    <Fragment>
                                        <ul id='clone-rank-list-score'>
                                            {
                                                scoreRank.map((item, index)=>{
                                                    return this.listItem(item, index);
                                                })
                                            }
                                        </ul>
                                    </Fragment>  :
                                    ''
                                }
                            </Fragment> : 
                            <div className={styles['no-data-wrap']}>
                                <img src={noImg} alt=""/>
                                <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
        const rank = (
            <div className={styles['rank']}>
                <div className={styles['top']}>
                    <span className={styles['title']}>
                        本周激励排行榜
                        <Popover placement="bottomLeft" content={tips} trigger="click">
                            <img src={ tipsImg }></img>
                        </Popover>
                    </span>
                    { flowerRank.length === 0 && scoreRank.length === 0 ? '' : incentivemonth }
                </div>
                { loading ? <Loading/> : rankContent }
                <p className={styles['congratulations']}>
                    { flowerRank.length!==0 || scoreRank.length!==0 && congratulations.length !== 0 ? congratulations[Math.floor(Math.random() * congratulations.length)] : '' }
                </p>
            </div>
        )
        return rank;
    }
}

export default Rank;