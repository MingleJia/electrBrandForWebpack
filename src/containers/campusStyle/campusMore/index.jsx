import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import styles from './index.scss';
import { collapseImg, expandImg, campusImg } from 'ASSETS/campusstyle';
import axios from 'UTILS/axios';
import moment from 'moment';
import Loading from 'COMPONENTS/loading';
import PreviewImg from 'COMPONENTS/previewImg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPreviewImg } from 'MODULES/root/actions';
class CampusMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrExpan: [0,],
            campusList: [],
            loading : true, 
        }
    }

    static propTypes = {
        setPreviewImg: PropTypes.func,
        root: PropTypes.object,
    }

    componentDidMount() {
        axios('get', '/api/campus/getList', {
        }).then((json) => {
            this.setState({
                campusList: json.data,
            })
        }).then(()=>{
            this.setState({
                loading : false,
            })
        })
    }

    //展开收起
    checkStatus = (value) => {
        let { arrExpan, } = this.state;
        arrExpan.includes(value) ? arrExpan.splice(arrExpan.indexOf(value), 1) : arrExpan.push(value);
        this.setState({
            arrExpan: arrExpan,
        })
    }

    //点击图片放大查看
    previewImg = (img) => {
        this.props.setPreviewImg({
            displayImg:true,
            previewImg: img,
        })
    }

    render() {
        let { arrExpan, campusList,loading } = this.state;

        const defaultPage=(
            <div className={styles['defaultImg']}>
                <img src={campusImg} alt=""/>
                <p className={styles['text']}>暂无校园风采</p>
            </div>
        )

        const campusContent = (
            <div className={styles['container']}>
                <PreviewImg/>
                <ul className={styles['list']}>
                    {
                        campusList.length !== 0 && campusList.map((item, index) => {
                            return (
                                <li className={styles['content']} key={index} >
                                    <div className={styles['title']} onClick={() => this.checkStatus(index)}>
                                        <div className={styles['clickexpand']}>
                                            {
                                                arrExpan.includes(index) 
                                                ?
                                                    <Fragment>
                                                        <span>收起</span><img src={ collapseImg } className={styles['collapse']} />
                                                    </Fragment>
                                                :
                                                    <Fragment>
                                                        <span>展开</span><img src={ expandImg } className={styles['expand']} />
                                                    </Fragment>
                                            }
                                        </div>
                                        <span className={styles['titlename']}>{item.title}</span>
                                        <span className={styles['time']}>{moment(item.createtime*1000).format('YYYY-MM-DD HH:mm')}</span>
                                    </div>
                                    <div className={`${arrExpan.includes(index) ? styles['detail'] : styles['detailHidden']}`}>
                                        <p className={styles['text']}>
                                            {item.content}
                                        </p>
                                        {
                                            item.images && item.images.split(',').map((img, index) => {
                                                return (
                                                    <div key={index} className={styles['imgWarp']} >
                                                        <img className={styles['img']} src={img} key={index} onClick={ ()=>this.previewImg(img) } />
                                                    </div>
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
        )
        const campusMore = (
            <Fragment>
                <BackPrevHeader />
                    { loading ? <Loading/> : campusList.length === 0 ? defaultPage : campusContent}
            </Fragment>
        )
        return campusMore;
    }
}

export default connect(
    ({ root }) => ({
        root: root,
    }), { setPreviewImg }
)(CampusMore)