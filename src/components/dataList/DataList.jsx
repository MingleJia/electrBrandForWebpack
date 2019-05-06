import React, { Component, Fragment } from 'react';
import styles from './DataList.scss';

import DataItem from './DataItem';
// import { Carousel } from 'antd-mobile';
import axios from 'UTILS/axios';
var lock = true;
class Datalist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dataList: [],
            page: 1,
            isOver: false,
            loading: false,
        }
    }

    componentDidMount() {
        this.getDataList()
    }
    getDataList() {
        this.setState({ loading: true })
        axios('get', '/api/eboardshow/lists', {
            page: this.state.page
        }).then((json) => {
            this.setState({
                dataList: [
                    ...this.state.dataList,
                    ...json.data.data
                ],
                isOver: json.data.data.length < 10 ? true : false,
                loading: false
            })
        })
    }
    onTouchMove(name) {
        let offsetHeight = this[name].offsetHeight;
        let scrollHeight = this[name].scrollHeight;
        let scrollTop = this[name].scrollTop;
        if (offsetHeight + scrollTop > scrollHeight - 100 && !this.state.isOver && this.state.loading == false) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.getDataList()
            })
        }
    }
    gotoBottom(name, name2) {
        let offsetHeight = this[name].offsetHeight;
        let scrollHeight = this[name].scrollHeight;
        let scrollTop = this[name].scrollTop;
        if (!this[name2]) return;
        // 底部的东西的高
        let scrollHeightBottomDiv = this[name2].scrollHeight;
        if (offsetHeight + scrollTop > scrollHeight - scrollHeightBottomDiv && lock) {
            this.goToBottomTimer = setInterval(() => {
                offsetHeight = this[name].offsetHeight;
                scrollHeight = this[name].scrollHeight;
                scrollTop = this[name].scrollTop;
                this[name].scrollTop -= 1;
                lock = false;
                if (scrollTop + offsetHeight + scrollHeightBottomDiv - 5 <= scrollHeight) {
                    lock = true;
                    clearInterval(this.goToBottomTimer);
                }


            }, 1)
        }
    }
    render() {
        let { dataList , isOver } = this.state;
        return <Fragment>
            <ul
                className={styles['list']}
                ref={(container) => { this.container = container }}
                onTouchEnd={() => { this.gotoBottom('container', 'container2') }}
                onScroll={() => { this.onTouchMove('container') }}>
                {
                    dataList.map(
                        (item, index) => <DataItem key={index} isOpen={false} item={item} />
                    )
                }
                {
                    (isOver && dataList.length > 9) && <div ref={(container2) => { this.container2 = container2 }} className={styles['noMoreData']}>无更多数据</div>
                }
            </ul>
        </Fragment>;
    }
}

export default Datalist;
Datalist.defaultProps = {};
Datalist.propTypes = function () { };
Datalist.propTypes = {};