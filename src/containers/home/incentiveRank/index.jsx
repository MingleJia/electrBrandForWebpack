import React,{Component} from 'react';
import styles from './index.scss';
import { tipsImg, moreImg, flowerImg, creditImg, firstImg, secondImg, thirdImg } from 'ASSETS/home';
import { Link } from 'react-router-dom';

class Rank extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
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

    render(){
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
                            <ul id='original'>
                                <li>
                                    <img src={ firstImg }></img>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>999+</span>
                                </li>
                                <li>
                                    <img src={ secondImg }></img>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <img src={ thirdImg }></img>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>4</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>18</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>19</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>20</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                            </ul>
                            <ul id='clone-rank-list'>
                                <li>
                                    <img src={ firstImg }></img>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>999+</span>
                                </li>
                                <li>
                                    <img src={ secondImg }></img>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <img src={ thirdImg }></img>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>4</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>18</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>19</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>20</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <img src={ creditImg } className={styles['icon']}></img>
                        <p className={styles['item-title']}>勤学分奖励TOP20</p>
                        <div className={styles['rank-list']}>
                            <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                        </div>
                    </div>
                </div>
                <p className={styles['congratulations']}>恭喜以上同学，都是最棒的</p>
            </div>
        )
        return rank;
    }
}

export default Rank;