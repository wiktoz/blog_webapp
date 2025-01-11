import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import Router from "next/router"

const api: AxiosInstance = axios.create({
  baseURL: ""
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


api.interceptors.response.use((response: AxiosResponse): AxiosResponse => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push(() => {
            api(originalRequest).then(resolve).catch(reject);
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post("/api/auth/refresh-token")

        if (refreshResponse.status === 200) {
          processQueue()
          return api(originalRequest)
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        Router.push("/auth/sign-in")
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api