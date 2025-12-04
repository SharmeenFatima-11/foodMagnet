import axios from "axios";
import { RefreshToken } from "./authApi";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError =  error.response?.data || error.message
    console.log("apiError", apiError)
    if(apiError == "Network Error" ){
      RefreshToken()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
