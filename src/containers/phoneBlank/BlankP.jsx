import React, { Component, Fragment } from 'react';
import styles from './BlankP.scss';
import defaultImg from '../../assets/phone/defaultImg.png';
class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
    }

    render() {

        return <Fragment>
            <div className={styles['blank']}>
                <div className={styles['defaultData']}>
                    <img src={defaultImg} alt=""/>
                    <p>出现错误啦!</p>
                </div>
            </div>
        </Fragment >
    }
}

export default InfoItem;
