import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./auth";

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Intercepted error response:", error.response);

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("Token expired or invalid, attempting to refresh...");
      originalRequest._retry = true;
      try {
        const a = await refreshToken();
        console.log("a", a);
        console.log("Token refreshed successfully");
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
