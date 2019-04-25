import React,{Component} from 'react';
import { message } from 'antd';
import styles from './index.scss';
import { backImg } from 'ASSETS/header';

class BackPrevHeader extends Component{
    constructor(props){
        super(props);
    }

    backPrev=()=>{
        if( window.navigator.onLine === true ){
            window.history.back(-1);
        }else{
            message.warning('网络不可用');
        }
    }

    render(){
        const header = (
            <div className={styles['header']}>
                <span className={styles['goback']} onClick={ this.backPrev }>
                    <img src={ backImg }></img><span className={styles['backtext']}>返回</span>
                </span>
            </div>
        )
        return header;
    }
}

export default BackPrevHeader