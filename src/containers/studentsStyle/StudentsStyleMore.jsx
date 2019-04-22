import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import DataList from 'COMPONENTS/dataList/DataList';
import Tab from 'COMPONENTS/tab';
// import styles from './StuStyleCarousel.scss';
// import { Carousel } from 'antd-mobile';
import axios from 'UTILS/axios';
class StudentsStyleMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList:[]
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
        return <Fragment>
            <BackPrevHeader />
            <DataList dataList={this.state.dataList} />
            <Tab />
        </Fragment>;
    }
}

export default StudentsStyleMore;