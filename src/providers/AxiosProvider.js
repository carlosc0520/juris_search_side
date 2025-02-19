// import { app } from "@/main";
import axios from "axios";
// import { AUTH_LOGOUT } from "@/store/actions/auth";

axios.defaults.headers.common.Accept = "application/json";

axios.interceptors.request.use(
  (request) => {
    if (request.url) {
      request.url = "https://api.jurissearch.com" + request.url;
      // request.url = "http://localhost:3080" + request.url;
    }
    // const token = app.$store.state.auth.token;
    const token = localStorage.getItem('accessToken');

    if (token && token !== "") {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // if (response.status === 401) {
    //   if (window.location.pathname !== "/auth/login"){
    //     // localStorage.clear();
    //     window.location.href = "/auth/login?sessionExpired=true";
    //   }
    // }
    // if (response.status === 403) {
    //   if (window.location.pathname !== "/auth/login"){
    //     // localStorage.clear();
    //     window.location.href = "/auth/login?tokenExpired=true";
    //   } 
    // }
    return response;
  },
  (error) => {
    // if (error.response && error.response.data) {
    //   const dataFromServer = error.response.data;
    //   if (dataFromServer.hasOwnProperty("auth") && !dataFromServer.auth) {
    //     logout('El token de ingreso a expirado');
    //   }
    //   return Promise.reject(dataFromServer);
    // }
    return Promise.reject(error.response?.data);
  }
);
