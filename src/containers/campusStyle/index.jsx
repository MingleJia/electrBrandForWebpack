import React,{Component,Fragment} from 'react';
import styles from './index.scss';
import { detailsImg,campusImg, noImg, moreImg } from 'ASSETS/campusstyle';
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
        root: PropTypes.object,
    }

    componentDidMount(){
        axios('get','/api/campus/getList',{
        }).then((json)=>{
            // let campusList = json.data;
            // for (let i = 0; i < json.data.length; i++) {
            //     for(let j = 0;j < json.data.length-1-i;j++){
            //         if (campusList[j].weigh > campusList[j+1].weigh) { //相邻元素两两对比
            //             let temp = campusList[j+1]; //元素交换
            //             campusList[j+1] = campusList[j];
            //             campusList[j] = temp;
            //         }
            //     }
            // }
            this.props.setCampusStyle({
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
        let { campusList } = this.props.root;
        this.props.setCampusStyle({
            campusDetailId : value,
            campusList
        })
        this.props.history.push('campusstyle/detail');
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
        const campusStyle = (
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['title']}>校园风采</div>
                    {
                        campusList.length
                        ?
                        <div className={styles['btnMore']} onClick={ ()=>this.campusMore() }>
                        <span>更多</span><img className={styles['more']} src={ moreImg } />
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div className={styles['content']}>
                    {
                        campusList.length==0
                        ?
                        <div className={styles['noCampusList']}>
                            <img className={styles['noCampusListImg']} src={campusImg} alt=""/>
                            <span className={styles['noCampusListWord']}>暂无校园风采</span>
                        </div>
                        :
                        <ul>
                        {
                            campusList.length !== 0 && campusList.map((item,index)=>{
                                return(
                                    <li className={styles['list']} key={index}>
                                        <div className={styles['images']}>
                                            {
                                                item.images ? this.renderCarouselImg(item.images) : this.renderDefaultImg()
                                            }
                                        </div>
                                        <div className={styles['title']}>
                                            <span className={styles['titlename']}>{item.title}</span>
                                            <div className={styles['detailborder']}  onClick={ ()=>this.campusDetail(index) } >
                                                <img className={styles['detailImg']} src={ detailsImg }></img><span>详情</span>
                                            </div>
                                        </div>
                                        <div className={styles['detail']}>         
                                            { item.content }                                            
                                        </div>
                                    </li>
                                )
                                }) 
                            }
                        </ul>
                    }
                </div>
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