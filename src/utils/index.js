/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}


/**
 * @param {number} time
 * @returns {string}
 * 秒时间戳转换时间
 */
export function toLocaleString(time) {
  var date = new Date(time * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = change(date.getDate()) + ' '
  var h = change(date.getHours()) + ':'
  var m = change(date.getMinutes()) + ':'
  var s = change(date.getSeconds())
  return Y + M + D + h + m + s
}

export function change(t) {
  if (t < 10) {
    return '0' + t
  } else {
    return t
  }
}

/**
 * @data {string} str   需要从这里提取的值
 * @field {strinbg}     需要从变量值提取的字段名
 * @action {bloud}      true 提取 flase 剔除
 * @returns {Boolean}
 */
export function filter_field(data, field, action = true) {
  const res = {}
  if (typeof field === 'string') {
    field = field.split(',')
  }
  field.forEach(function(item) {
    item = item.replace(' ', '')
    if (typeof data[item] !== 'undefined') {
      if (action) {
        res[item] = data[item]
      } else {
        delete data[item]
      }
    }
  })
  return action ? res : data
}
/**
 * 获取当前环境变量更改socket 链接
 */
export function getSOCKET() {
  return process.env.VUE_APP_BASE_SOCKET
}
/**
 * 获取当前环境变量更改url
 */
export function getAllUrl() {
  return process.env.VUE_APP_BASE_HOST
}

/**
 * 获取当前的url后缀参数
 */
export function get_allUrl_suffix() {
  return '.shtml?v=' + Math.random()
}

/**
 * @param number num 要计算的数字
 * @param integer pricision 是计算的精度
 */
export function round(num, precision = 0) {
  const pre = Math.pow(10, precision + 1)
  return Math.round(num * pre) / pre
}

/**
 * 判断两个object是否相同 相同true 不相同false
 * @param oldData object
 * @param newData object
 */

export function equalsObj(obj1, obj2) {
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return equalsObj(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
