import {
  fetchGet,
  fetchPost
} from '@/api'

import {
  domain
} from '@/config'

const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 用户名登录
  login({
    commit
  }, form) {
    return new Promise((resolve, reject) => {
      fetchPost(`${domain.zl}'/unit/login'`, form).then(response => {
        const user = response.data.data
        if(user){
          const roles = []
          roles.push(user.rolename)

          //local storage
          storage.set('token', user.token)
          commit('SET_NAME', user.username)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 列表
  getList({
    commit
  }, listQuery) {
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          let response = await fetchGet(`${domain.zl}'/unit/list?'`, listQuery);
          resolve(response)
        } catch (ex) {
          reject(ex)
        }
      })();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
