import { env } from "@/utils/env";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (request) {
    return request;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },

  function (error) {
    return Promise.reject(error);
  },
);

export { axiosInstance };
