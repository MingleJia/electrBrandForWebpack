import React, { Component } from 'react';
import styles from './DefaultP.scss';
import defaultImg from 'ASSETS/phone/defaultImg.png';
class DefaultP extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <img className={styles.defaultImg} src={defaultImg} alt=""/>
                    <p>切换筛选条件查看考勤</p>
                </div>
            </div>
        );
    }
}

export default DefaultP;