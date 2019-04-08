import React,{Component,} from 'react';
import { Carousel } from 'antd';
import styles from './index.scss';
import { defaultImg, } from 'ASSETS/campusstyle';
import PropTypes from 'prop-types';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';
class CampusStyle extends Component{
    constructor(props){
        super(props);
        this.state = {
            campusList : [],
            images : [],
        }
    }

    static propTypes = {
        history: PropTypes.object,
    }

    componentDidMount(){
        axios('get','/api/campus/getList',{
        }).then((json)=>{
            this.setState({       
                campusList : json.data,
            })

        })
    }

    //点击更多
    campusMore = () =>{
        this.props.history.push('campusstyle/more');
    }
    //点击内容到校园风采详情页
    campusDetail = () => {
        this.props.history.push('campusstyle/detail');
    }
    render(){
        let { campusList } = this.state;
        const campusStyle = (
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['title']}>校园风采</div>
                    <div className={styles['btnMore']} onClick={ ()=>this.campusMore() }>更多
                        <span className={styles['more']}></span>
                    </div>
                </div>
                <div className={styles['content']}>
                    <ul>
                    {
                        campusList.length !== 0 && campusList.map((item,index)=>{
                            return(
                                <li  onClick={ ()=>this.campusDetail() }  key={index}>
                                    <Carousel  className="imgs" autoplay autoplaySpeed={3000}>
                                        <img className={styles['picture']} src={defaultImg}/>
                                        <img className={styles['picture']} src={defaultImg}/>
                                        <img className={styles['picture']} src={defaultImg}/>
                                        <img className={styles['picture']} src={defaultImg}/>
                                    </Carousel>
                                    <div className={styles['title']}>
                                        <span className={styles['titlename']}>{item.title}</span>
                                    </div>
                                    <div className={styles['detail']}>
                                        <p className={styles['text']}>
                                            { item.content }
                                        </p>
                                    </div>
                                </li>
                            )
                        }) 
                    }
                    </ul>
                </div>
                <Tab/>
            </div>
        )
        return campusStyle;
    }
}

export default CampusStyle