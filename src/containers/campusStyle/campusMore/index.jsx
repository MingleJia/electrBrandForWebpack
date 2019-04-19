import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import Tab from 'COMPONENTS/tab';
import styles from './index.scss';
import { collapseImg, expandImg, campusImg } from 'ASSETS/campusstyle';
import axios from 'UTILS/axios';
import moment from 'moment';
class CampusMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrExpan: [0,],
            campusList: [],
            images: [],
            loading : true, 
        }
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

    render() {
        let { arrExpan, campusList } = this.state;

        const defaultPage=(
            <div className={styles['defaultImg']}>
                <img src={campusImg} alt=""/>
                <p className={styles['text']}>暂无校园风采</p>
            </div>
        )

        const campusContent = (
            <div className={styles['container']}>
                <ul className={styles['list']}>
                    {
                        campusList.length !== 0 && campusList.map((item, index) => {
                            return (
                                <li className={styles['content']} key={index}>
                                    <div className={styles['title']}>
                                        <div className={styles['clickexpand']} onClick={() => this.checkStatus(index)}>
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
                                                        <img className={styles['img']} src={img} key={index} />
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
                    { campusList.length === 0 ? defaultPage : campusContent}
                <Tab />
            </Fragment>
        )
        return campusMore;
    }
}

export default CampusMore