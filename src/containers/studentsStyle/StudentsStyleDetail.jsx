import React, { Component, Fragment } from 'react';
import DataDetail from 'COMPONENTS/dataDetail/DataDetail';
import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';
class StudentsStyleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            id: window.location.href.split('?')[1].split('=')[1]
        }
    }

    componentDidMount() {
        // console.log(window.location.href)
        this.getDetail();
    }
    getDetail() {
        axios('get', '/api/eboardshow/lists').then((json) => {
            this.setState({
                dataList: json.data
            })
            // console.log(json)
        })
    }
    render() {

        return <Fragment>
            <DataDetail dataList={this.state.dataList} id={this.state.id} />
            <Tab />
        </Fragment>;
    }
}

export default StudentsStyleDetail;