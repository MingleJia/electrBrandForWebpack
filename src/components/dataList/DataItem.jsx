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
                    <span className={styles['titlename']}>{'sdfsdfsdf'}</span>
                    <span className={styles['time']}>{'12.334'}</span>
                </div>
                {/* 下方内容区域 */}
                <div className={`${isOpen ? styles['detail'] : styles['detailHidden']}`}>
                    <p className={styles['text']}>
                        内容那日如能容忍你人人手动内容那日如能容忍你人人手动 内容那日如能容忍你人人手动 内容那日如能容忍你人人手动 内容那日如能容忍你人人手动  
                    </p>
                    {/* 图片区域 */}
                    <div  className={styles['imgWarp']} >
                        <img className={styles['img']} src={'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2161359683,1444613409&fm=26&gp=0.jpg'}  />
                    </div> 
                </div>
            </li>
        </Fragment>;
    }
}

export default DataItem;
DataItem.defaultProps = {};
DataItem.propTypes = function () { };
DataItem.propTypes = {};