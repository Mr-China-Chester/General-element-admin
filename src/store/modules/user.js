import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getVersion, setVersion } from '@/utils/auth'
import { getAllUrl, get_allUrl_suffix, getSOCKET } from '@/utils/index'
import { resetRouter } from '@/router'
import { custom_response } from '@/utils/response-invote'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    userInfo: null,
    avatar: '',
    allUrl: getAllUrl(),
    socket_url: getSOCKET(),
    allUrl_suffix: get_allUrl_suffix(),
    table_text: {
      nothing: '暂无数据'
    },
    version: getVersion()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_Version: (state, version) => {
    setVersion(version)
    state.version = version
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // custom_response({ response, module: 'account', action: 'login', reject, call: function(obj) {
        //     const { data } = response
        //     commit('SET_TOKEN', data.token)
        //     setToken(data.token)
        //     resolve(data)
        // } })
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
