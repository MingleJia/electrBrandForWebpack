import React, { Component } from 'react';
import styles from './index.scss';
import { accountImg, passwordImg, clearImg, titleImg } from 'ASSETS/login';
import PropTypes from 'prop-types';
import { message } from 'antd';
import axios from 'UTILS/axios';
import { connect } from 'react-redux';
import { setUserInfo } from 'MODULES/root/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',    // 编号
            password: '',   // 密码
        }
    }

    static propTypes = {
        history: PropTypes.object,
        setUserInfo: PropTypes.func,
    }

    componentDidMount() {
        if (window.localStorage.getItem('account') && window.localStorage.getItem('password')) {
            this.loginAuto();
        }
    }

    changeAccount = (e) => {
        this.setState({ account: e.target.value })
    }

    clearAccount = (e) => {
        this.setState({ account: '' });
        e.target.previousSibling.focus();
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    clearPasswrd = (e) => {
        this.setState({ password: '' });
        e.target.previousSibling.focus();
    }

    login = () => {
        const { account, password } = this.state;
        if (account.replace(/\s+/g,"") === '') {
            message.error('请输入班牌编号');
        } else if (password === '') {
            message.error('请输入班牌密码');
        } else {
            axios('post', '/api/user/login', {
                account: account,
                password: password,
            }, 'form').then((json) => {
                if (json.code === 1) {
                    this.props.setUserInfo({ info: json.data.userinfo });
                    // document.cookie = 'token=271eb32e-4858-4434-9574-0c2dafb14bd7';
                    document.cookie = 'token=' + json.data.userinfo.token;
                    window.localStorage.setItem("account", window.btoa(account));
                    window.localStorage.setItem("password", window.btoa(password));
                    this.props.history.push('home');
                } else if (json.code === 0) {
                    message.error(json.msg);
                }
            })
        }
        message.config({ maxCount:1,});
    }
    //这是自动登入,代码内容和登入一样只是登入的参数从浏览器缓存获取
    loginAuto = () => {
        // const { account, password } = this.state;
        const account = window.atob(window.localStorage.getItem('account'));
        const password = window.atob(window.localStorage.getItem('password'));
        if (account === '') {
            message.error('请输入班牌编号');
        } else if (password === '') {
            message.error('请输入班牌密码');
        } else {
            axios('post', '/api/user/login', {
                account: account,
                password: password,
            }, 'form').then((json) => {
                if (json.code === 1) {
                    this.props.setUserInfo({ info: json.data.userinfo });
                    // document.cookie = 'token=271eb32e-4858-4434-9574-0c2dafb14bd7';
                    document.cookie = 'token=' + json.data.userinfo.token;
                    window.localStorage.setItem("account", window.btoa(account));
                    window.localStorage.setItem("password", window.btoa(password));
                    this.props.history.push('home');
                } else if (json.code === 0) {
                    message.error(json.msg);
                }
            })
        }
        message.config({ maxCount:1,});
    }
    render() {
        const { account, password } = this.state;

        const login = (
            <div className={styles['container']}>
                <div className={styles['title']}>
                    <img src={titleImg}></img>
                </div>
                <div className={styles['input-box']}>
                    <img src={accountImg}></img>
                    <input type='text' placeholder='请输入班牌编号' onChange={this.changeAccount} value={account}></input>
                    <img className={account !== '' ? styles['clear-show'] : styles['clear-hide']} src={clearImg} onClick={this.clearAccount}></img>
                </div>
                <div className={styles['input-box']}>
                    <img src={passwordImg}></img>
                    <input type='password' placeholder='请输入班牌密码' onChange={this.changePassword} value={password}></input>
                    <img className={password !== '' ? styles['clear-show'] : styles['clear-hide']} src={clearImg} onClick={this.clearPasswrd}></img>
                </div>
                <input type='button' value='确定' onClick={this.login}></input>
            </div>
        )
        return login;
    }
}

export default connect(
    null,
    { setUserInfo }
)(Login)