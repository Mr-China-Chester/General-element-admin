import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
// const TokenKey = process.env.VUE_APP_COOKIE_NAME
const Cookie_Version = 'version'


export function getClient_ip() {
  return Cookies.get('BigSellerIT_ERP')
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置版本号cookie
export function getVersion() {
  return Cookies.get(Cookie_Version)
}

export function setVersion(New_Version) {
  return Cookies.set(Cookie_Version, New_Version, { expires: 30 })
}
