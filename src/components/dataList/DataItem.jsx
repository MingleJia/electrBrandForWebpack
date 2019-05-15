import React, { Component, Fragment } from 'react';
import styles from './DataItem.scss';
import { collapseImg, expandImg } from 'ASSETS/campusstyle';
import moment from 'moment';
class DataItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            visible: false,
            showImgSrc: ''
        }
    }

    componentDidMount() {

    }
    showImg(showImgSrc) {
        this.setState({
            visible: !this.state.visible,
            showImgSrc: showImgSrc
        });
    }
    render() {
        let { isOpen } = this.state;
        return <Fragment>
            <div onClick={() => { this.showImg() }} style={{ display: `${this.state.visible ? 'block' : 'none'}` }} className={styles['showImg']}>
                <img src={this.state.showImgSrc} alt="" />
            </div>
            <li className={styles['content']} style={this.props.isLast ? { marginBottom: '0.5rem' } : {}}>
                <div className={styles['title']} onClick={() => { this.setState({ isOpen: !isOpen }) }}>
                    <div className={styles['clickexpand']} >
                        {
                            isOpen
                                ?
                                <Fragment>
                                    <span>收起</span><img src={expandImg} className={styles['collapse']} />
                                </Fragment>
                                :
                                <Fragment>
                                    <span>展开</span><img src={collapseImg} className={styles['expand']} />
                                </Fragment>
                        }
                    </div>
                    <span className={styles['titlename']}>{this.props.item.title || '暂无标题'}</span>
                    <span className={styles['time']}>发布时间：{moment(this.props.item.audit_time * 1000 || 0).format("YYYY-MM-DD HH:mm ")}</span>
                </div>
                {/* 下方内容区域 */}
                <div
                    className={`${isOpen ? styles['detail'] : styles['detailHidden']}`}>
                    {this.props.item.desc ? <p className={styles['text']}>
                        {
                            moment(this.props.item.show_time * 1000 || 0).format("M月D日 ") + '，'
                        }
                        {
                            this.props.item.desc
                        }
                    </p> : <p>暂无内容</p>}
                    {/* 图片区域 https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg */}
                    {
                        this.props.item.images.map(
                            (item, index) =>
                                <div
                                    // style={{ backgroundImage: `url(${item})`  }}
                                    style={{ width: `${(index == this.props.item.images.length - 1 && index % 2 == 0) ? '9.1rem' : '9.1rem'}` }}
                                    key={index}
                                    className={styles['imgWarp']} >
                                    <img onClick={() => { this.showImg(item.image) }} className={styles['img']} src={item.image} />
                                    {/* <img onClick={() => { this.showImg('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg') }} className={styles['img']} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg'} /> */}
                                </div>
                        )
                    }
                    {

                        this.props.item.comment && <div className={styles['line']}></div>
                    }
                    {
                        this.props.item.comment
                            ?
                            <p className={styles['text']}>
                                <span>教师评价:</span>
                                {
                                    this.props.item.comment
                                }
                            </p>
                            :
                            null
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