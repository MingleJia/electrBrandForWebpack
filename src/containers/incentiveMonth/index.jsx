import React,{Component, Fragment} from 'react';
import styles from './index.scss';
import { flowerImg, creditImg, firstImg, secondImg, thirdImg } from 'ASSETS/home';
import noImg from '../../assets/campusstyle/no-img.png';
// import { flowerImg, creditImg, firstImg, secondImg, thirdImg, tipsWhiteImg, goodImg } from 'ASSETS/home';
// import { backImg } from 'ASSETS/header';
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
                if(json.data[i].type == 2){
                    arrCongratulations.push(json.data[i].content); 
                }
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
                {/* <img src={ goodImg }></img> */}
                <span>
                    { flowerRank.length!==0 || scoreRank.length!==0 && congratulations.length !== 0 ? congratulations[Math.floor(Math.random() * congratulations.length)] : '' }
                </span>
            </div>
        )

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
                                    {/* 这个left的样式根据牌子来调的电脑显示不对 */}
                                    <ul id='original' style={flowerRank.length<=10?{position:'relative',left:'100px'}:{}}>
                                        { 
                                            flowerRank.slice(0,10).map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                    {
                                        flowerRank.length > 10 ?
                                        <ul id='clone-rank-list'>
                                            {
                                                flowerRank.slice(10).map((item, index)=>{
                                                    return this.listItem(item, index+10);
                                                })
                                            }
                                        </ul> :
                                        ''
                                    }
                                   
                                </Fragment> : 
                                <div className={styles['no-data-wrap']}>
                                    <img src={noImg} alt=""/>
                                    <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                                </div>
                                // <p className={styles['no-data']}>本月排名暂未产生<br/>敬请期待明日公布</p>
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
                                    <ul id='original' style={scoreRank.length<=10?{position:'relative',left:'100px'}:{}}>
                                        { 
                                            scoreRank.slice(0,10).map((item, index)=>{
                                                return this.listItem(item, index);
                                            })
                                        }
                                    </ul>
                                    {
                                        scoreRank.length > 10 ?
                                            <ul id='clone-rank-list'>
                                                {
                                                    scoreRank.slice(10).map((item, index)=>{
                                                        return this.listItem(item, index+10);
                                                    })
                                                }
                                            </ul> :
                                            ''
                                    }
                                    
                                </Fragment> : 
                                // <p className={styles['no-data']}>本月排名暂未产生<br/>敬请期待明日公布</p>
                                <div className={styles['no-data-wrap']}>
                                    <img src={noImg} alt=""/>
                                    <p className={styles['no-data']}>本周排名暂未产生<br/>敬请期待明日公布</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                { flowerRank.length !==0 || scoreRank.length!==0 ?  encouragement : '' }
            </Fragment>
        )
        const incentiveMonth = (
            <Fragment>
                <div className={styles['box']}>
                    <div className={styles['title']}>
                        {/* <div className={styles['back']} onClick={() => this.backHome()}> */}
                            {/* <img className={styles['backimg']} src={ backImg } onClick={() => this.backHome()}></img> */}
                            <div className={styles['backimg']} onClick={() => this.backHome()}></div>
                        {/* </div> */}
                        <span>
                            本月激励排行榜
                        </span>
                    </div>

                    { loading? <Loading/> : rankcontent  }
                </div>
            </Fragment>
        )
        return incentiveMonth;
    }
}

export default IncentiveMonth;