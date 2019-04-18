import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import DataList from 'COMPONENTS/dataList/DataList';
import Tab from 'COMPONENTS/tab';
// import styles from './StuStyleCarousel.scss';
// import { Carousel } from 'antd-mobile';
class StudentsStyleMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {

        return <Fragment>
            <BackPrevHeader />
            <DataList />
            <Tab />
        </Fragment>;
    }
}

export default StudentsStyleMore;