import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ToMore from '../../components/toMore/ToMore';
import Tab from 'COMPONENTS/tab';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentsStyle.scss';
class StudentsStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return <Fragment>
            <ToMore title={'学生风采'} toWhere={'/studentsStyle/more'} isShow={true} />\
            <div>

            </div>
            <div className={styles['content']}>
                <Link to={'/studentsStyle/deatil'}>
                    <MyCarousel />
                </Link>
                <Link to={'/studentsStyle/deatil'}>
                    <MyCarousel />
                </Link>
                <MyCarousel />
                <MyCarousel />
                <MyCarousel />
            </div>
            <Tab />
        </Fragment>
    }
}

export default StudentsStyle;