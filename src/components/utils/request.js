import axios from 'axios'
import {getLocalStorage} from "../utils/auth";

const baseURL = "http://127.0.0.1:8000/manager/api";

const service = axios.create({
  // 联调
  baseURL: baseURL,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    },

  },
// 是否跨站点访问控制请求
  withCredentials: false,
  timeout: 30000,
  // 在向服务器发送请求前，序列化请求数据
  // transformRequest: [function (data) {
  //   data = JSON.parse(data)
  //   return data
  // }],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [function (data) {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    console.log('data == ',data)
    return data
  }]
})

//http request 拦截器
service.interceptors.request.use ( config =>{
  // let token = userInfo.token
    const userInfo = getLocalStorage('userInfo')
    if (userInfo != null) {
      config.headers = {
        'token': userInfo.token
      }
    }
    console.log('headers == ',config.headers)
    return config
  },
  error =>{
    return promise.reject(JSON.parse(error))
  }
)

//http response 拦截器
service.interceptors.response.use(
  response => {
    console.log('response == ',response);
    console.log('code == ', response.status)
    if (response.status !== 200){
      if (isString(response.data)) {
        return Promise.reject(JSON.parse(response.data))
      }
      return Promise.reject(response.data.data)
    }
    return Promise.resolve(response.data)
  },
  error => {
    console.log('error == ' + JSON.stringify(error.response.data))
    return Promise.reject(error.response.data)
  }
)
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url,params={}){
  return new Promise ((resolve,reject) =>{
    service.get(baseURL+url,{params:params},).then(response => {
      resolve (response)
    })
      .catch(error => { reject(error) })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url,data={}) {

  return new Promise((resolve,reject) =>{
    service.post(baseURL + url,data).then(response=>{
      resolve(response)
    }).catch(error=>{
      // console.log('error == ',error)
      reject(error)
    })
  })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    service.patch(baseURL + url,data)
      .then(response => {
        resolve(response);
      }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    service.put(baseURL + url,data)
      .then(response => {
        resolve(response);
      }).catch(err => {
      reject(err)
    })
  })
}
