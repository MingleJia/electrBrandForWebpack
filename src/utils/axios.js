import axios from 'axios';
import qs from 'qs';

let baseURL = '';
const env = process.env.NODE_ENV;
if(env === 'development'){
    baseURL = 'https://user.leke.cn';
}

// axios defaults
axios.defaults.withCredentials = true;

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