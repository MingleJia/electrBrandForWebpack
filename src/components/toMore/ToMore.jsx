import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './ToMore.scss';
/**
 * 顶部组件
 * title : 左侧标题 type:String
 * toWhere : 点击更多跳转地址  type :String 
 * isShow : 更多按钮是否显示  type: boolean
 */
class StudentsStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
    render() {
        return <Fragment>
            <div className={styles['tab']} >
                <div className={styles['title']}>{this.props.title || ''}</div>
                <Link to={this.props.toWhere || '/'}>
                    <div className={styles['btnMore']} style={{ display: this.props.isShow ? 'block' : 'none' }} >更多
                        <span className={styles['more']}></span>
                    </div>
                </Link>
            </div>
        </Fragment>
    }
}

export default StudentsStyle;
StudentsStyle.defaultProps = {};
StudentsStyle.propTypes = function(){};
StudentsStyle.propTypes = {};