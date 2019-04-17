import React, { Component, Fragment } from 'react';
import styles from './DataItem.scss';
import { collapseImg, expandImg } from 'ASSETS/campusstyle';
// import { Carousel } from 'antd-mobile';
class DataItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
    }

    componentDidMount() {

    }

    render() {

        return <Fragment>
            <li className={styles['content']} >
                <div className={styles['title']}>
                    <div className={styles['clickexpand']} onClick={() => {this.setState({isOpen:!this.state.isOpen}) }}>
                        {
                            this.state.isOpen
                                ?
                                <Fragment>
                                    <span>收起</span><img src={collapseImg} className={styles['collapse']} />
                                </Fragment>
                                :
                                <Fragment>
                                    <span>展开</span><img src={expandImg} className={styles['expand']} />
                                </Fragment>
                        }
                    </div>
                    <span className={styles['titlename']}>{'sdfsdfsdf'}</span>
                    <span className={styles['time']}>{'12.334'}</span>
                </div>

            </li>
        </Fragment>;
    }
}

export default DataItem;
DataItem.defaultProps = {};
DataItem.propTypes = function(){};
DataItem.propTypes = {};