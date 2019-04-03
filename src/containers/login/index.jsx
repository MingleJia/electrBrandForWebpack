import React,{Component} from 'react';
import styles from './index.scss';
import { accountImg, passwordImg, clearImg, titleImg } from 'ASSETS/login';
import PropTypes from 'prop-types';
import { message } from 'antd';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            account: '',    // 编号
            password: '',   // 密码
        }
    }

    static propTypes = {
        history: PropTypes.object,
    }

    changeAccount=(e)=>{
        this.setState({ account: e.target.value })
    }

    clearAccount=(e)=>{
        this.setState({ account: '' });
        e.target.previousSibling.focus();
    }

    changePassword=(e)=>{
        this.setState({ password: e.target.value })
    }

    clearPasswrd=(e)=>{
        this.setState({ password: '' });
        e.target.previousSibling.focus();
    }

    login=()=>{
        // const { account, password } = this.state;
        message.error('班牌密码输入错误');
        message.error('该班牌编号未创建');
        message.error('该班牌编号已使用');
        this.props.history.push('home');
    }

    render(){
        const { account, password } = this.state;

        const login = (
            <div className={styles['container']}>
                <div className={styles['title']}>
                    <img src={ titleImg }></img>
                </div>
                <div className={styles['input-box']}>
                    <img src={ accountImg }></img>
                    <input type='text' placeholder='请输入班牌编号' onChange={this.changeAccount} value={ account }></input>
                    <img className={ account !== '' ? styles['clear-show'] : styles['clear-hide'] } src={ clearImg } onClick={this.clearAccount}></img>
                </div>
                <div className={styles['input-box']}>
                    <img src={ passwordImg }></img>
                    <input type='password' placeholder='请输入班牌密码' onChange={this.changePassword} value={ password }></input>
                    <img className={ password !== '' ? styles['clear-show'] : styles['clear-hide'] } src={ clearImg } onClick={this.clearPasswrd}></img>
                </div>
                <input type='button' value='确定' onClick={this.login}></input>
            </div>
        )
        return login;
    }
}

export default Login