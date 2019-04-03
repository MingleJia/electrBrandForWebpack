import React,{Component} from 'react';
import styles from './index.scss';
import { tipsImg, moreImg, flowerImg, creditImg, firstImg, secondImg, thirdImg } from 'ASSETS/home';
import { Link } from 'react-router-dom';

class Rank extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        let { data } = this.state;
        for(let i = 0; i < 20; i++){
            data = data.concat({
                studentName: '王'+(i+1),
                number: i+1,
            })
        }
        this.setState({ data });
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
        const { data } = this.state;
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
                                { 
                                    data.length !== 0 && data.map((item, index)=>{
                                        return this.listItem(item, index);
                                    })
                                }
                            </ul>
                            <ul id='clone-rank-list'>
                                {
                                    data.length !== 0 && data.map((item, index)=>{
                                        return this.listItem(item, index);
                                    })
                                }
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