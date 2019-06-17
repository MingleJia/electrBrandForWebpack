import React, { Component, Fragment } from 'react';
import BackPrevHeader from 'COMPONENTS/backPrev';
import DataList from 'COMPONENTS/dataList/DataList';
import Loading from 'COMPONENTS/loading';
class StudentsStyleMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            loading: false,
        }
    }

    componentDidMount() {
    }
    render() {
        return <Fragment>
            <BackPrevHeader style={{position:'fixed'}} title={'学生风采列表'} />
            {
                this.state.loading
                    ?
                    <div style={{ width: '100%', height: '100%' }}>
                        <Loading />
                    </div>
                    :
                    <DataList />
            }

            {/* <Tab /> */}
        </Fragment>
    }
}

export default StudentsStyleMore;