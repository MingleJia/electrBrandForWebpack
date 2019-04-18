import React, { Component, Fragment } from 'react';
// import BackPrevHeader from 'COMPONENTS/backPrev';
import DataDetail from 'COMPONENTS/dataDetail/DataDetail';
import Tab from 'COMPONENTS/tab';
// import styles from './StuStyleCarousel.scss';
// import { Carousel } from 'antd-mobile';
class StudentsStyleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {

        return <Fragment>
            <DataDetail />
            <Tab />
        </Fragment>;
    }
}

export default StudentsStyleDetail;