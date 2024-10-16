import Vue from "vue";
import Vuex from "vuex";
import decode from "jwt-decode";

import {
  AUTH_REQUEST,
  AUTH_RECOVER,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "@/store/actions/auth";
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "@/store/actions/user";

import LoginProxy from "@/proxies/LoginProxy.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: {
      getters: {
        isAuthenticated: (state) => !!state.token,
        authStatus: (state) => state.status,
        getProfile(state) {
          return decode(state.token);
        },
        isProfileLoaded: (state) => !!state,
      },
      state: {
        token: localStorage.getItem("user-token") || "",
        status: "",
        hasLoadedOnce: false,
      },
      mutations: {
        [AUTH_REQUEST]: (state) => {
          state.status = "loading";
        },
        [AUTH_SUCCESS]: (state, resp) => {
          state.status = "success";
          state.token = resp;
          state.hasLoadedOnce = true;
        },
        [AUTH_ERROR]: (state) => {
          state.status = "error";
          state.hasLoadedOnce = true;
        },
        [USER_REQUEST]: (state) => {
          state.status = "loading";
        },
        [USER_SUCCESS]: (state, resp) => {
          state.status = "success";
        },
        [USER_ERROR]: (state) => {
          state.status = "error";
        },
        [AUTH_LOGOUT]: (state) => {
          state.profile = {};
          state.token = null;
        },
      },
      actions: {
        async [AUTH_REQUEST]({ commit, dispatch }, user) {
          var login = await LoginProxy.login(user);
          return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            if (login.auth) {
              // localStorage.setItem("user-token", login.token);
              commit(AUTH_SUCCESS, login.token);
              dispatch(USER_REQUEST);
              resolve(login.token);
            } else {
              commit(AUTH_ERROR, login);
              // localStorage.removeItem("user-token");
              reject(login);
            }
          });
        },
        async [AUTH_RECOVER]({ commit, dispatch }, user) {
          var recover = await auth.recoverPassword(user);
          return new Promise((resolve, reject) => {
            if (recover.data.status == "Success") {
              resolve(recover.data);
            } else {
              reject(recover.data);
            }
          });
        },
        [AUTH_LOGOUT]: ({ commit, dispatch }) => {
          return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            // localStorage.removeItem("user-token");
            resolve();
          });
        },
        [USER_REQUEST]: ({ commit, dispatch }) => {
          commit(USER_REQUEST);
          let token = localStorage.getItem("user-token");
          if (!token) {
            dispatch(AUTH_LOGOUT);
          }
          let loggedUser = decode(token);
          if (loggedUser) {
            commit(USER_SUCCESS, loggedUser);
          } else {
            commit(USER_ERROR);

            dispatch(AUTH_LOGOUT);
          }
        },
      },
    },
  },
});