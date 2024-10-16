import decode from 'jwt-decode';
import { AUTH_REQUEST, AUTH_RECOVER, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/actions/auth';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '@/store/actions/user'

import LoginProxy from "@/proxies/LoginProxy.js";

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false,
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getProfile(state) { return decode(state.token) },
    isProfileLoaded: state => !!state,
}

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = 'success'
        state.token = resp
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    },
    [USER_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = 'success'
    },
    [USER_ERROR]: (state) => {
        state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
        state.profile = {};
        state.token = null;
    },

}

const actions = {
    async [AUTH_REQUEST]({ commit, dispatch }, user) {
        var login = await LoginProxy.login(user);
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            if (login?.status === 201) {
                localStorage.setItem('user-token', login.data?.TOKEN)
                commit(AUTH_SUCCESS, login.data?.TOKEN)
                dispatch(USER_REQUEST)
                resolve(login.data)
            } else {
                commit(AUTH_ERROR, login)
                // localStorage.removeItem('user-token')
                reject(login)
            }
        })
    },
    async [AUTH_RECOVER]({ commit, dispatch }, user) {
        var recover = await auth.recoverPassword(user);
        return new Promise((resolve, reject) => {
            if (recover.data.status == 'Success') {
                resolve(recover.data)
            } else {
                reject(recover.data)
            }
        })
    },
    async [AUTH_LOGOUT]({ commit, dispatch }) {
        var logout = await LoginProxy.logout();
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            // localStorage.removeItem('user-token')
            resolve()
        })
    },
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST)
        let token = localStorage.getItem('user-token');
        if (!token) {
            dispatch(AUTH_LOGOUT)
        }
        let loggedUser = decode(token);
        if (loggedUser) {
            commit(USER_SUCCESS, loggedUser)
        } else {
            commit(USER_ERROR)

            dispatch(AUTH_LOGOUT)
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}