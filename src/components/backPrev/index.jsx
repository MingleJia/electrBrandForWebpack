import React,{Component} from 'react';
import styles from './index.scss';
import { backImg } from 'ASSETS/header';

class BackPrevHeader extends Component{
    constructor(props){
        super(props);
    }

    backPrev=()=>{
        window.history.back(-1);
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