import React,{Component} from 'react';
import styles from './index.scss';

class Rank extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const rank = (
            <div className={styles['rank']}>
                <span className={styles['title']}>本周激励排行版</span>
            </div>
        )
        return rank;
    }
}

export default Rank;