import React,{Component, Fragment} from 'react';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import { flowerImg, creditImg, firstImg, secondImg, thirdImg, tipsWhiteImg, goodImg } from 'ASSETS/home';

class IncentiveMonth extends Component{
    constructor(props){
        super(props)
    }

    render(){
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
                            <ul>
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
                                    <span className={styles['ranking']}>5</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>6</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>7</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>8</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>9</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                                <li>
                                    <span className={styles['ranking']}>10</span>
                                    <span className={styles['student-name']}>王蓝一</span>
                                    <span className={styles['number']}>919</span>
                                </li>
                            </ul>
                            <ul>
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
                        <div className={styles['list']}>
                            <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                        </div>
                    </div>
                </div>
                <div className={styles['encouragement']}>
                    <img src={ goodImg }></img>
                    <span>
                        哇~~~~~~真棒！！！<br />
                        辛勤耕耘，快乐收获
                    </span>
                </div>
                <Tab />
            </Fragment>
        )
        return incentiveMonth;
    }
}

export default IncentiveMonth;