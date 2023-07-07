
import { createStore } from 'vuex'
import config from './config';
import axios from 'axios';
// Create a new store instance.
const store = createStore({
  state() {
    return {
      status: '',
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token

    },
    setUser(state, user) {
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log(user)
        axios({ url: 'login', data: user, method: 'POST' })
          .then(resp => {
            if ('error' in resp.data) {
              commit('auth_error')
              localStorage.removeItem('token')
              reject('Authentication failed');
              return
            }

            const token = resp.data.access_token;
            const user = resp.data.user;
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit('auth_success', token)
            commit('setUser', user)
            resolve(resp)
          })
          .catch(err => {
            
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'auth/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    }
  },
})

export default store;