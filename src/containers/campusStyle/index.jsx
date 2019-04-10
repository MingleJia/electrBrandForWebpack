import React,{Component, Fragment,} from 'react';
import { Carousel } from 'antd';
import styles from './index.scss';
import { defaultImg, } from 'ASSETS/campusstyle';
import PropTypes from 'prop-types';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';
import { connect } from 'react-redux';
import { setCampusStyle } from 'MODULES/root/actions';
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
        setCampusStyle: PropTypes.func,
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
    campusDetail = (value) => {
        this.props.setCampusStyle({
            campusDetailId : value,
        })
        this.props.history.push('campusstyle/detail');
    }
    render(){
        let { campusList } = this.state;
        const campusStyle = (
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['title']}>校园风采</div>
                    {

                        campusList.length
                        ?
                        <div className={styles['btnMore']} onClick={ ()=>this.campusMore() }>更多
                            <span className={styles['more']}></span>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div className={styles['content']}>
                    <ul>
                    {
                        campusList.length !== 0 && campusList.map((item,index)=>{
                            return(
                                <li  onClick={ ()=>this.campusDetail(index) }  key={index}>
                                    {
                                        item.images !== '' && item.images.split(',').length !== 0 ? 
                                            <Fragment>
                                                <Carousel  className="imgs" autoplay autoplaySpeed={3000}>
                                                    {
                                                        item.images.split(',').map((img,index)=>{
                                                            return(
                                                                <Fragment key={index}>
                                                                    <img src={img} />
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </Carousel>
                                            </Fragment> : 
                                            <Fragment>
                                                <img className={styles['defaultImg']} src={defaultImg}/>
                                            </Fragment>
                                    }
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

export default connect(
    null,
    { setCampusStyle }
)(CampusStyle)