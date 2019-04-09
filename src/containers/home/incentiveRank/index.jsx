import React,{Component, Fragment} from 'react';
import styles from './index.scss';
import { tipsImg, moreImg, flowerImg, creditImg, firstImg, secondImg, thirdImg } from 'ASSETS/home';
import { Link } from 'react-router-dom';
import axios from 'UTILS/axios';

class Rank extends Component{
    constructor(props){
        super(props);
        this.state = {
            flowerRank: [], // 红花排行
            scoreRank: [],  // 勤学排行
            congratulations: [],    // 祝贺语
        }
    }

    componentDidMount(){
        this.getData();
        // const rankList = document.getElementById('rank-list');
        // const original = document.getElementById('original');
        // this.flowerScroll = setInterval(()=>{
        //     if(rankList.scrollTop > original.offsetHeight){
        //         rankList.scrollTop = 0;
        //     }else{
        //         rankList.scrollTop += 1;
        //     }
        // }, 20);
    }

    componentWillUnmount(){
        // clearInterval(this.flowerScroll);
    }

    getData=()=>{
        axios('get', '/api/index/rank?type=1',).then((json)=>{
            this.setState({
                flowerRank: json.data.flowerRank,
                scoreRank: json.data.scoreRank,
            });
        })
        axios('get', '/api/index/congratulation').then((json)=>{
            let arrCongratulations = [];
            for (let i in json.data) {
                arrCongratulations.push(json.data[i]); 
            }
            this.setState({ congratulations: arrCongratulations });
        })
    }

    listItem=({ studentName, number }, index)=>{
        const rankImg = [ firstImg, secondImg, thirdImg ];
        return (
            <li key={index}>
                { index < 3 ? <img src={ rankImg[index] }></img> : <span className={styles['ranking']}>{ index + 1 }</span> }
                <span className={styles['student-name']}>{ studentName }</span>
                <span className={styles['number']}>{ number }</span>
            </li>
        )
    }

    render(){
        const { flowerRank, scoreRank, congratulations } = this.state;
        const rank = (
            <div className={styles['rank']}>
                <div className={styles['top']}>
                    <span className={styles['title']}>
                        本周激励排行版
                        <img src={ tipsImg }></img>
                    </span>
                    <Link to='/incentivemonth' className={styles['more']}>
                        月排行榜<img src={ moreImg }></img>
                    </Link>
                </div>
                <div className={styles['container']}>
                    <div className={styles['item']}>
                        <img src={ flowerImg } className={styles['icon']}></img>
                        <p className={styles['item-title']}>红花奖励TOP20</p>
                        <div className={styles['rank-list']} id='rank-list'>
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
                                    <ul id='clone-rank-list'>
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
                        <div className={styles['rank-list']}>
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
                <p className={styles['congratulations']}>
                    { flowerRank.length!==0 || scoreRank.length!==0 && congratulations.length !== 0 ? congratulations[Math.round(Math.random() * congratulations.length)] : '' }
                </p>
            </div>
        )
        return rank;
    }
}

export default Rank;