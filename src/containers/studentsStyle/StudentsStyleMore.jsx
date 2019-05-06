import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import DataList from 'COMPONENTS/dataList/DataList';
import Loading from 'COMPONENTS/loading';
// import Tab from 'COMPONENTS/tab';
// import styles from './StuStyleCarousel.scss';
// import { Carousel } from 'antd-mobile';
import axios from 'UTILS/axios';
class StudentsStyleMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            loading: false,
        }
    }

    componentDidMount() {
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
    render() {
        // console.log(this.state.dataList)
        return <Fragment>
            <BackPrevHeader title={'学生风采列表'} />
            {
                this.state.loading
                    ?
                    <div style={{ width: '100%', height: '100%' }}>
                        <Loading />
                    </div>
                    :
                    <DataList dataList={this.state.dataList} />
            }

            {/* <Tab /> */}
        </Fragment>
    }
}

export default StudentsStyleMore;