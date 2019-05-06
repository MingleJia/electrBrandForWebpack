import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentStyle.scss';
import { moreImg } from 'ASSETS/home';
import axios from 'UTILS/axios';
import Loading from 'COMPONENTS/loading';
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
                        <Link to='/studentsStyle/more' className={`${styles['more']} ${styles['linkBtn']}`}>
                            更多<img className={styles['linkIcon']} src={moreImg}></img>
                        </Link>
                    </div>
                        {
                            //    <NoDataPage/> 
                            dataList.map((item, index) =>
                                <Link to={`/studentsStyle/deatil?id=${item.id}`} key={index}>
                                    <MyCarousel
                                        idx={index}
                                        desc={item.desc}
                                        title={item.title}
                                        images={item.images}
                                        styleType={this.getStyleType(dataList.length)} />
                                </Link>)
                        }
                    </div>
            }
        </Fragment>
    }
}

export default StudentStyle;