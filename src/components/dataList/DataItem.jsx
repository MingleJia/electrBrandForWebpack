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
        let { isOpen } = this.state;
        return <Fragment>
            <li className={styles['content']} >
                <div className={styles['title']}>
                    <div className={styles['clickexpand']} onClick={() => { this.setState({ isOpen: !isOpen }) }}>
                        {
                            isOpen
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
                    <span className={styles['titlename']}>{this.props.item.title || '暂无标题'}</span>
                    <span className={styles['time']}>{'12.334'}</span>
                </div>
                {/* 下方内容区域 */}
                <div className={`${isOpen ? styles['detail'] : styles['detailHidden']}`}>
                    <p className={styles['text']}>
                        {
                            this.props.item.desc || '暂无内容'
                        }
                    </p>
                    {/* 图片区域 https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg */}
                    {
                        this.props.item.images.map(
                            (item, index) =>
                                <div
                                    style={{ width: `${(index == this.props.item.images.length - 1 && index % 2 == 0) ? '18.2rem' : '9.1rem'}` }}
                                    key={index}
                                    className={styles['imgWarp']} >
                                    <img className={styles['img']} src={item.image} />
                                </div>
                        )
                    }
                </div>
            </li>
        </Fragment>;
    }
}

export default DataItem;
DataItem.defaultProps = {};
DataItem.propTypes = function () { };
DataItem.propTypes = {};