import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
let baseURL = '';
const env = process.env.NODE_ENV;
if(env === 'development'){
    baseURL = 'http://eboard.leke.cn';
    // baseURL = 'http://local.leke-eboard.cc';
}

// axios defaults
axios.defaults.withCredentials = true;
function getItem(key){
    if(window.location.href.indexOf("phone")!=-1){
        return 'VGxFOVBRPT07TmpBME1EWXhNRE0wOzU1';
    }else{
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }
}
//如果账户被删除重新登入  error:错误信息{}
function reLogin(error){
    if(error.response.status == 401){
        message.error('账户已经被删除,请重新登录');
        message.config({ maxCount:1,});
        //删除缓存3秒后返回登录页
        window.localStorage.removeItem('password'); 
        window.localStorage.removeItem('account'); 
        window.localStorage.removeItem('tabList'); 
        setTimeout(function(){
            window.location.href = window.location.href.split('#/')[0];
        },3000)
    }
}
let toastLock = true;
function axiosRequest(method, url, params, type){
    switch (method) {
        case 'get':
            return new Promise((resolve)=>{
                axios({
                    url: baseURL + url,
                    method: 'get',
                    params: {
                        ...params,
                        t: new Date().getTime(),
                    },
                    headers: { 'token': getItem('token') },
                    timeout:10000,
                }).then((json)=>{
                    json.status === 200 && resolve(json.data);
                }).catch((error)=>{
                    if(error.message.indexOf('timeout') !== -1 && toastLock){
                        message.info('网络不给力',10);
                        toastLock = false;
                    }
                    setTimeout(() => {
                        toastLock = true;
                    }, 2000);
                    reLogin(error);
                });
            });
        case 'post':
            return new Promise((resolve, reject)=>{
                axios({
                    url: baseURL + url,
                    method: 'post',
                    data: type === 'form' ? qs.stringify(params) : params,
                    headers: { 'token': getItem('token') },
                }).then((json)=>{
                    json.status === 200 && resolve(json.data);
                }).catch((error)=>{
                    if(error.message.indexOf('timeout') !== -1 && toastLock){
                        message.info('网络不给力',10);
                        toastLock = false;
                    }
                    setTimeout(() => {
                        toastLock = true;
                    }, 2000);
                    reLogin(error);
                    reject(error.response);
                });
            });
        default:
            break;
    }
}

export default axiosRequest;