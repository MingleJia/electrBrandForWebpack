import React, { Component, Fragment } from 'react';
import { noImg, } from 'ASSETS/campusstyle';
import styles from './NoDataPage.scss';
/**
 * imgSrc:无数据图片地址 type:string
 * text: 无数据文字显示 type:string
 */
class NoDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        // console.log(this.state.dataList)
        return <Fragment>
            <div className={styles['content']}>
                <div className={styles['show']}>
                    <img src={this.props.imgSrc||noImg} alt="" />
                    <p>{this.props.text ||'暂无数据'}</p>
                </div>
            </div>
        </Fragment>
    }
}

export default NoDataPage;