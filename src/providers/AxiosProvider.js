// import { app } from "@/main";
import axios from "axios";
// import { AUTH_LOGOUT } from "@/store/actions/auth";

axios.defaults.headers.common.Accept = "application/json";

axios.interceptors.request.use(
  (request) => {
    if (request.url) {
      //  request.url = "https://api.jurissearch.com" + request.url;
      request.url = "http://localhost:3000" + request.url;
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
    return response;
  },
  (error) => {
    return Promise.reject(error.response?.data);
  }
);
