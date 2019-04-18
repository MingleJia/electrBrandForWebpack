import React, { Component, Fragment } from 'react';
import styles from './DataList.scss';

import DataItem from './DataItem';
// import { Carousel } from 'antd-mobile';
class Datalist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    componentDidMount() {
        
    }

    render() {

        return <Fragment>
            <ul className={styles['list']}>
                <DataItem isOpen={false} />
                <DataItem isOpen={false} />
                <DataItem isOpen={false} />
                <DataItem isOpen={false} />
            </ul>
        </Fragment>;
    }
}

export default Datalist;