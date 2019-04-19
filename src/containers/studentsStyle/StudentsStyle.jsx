import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ToMore from '../../components/toMore/ToMore';
import Tab from 'COMPONENTS/tab';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentsStyle.scss';
import axios from 'UTILS/axios';
class StudentsStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        this.getDataList()
    }

    getDataList() {
        axios('get', '/api/eboardshow/lists', {
        }).then((json) => {
            this.setState({
                dataList: json.data
            })
        })
    }

    render() {
        let { dataList } = this.state;
        return <Fragment>
            <ToMore title={'学生风采'} toWhere={'/studentsStyle/more'} isShow={true} />\
            <div>

            </div>
            <div className={styles['content']}>
                {/* <Link to={'/studentsStyle/deatil'}>
                    <MyCarousel />
                </Link> */}
                {
                    dataList.map((item, index) =>
                        <Link to={`/studentsStyle/deatil?id=${index}`} key={index}>
                            <MyCarousel desc={item.desc} title={item.title} images={item.images} styleType={'content6'} />
                        </Link>)
                }
            </div>
            <Tab />
        </Fragment>
    }
}

export default StudentsStyle;