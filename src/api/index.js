// 封装 ajax 操作
import axios from 'axios'

const API_ROOT = ''

// 基础 URL
axios.defaults.baseURL = API_ROOT
// 使用 json 格式传输
axios.defaults.headers.Accept = 'application/json'
// 当前请求为跨域类型时，是否在请求中携带 cookie
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function () {
  let error = {
    data: {
      msg: '请求出错'
    }
  }
  return Promise.reject(error)
})

export default {
}
