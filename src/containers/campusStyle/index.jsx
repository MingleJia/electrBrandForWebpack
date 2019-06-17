import React,{Component,Fragment} from 'react';
import { message } from 'antd';
import styles from './index.scss';
import { campusImg, noImg } from 'ASSETS/campusstyle';
// import { detailsImg, campusImg, moreImg, noImg } from 'ASSETS/campusstyle';
import PropTypes from 'prop-types';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';
import { connect } from 'react-redux';
import { setCampusStyle } from 'MODULES/root/actions';
import Loading from 'COMPONENTS/loading';
class CampusStyle extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }
    }

    static propTypes = {
        history: PropTypes.object,
        setCampusStyle: PropTypes.func,
        root: PropTypes.object,
    }

    componentDidMount(){
        axios('get','/api/campus/getList',{
        }).then((json)=>{
            this.props.setCampusStyle({
                campusList : json.data,
            })
            this.setState({
                loading:false
            })    
        })
    }

    //点击更多
    campusMore = () =>{
        if( window.navigator.onLine === true ){
            this.props.history.push('campusstyle/more');
        }else{
            message.warning('网络不可用',20);
            message.config({ maxCount:1,});
        }
    }
    //点击内容到校园风采详情页
    campusDetail = (value) => {
        let { campusList } = this.props.root;
        this.props.setCampusStyle({
            campusDetailId : value,
            campusList
        })
        if( window.navigator.onLine === true ){
            this.props.history.push('campusstyle/detail');
        }else{
            message.warning('网络不可用',10);
            message.config({ maxCount:1,});
        }
    }
    //
    renderCarouselImg = (images) => {
        return(
            <Fragment>
                {
                    images.split(',').map((img,index)=>{
                        return(
                            <div className={styles['imgBlock']} key={index}>
                                <img src={img} className={styles['defaultImg']} />
                            </div>
                        )
                    })
                }
            </Fragment>
        )
    }

    renderDefaultImg = () => {
        return(
            <div className={styles['imgdefault']}>
                <img className={styles['default']} src={noImg}/>
                <p>暂未上传图片</p>
            </div>
        )
    }
    render(){
        let { campusList } = this.props.root;
        const { loading } = this.state;

        const defaultPage=(
            <div className={styles['defaultImg']}>
                <img src={campusImg} alt=""/>
                <p className={styles['text']}>暂无校园风采</p>
            </div>
        )

        const campusContent = (
            <div className={styles['content']}>   
                <ul>
                {
                    campusList.length !== 0 && campusList.map((item,index)=>{
                        return(
                            <li className={styles['list']} key={index} onClick={ ()=>this.campusDetail(index) }>
                                <div className={styles['images']}>
                                    {
                                        // item.images ? this.renderCarouselImg(item.images) : this.renderDefaultImg()
                                        item.images ? this.renderCarouselImg(item.images) : null
                                    }
                                </div>
                                <div className={styles['title']}>
                                    <span className={styles['titlename']}>{item.title}</span>
                                </div>
                                <div className={styles['detail']}>         
                                    { item.content }                                            
                                </div>
                            </li>
                        )
                        }) 
                    }
                </ul>
            </div>
        )
        const campusStyle = (
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['title']}>校园风采</div>
                    {
                        campusList.length
                        ?
                        // <div className={styles['btnMore']} onClick={ ()=>this.campusMore() }>
                        //     更多<span></span>
                        //     {/* <img className={styles['more']} src={ moreImg } /> */}
                        // </div>
                        null
                        :
                        <div></div>
                    }
                </div>
                { loading ? <Loading/> : campusList.length === 0 ? defaultPage : campusContent }
                <Tab/>
            </div>
        )
        return campusStyle;
    }
}

export default connect(
    ({ root }) => ({
        root: root,
    }), { setCampusStyle }
)(CampusStyle)