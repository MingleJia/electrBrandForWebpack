import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentStyle.scss';
import { moreImg } from 'ASSETS/home';
class StudentStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return <Fragment>
            <div className={styles['myCarouselWrap']}>
                <div className={styles['topBar']}>
                    <span className={styles['title']}>学生风采</span>
                    <Link to='/schedulemore' className={`${styles['more']} ${styles['linkBtn']}`}>
                        更多<img className={styles['linkIcon']} src={moreImg}></img>
                    </Link>

                </div>

                <MyCarousel />
                <MyCarousel />
                <MyCarousel />
                <MyCarousel />
            </div>
        </Fragment>
    }
}

export default StudentStyle;