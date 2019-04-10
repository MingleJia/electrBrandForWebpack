import React,{Component, Fragment} from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
// import { defaultImg, } from 'ASSETS/campusstyle';
import axios from 'UTILS/axios';
import moment from 'moment';
class CampusMore extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrExpan :[0,],
            campusList : [],
            images : [],
        }
    }

    componentDidMount(){
        axios('get','/api/campus/getList',{
        }).then((json)=>{
            this.setState({       
                campusList : json.data,
            })

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
        let { arrExpan, campusList } = this.state;
        const campusMore = (
            <Fragment>
                <BackPrevHeader />
                <div className={styles['container']}>
                    <ul className={styles['list']}>
                        {
                            campusList.length !== 0 && campusList.map((item,index)=>{
                                return(
                                    <li className={styles['content']} key={index}>
                                        <div className={styles['title']}>
                                            <div className={styles['clickexpand']} onClick={ ()=>this.checkStatus(index) }>
                                                { arrExpan.includes(index) ? '收起' : '展开' }
                                                <div className={`${arrExpan.includes(index) ? styles['collapse'] : styles['expand'] }`}></div>
                                            </div> 
                                            <span className={styles['titlename']}>{item.title}</span>
                                            <span className={styles['time']}>{ moment(item.createtime).format('YYYY-MM-DD HH:mm')}</span>
                                        </div>
                                        <div className={`${ arrExpan.includes(index) ? styles['detail'] : styles['detailHidden'] }`}>
                                            <p className={styles['text']}>
                                                { item.content }
                                            </p>
                                            {
                                                item.images !== '' && item.images.split(',').length !== 0 && item.images.split(',').map((img,index)=>{
                                                    return(
                                                        <img src={ img } key={index}/>
                                                    )
                                                })
                                            }
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
        return campusMore;
    }
}

export default CampusMore