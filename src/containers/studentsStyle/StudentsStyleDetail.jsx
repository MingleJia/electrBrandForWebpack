import React, { Component, Fragment } from 'react';
import DataDetail from 'COMPONENTS/dataDetail/DataDetail';
// import Tab from 'COMPONENTS/tab';
import axios from 'UTILS/axios';
import Loading from 'COMPONENTS/loading';
class StudentsStyleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            id: window.location.href.split('?')[1].split('=')[1],
            loading: false,
        }
    }

    componentDidMount() {
        // console.log(window.location.href)
        this.getDetail();
    }
    getDetail() {
        this.setState({ loading: true })
        axios('get', '/api/eboardshow/lists').then((json) => {
            this.setState({
                dataList: json.data,
                loading: false
            })
        })
    }
    render() {

        return <Fragment>
            {

                this.state.loading
                    ?
                    <div style={{ width: '100%', height: '100%', position: 'fixed', backgroundColor: 'white', zIndex: 1 }}>
                        <Loading />
                    </div>
                    :
                    null
            }
            <DataDetail dataList={this.state.dataList} id={this.state.id} a={1} />
            {/* <Tab /> */}
        </Fragment>;
    }
}

export default StudentsStyleDetail;