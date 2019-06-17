import React,{Component,Fragment} from 'react';
import styles from './index.scss';

class RejectDialog extends Component{

    render() {
        const content=(
            <Fragment>
                <div className={styles.bg}></div>
                <div className={styles.dialog}>
                    <div className={styles.wrap}>
                        <p className={styles.tips}>提示</p>
                        <p className={styles.info}>您已驳回，确定告知家长原因？</p>
                        <div className={styles.btns}>
                            <span className={styles.cancel}>取消</span>
                            <span className={styles.delete}>告知</span>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        return content;
    }
}
export default RejectDialog;