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
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
//如果账户被删除重新登入  error:错误信息{}
function reLogin(error){
    if(error.response.status == 401){
        message.warning('账户已经被删除,请重新登录');
        //删除缓存3秒后返回登录页
        window.localStorage.removeItem('password'); 
        window.localStorage.removeItem('account'); 
        setTimeout(function(){
            window.location.href = window.location.href.split('#/')[0];
        },3000)
    }
}
function axiosRequest(method, url, params, type){
    switch (method) {
        case 'get':
            return new Promise((resolve, reject)=>{
                axios({
                    url: baseURL + url,
                    method: 'get',
                    params: {
                        ...params,
                        t: new Date().getTime(),
                    },
                    headers: { 'token': getItem('token') },
                }).then((json)=>{
                    json.status === 200 && resolve(json.data);
                }).catch((error)=>{
                    reLogin(error);
                    reject(error.response);
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
                    reLogin(error);
                    reject(error.response);
                });
            });
        default:
            break;
    }
}

export default axiosRequest;