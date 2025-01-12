import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { useRouter } from 'next/router'

const api: AxiosInstance = axios.create({
  baseURL: "",
})

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((callback) => callback());
  failedQueue = [];
};


api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const csrfToken = Cookies.get("csrf_access_token");
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

export default api