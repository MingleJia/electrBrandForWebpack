import React, { Component } from 'react';
import styles from './index.scss';
// import { defaultImg, } from 'ASSETS/campusstyle';
import Tab from 'COMPONENTS/tab';
import { connect } from 'react-redux';
import { setCampusStyle } from 'MODULES/root/actions';
import PropTypes from 'prop-types';
import axios from 'UTILS/axios';
import moment from 'moment';

class CampusDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campusList: [], //所有校园风采列表
            compusContent: {}, //当前显示的校园风采信息
            idx: 0
        }
    }

    static propTypes = {
        setCampusStyle: PropTypes.func,
        root: PropTypes.object,
    }

    // componentWillMount() {
    //     this.setState({ idx: this.props.root.campusDetailId })
    // }

    componentDidMount() {
        this.setState({ idx: this.props.root.campusDetailId })
        this.getContent();
    }

    getContent = () => {
        axios('get', '/api/campus/getList', {
        }).then((json) => {
            this.setState({
                campusList: json.data,
                // compusContent: json.data[this.props.root.campusDetailId]
                compusContent: json.data[this.state.idx]
            })

        })
    }

    //返回首页
    backHome = () => {
        window.history.back(-1);
    }
    //上一页
    prevBtn = () => {
        // let { campusDetailId } = this.props.root;
        let { campusList, idx } = this.state;
        idx < 1 ? idx = campusList.length - 1 : idx = idx - 1;
        this.setState({
            compusContent: campusList[idx],
            idx,
        })
        // this.props.setCampusStyle({
        //     campusDetailId: campusDetailId,
        // })
    }
    //下一页
    nextBtn = () => {
        let { campusList, idx } = this.state;
        idx >= campusList.length - 1 ? idx = 0 : idx = idx + 1;
        this.setState({
            compusContent: campusList[idx],
            idx
        })
    }
    render() {
        const { compusContent, campusList } = this.state;
        // console.log(compusContent)
        const campusDetail = (
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['back']} onClick={() => this.backHome()}>
                        <span className={styles['backimg']}></span>
                        返回
                    </div>
                    {
                        campusList.length < 2
                            ?
                            <div></div>
                            :
                            // <div className={styles['btn']}>
                            //     <span className={styles['prevBtn']} onClick={() => this.prevBtn()}>上一个</span>
                            //     <span className={styles['nextBtn']} onClick={() => this.nextBtn()}>下一个</span>
                            // </div>
                            <div className={styles['btnWrap']}>
                                {
                                    this.state.idx == 0 ? '' : <span className={styles['prevBtn']} onClick={() => this.prevBtn()}>上一个</span>
                                }
                                {

                                    this.state.idx == campusList.length - 1 ? '' : <span className={styles['nextBtn']} onClick={() => this.nextBtn()}>下一个</span>
                                }
                            </div>
                    }
                </div>
                <div className={styles['content']}>
                    <div className={styles['title']}>
                        <span className={styles['titlename']}>{compusContent.title}</span>
                        <span className={styles['time']}>{moment(compusContent.createtime).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div className={styles['detail']}>
                        <p className={styles['text']}>{compusContent.content}</p>
                        {
                            compusContent.images
                                ?
                                compusContent.images.split(',').map(
                                    (img, index) =>
                                        <div
                                            key={index}
                                            className={`${compusContent.images.split(',').length > 1 ? styles['imgWarp'] : styles['imgone'] }`}>
                                            <img className={styles['img']} src={img} key={index} />
                                        </div>
                                )
                                :
                                null
                        }
                        {/* <img className={styles['picture']} src={defaultImg}/> */}
                    </div>
                </div>
                <Tab />
            </div>
        )
        return campusDetail;
    }
}

export default connect(
    ({ root }) => ({
        root: root,
    }), { setCampusStyle }
)(CampusDetail)