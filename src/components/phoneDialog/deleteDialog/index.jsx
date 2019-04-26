import React,{Component,Fragment} from 'react';
import styles from './index.scss';

class DeleteDialog extends Component{

    render() {
        const content=(
            <Fragment>
                <div className={styles.bg}></div>
                <div className={styles.dialog}>
                    <div className={styles.wrap}>
                        <p className={styles.tips}>提示</p>
                        <p className={styles.info}>确定删除该信息？</p>
                        <div className={styles.btns}>
                            <span className={styles.cancel}>取消</span>
                            <span className={styles.delete}>删除</span>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        return content;
    }
}
export default DeleteDialog;