import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyCarousel from 'COMPONENTS/carousel/StuStyleCarousel.jsx';
import styles from './StudentStyle.scss';
import { moreImg } from 'ASSETS/home';
import axios from 'UTILS/axios';
class StudentStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        axios('get', '/api/eboardshow/lists', {
        }).then((json) => {
            this.setState({
                dataList: json.data
            })
        })
    }
    getStyleType(len) {
        if(len <= 1){
            return  'content1';
        }else if(len<=2){
            return 'content2';
        }else if(len>=4){
            return 'content4';
        }
    }
    render() {
        let { dataList } = this.state;
        console.log(dataList);
        return <Fragment>
            <div className={styles['myCarouselWrap']}>
                <div className={styles['topBar']}>
                    <span className={styles['title']}>学生风采</span>
                    <Link to='/studentsStyle/more' className={`${styles['more']} ${styles['linkBtn']}`}>
                        更多<img className={styles['linkIcon']} src={moreImg}></img>
                    </Link>

                </div>
                {
                    dataList.map((item, index) => <Link to={'/studentsStyle/deatil'} key={index}>
                        <MyCarousel desc={item.desc} title={item.title} images={item.images} styleType={this.getStyleType(dataList.length)}/>
                    </Link>)
                }
                {/* <Link to={'/studentsStyle/deatil'} >
                    <MyCarousel desc={'1223333'} title={'22222'} images={[]} styleType={'content2'} />
                </Link> */}
            </div>
        </Fragment>
    }
}

export default StudentStyle;