import React,{Component} from 'react';
import styles from './index.scss';

class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const login = (
            <div className={styles['container']}>
                <div className={styles['title']}>乐课网电子班牌</div>
            </div>
        )
        return login;
    }
}

export default Login