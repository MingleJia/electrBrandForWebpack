import axios from 'axios';
import qs from 'qs';

let baseURL = '';
const env = process.env.NODE_ENV;
if(env === 'development'){
    baseURL = 'http://192.168.80.68:8001';
}

// axios defaults
axios.defaults.withCredentials = true;
function getItem(key){
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
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
                    reject(error.response);
                });
            });
        default:
            break;
    }
}

export default axiosRequest;