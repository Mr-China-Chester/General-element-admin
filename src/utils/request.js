import axios from 'axios'
import {
  Message
} from 'element-ui'
// MessageBox
import router from '@/router'
import store from '@/store'
import {
  getToken,
  getClient_ip
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.url += '.shtml?v=' + Math.random() + '&client_ip=' + getClient_ip()
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Auth-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 全局返回码：{400:验证数据未通过,402:未知错误,401:未登陆,501:用户不存在,502:用户被禁用,503:用户非正常登陆状态,504:其它客户端登陆,505:登陆超时}
    const common_error_code = [400, 402, 401, 501, 502, 503, 504, 505]
    if (common_error_code.indexOf(res.code) > -1) {
      // 全局通用错误
      if (res.code === 400) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 4 * 1000
        })
      } else {
        let message = 'unknown error'
        switch (res.code) {
          case 401:
            message = '未登陆'
            break
          case 501:
            message = '用户不存在'
            break
          case 502:
            message = '用户被禁用'
            break
          case 503:
            message = '用户非正常登陆状态'
            break
          case 504:
            message = '其它客户端登陆'
            break
          case 505:
            message = '登陆超时'
            break
        }

        Message({
          message: message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        if (res.code === 508) {
          router.push({
            path: '/guidelines/index'
          })
        } else {
          store.dispatch('user/resetToken')
          location.reload()
        }
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
