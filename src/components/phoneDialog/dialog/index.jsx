import React, { Component, Fragment } from 'react';
import styles from './index.scss';

class DeleteDialog extends Component {
    componentDidMount(){
        
    }
    render() {
        const content = (
            <Fragment>
                <div className={styles['dialogWrap']} style={{ display: this.props.isShow ? 'block' : 'none' }}>
                    <div className={styles.bg}></div>
                    <div className={styles.dialog} >
                        <div className={styles.wrap}>
                            <p className={styles.tips}>提示</p>
                            <p className={styles.info}>{this.props.dislogTitle || ''}</p>
                            <div className={styles.btns}>
                                <span
                                    className={styles.cancel}
                                    onClick={() => {
                                        this.props.onCancel && this.props.onCancel();
                                    }}
                                >{this.props.cancelText || 'NO'}</span>
                                <span
                                    className={styles.delete}
                                    onClick={() => {
                                        this.props.onOk && this.props.onOk();
                                    }}
                                >{this.props.okText || 'YES'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        return content;
    }
}
export default DeleteDialog;
DeleteDialog.defaultProps = {};
DeleteDialog.propTypes = function () { };
DeleteDialog.propTypes = {};