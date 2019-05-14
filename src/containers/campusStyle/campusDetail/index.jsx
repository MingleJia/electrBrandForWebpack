import React, { Component } from 'react';
// import { message } from 'antd';
import styles from './index.scss';
import { backImg } from 'ASSETS/header';
import { connect } from 'react-redux';
import { setCampusStyle, setPreviewImg } from 'MODULES/root/actions';
import PropTypes from 'prop-types';
import PreviewImg from 'COMPONENTS/previewImg';
import moment from 'moment';

class CampusDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compusContent: {}, //当前显示的校园风采信息
            idx: 0
        }
    }

    static propTypes = {
        setCampusStyle: PropTypes.func,
        setPreviewImg: PropTypes.func,
        root: PropTypes.object,
    }

    componentDidMount() {
        const { campusList } = this.props.root;
        this.setState({
            idx: this.props.root.campusDetailId,
            compusContent: campusList[this.props.root.campusDetailId]
        })
    }

    //返回上一页
    backHome() {
        // if( window.navigator.onLine === true ){
        window.history.back(-1);
        // }else{
        //     message.warning('网络不可用',10);
        //     message.config({ maxCount:1,});
        // }
    }
    //上一页
    prevBtn = () => {
        let { idx } = this.state;
        let { campusList } = this.props.root;
        idx < 1 ? idx = campusList.length - 1 : idx = idx - 1;
        this.setState({
            compusContent: campusList[idx],
            idx,
        })
    }
    //下一页
    nextBtn = () => {
        let { idx } = this.state;
        let { campusList } = this.props.root;
        idx >= campusList.length - 1 ? idx = 0 : idx = idx + 1;
        this.setState({
            compusContent: campusList[idx],
            idx
        })
    }

    //点击图片放大查看
    previewImg = (img) => {
        this.props.setPreviewImg({
            displayImg: true,
            previewImg: img,
        })
    }

    render() {
        const { compusContent, idx } = this.state;
        const { campusList } = this.props.root;
        const campusDetail = (
            <div className={styles['container']}>
                <PreviewImg />
                <div className={styles['tab']}>
                    <img onClick={() => { this.backHome() }} className={styles['backimg']} src={backImg}></img>
                    {
                        // campusList.length !== 0 && campusList.length < 2
                        //     ?
                        //     <div></div>
                        //     :
                        <div className={styles['btnWrap']}>
                            {
                                // this.state.idx == 0 ? '' :
                                <span style={idx == campusList.length - 1?{borderRight: 'solid 0.02rem white'}:{}} className={styles[idx == 0 ? 'prevBtnNo' : 'prevBtn']} onClick={() => idx != 0 && this.prevBtn()}>上一个</span>
                            }
                            {
                                // this.state.idx == campusList.length - 1 ? '' : 
                                <span style={idx == 0?{borderLeft: 'solid 0.02rem white'}:{}} className={styles[idx == campusList.length - 1 ? 'nextBtnNo' : 'nextBtn']} onClick={() => idx != campusList.length - 1 && this.nextBtn()}>下一个</span>
                            }
                        </div>
                    }
                </div>
                <div className={styles['content']}>
                    <div className={styles['title']}>
                        <span className={styles['titlename']}>{compusContent.title}</span>
                        <span className={styles['time']}>{moment(compusContent.createtime * 1000).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div className={styles['detail']}>
                        {/* <p className={styles['text']}>{compusContent.content}</p> */}
                        {
                            compusContent.content ? compusContent.content.split('\n').map((item,index) => <p key={index} className={styles['text']}>{item}</p>) : null
                        }

                        {
                            compusContent.images
                                ?
                                compusContent.images.split(',').map(
                                    (img, index) =>
                                        <div
                                            key={index}
                                            className={styles['imgWarp']}>
                                            <img className={styles['img']} src={img} key={index} onClick={() => this.previewImg(img)} />
                                        </div>
                                )
                                :
                                ''
                        }
                    </div>
                </div>
            </div>
        )
        return campusDetail;
    }
}

export default connect(
    ({ root }) => ({
        root: root,
    }), {
        setCampusStyle,
        setPreviewImg
    }
)(CampusDetail)