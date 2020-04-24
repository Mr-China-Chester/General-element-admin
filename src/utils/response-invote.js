import { Message } from 'element-ui'

const global_error_response = {
  comment_manage: {
    add: {
      201: '不存在的asin信息'
    }
  }
}

const normal_response_code = 200

export function custom_response(obj) {
  // response, module, action, call
  const { response, module, action, call, reject } = obj
  const { code } = response
  if (code === normal_response_code && typeof call === 'function') {
    return call(obj)
  } else {
    const message = global_error_response[module][action][code] || response.msg
    Message({
      message: message || 'Error',
      type: 'error',
      duration: 4 * 1000
    })
    // return call(obj);
    return reject()
    // return Promise.reject(new Error(obj || 'Error'))
  }
}
