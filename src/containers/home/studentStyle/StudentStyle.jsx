import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentStyle.scss';
import { moreImg, noNoticeImg } from 'ASSETS/home';
import axios from 'UTILS/axios';
import Loading from 'COMPONENTS/loading';
import moment from 'moment';
// import NoDataPage from '../../../components/noDataPage/NoDataPage';
class StudentStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            loading: false
        }
    }

    componentDidMount() {
        // 定时刷新
        var _this = this;
        window.addEventListener('hashchange', function () {
            if (window.location.href.indexOf('home') == -1) {
                clearInterval(_this.getListTimer);
            }
        });
        this.getListTimer = setInterval(function () {
            _this.getDataList();
        }, 600000)
        this.getDataList();
    }
    getDataList() {
        this.setState({
            loading: true
        })
        axios('get', '/api/eboardshow/lists', {
        }).then((json) => {
            this.setState({
                dataList: json.data.data,
                loading: false
            })
        })
    }
    getStyleType(len) {
        if (len <= 1) {
            return 'content1';
        } else if (len <= 2) {
            return 'content1';
        } else if (len >= 3) {
            return 'content4';
        }
    }
    render() {
        let { dataList } = this.state;
        return <Fragment>
            {
                <div className={styles['myCarouselWrap']}>
                    {
                        this.state.loading && <div className={styles['loadingWrap']}>
                            <Loading />
                        </div>
                    }
                    <div className={styles['topBar']}>
                        <span className={styles['title']}>学生风采</span>
                        {

                            dataList.length > 4
                                ?
                                <Link to='/studentsStyle/more' className={`${styles['more']} ${styles['linkBtn']}`}>
                                    更多<img className={styles['linkIcon']} src={moreImg}></img>
                                </Link>
                                :
                                null
                        }
                    </div>
                    {
                        //    <NoDataPage/> 
                        dataList.length > 0
                            ?
                            dataList.map((item, index) =>
                                <Link to={`/studentsStyle/deatil?id=${item.id}`} key={index}>
                                    <MyCarousel
                                        showTime={moment(item.show_time * 1000 || 0).format("M月D日 ") + '，'}
                                        idx={index}
                                        desc={item.desc}
                                        title={item.title}
                                        images={item.images}
                                        styleType={this.getStyleType(dataList.length)} />
                                </Link>)
                            :
                            <div className={styles['noData']}>
                                {/* <div styles={styles['noDataWrap']}> */}
                                <img src={noNoticeImg} alt="" />
                                <p>期待得到谁的表扬呢</p>
                                {/* </div> */}
                            </div>
                    }

                </div>
            }
        </Fragment>
    }
}

export default StudentStyle;