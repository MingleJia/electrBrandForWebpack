import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ToMore from '../../components/toMore/ToMore';
import Tab from 'COMPONENTS/tab';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentsStyle.scss';
import axios from 'UTILS/axios';
import Loading from 'COMPONENTS/loading';
import noImg from '../../assets/campusstyle/no-img.png';
class StudentsStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            loading: false
        }
    }

    componentDidMount() {
        //定时刷新
        var _this = this;
        window.addEventListener('hashchange', function () {
            if(window.location.href.indexOf('studentsStyle') == -1){
                clearInterval(_this.getListTimer);
            }
        });
        this.getListTimer = setInterval(function(){
            _this.getDataList();
        },600000)
        this.getDataList()
    }

    getDataList() {
        this.setState({ loading: true })
        axios('get', '/api/eboardshow/lists', {
        }).then((json) => {
            this.setState({
                dataList: json.data.data,
                loading: false
            })
        })
    }
    getStyle(num) {
        if (num <= 4) return 'contentM4';
        return 'contentM6'
    }
    render() {
        let { dataList } = this.state;
        return <Fragment>
            <ToMore title={'学生风采'} toWhere={'/studentsStyle/more'} isShow={dataList.length > 6} />
            <div>

            </div>
            {
                this.state.loading
                    ?
                    <div style={{ width: '100%', height: '100%' }}>
                        <Loading />
                    </div>
                    :

                    (
                        dataList.length > 0
                            ?
                            <div className={styles['content']} style={this.getStyle(dataList.length) == 'contentM4' ? { overflow: 'scroll',paddingBottom:'88px' } : {}} >
                                {
                                    dataList.map((item, index) =>
                                        <Link to={`/studentsStyle/deatil?id=${item.id}`} key={index}>
                                            <MyCarousel desc={item.desc} title={item.title} images={item.images} styleType={this.getStyle(dataList.length)} idx={index} />
                                        </Link>)
                                }
                            </div>
                            :
                            <div className={styles['noData']}>
                                <img src={noImg} alt="" />
                                <p>期待谁得到表扬呢</p>
                            </div>
                    )
            }
            <Tab />
        </Fragment >
    }
}

export default StudentsStyle;