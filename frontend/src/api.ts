import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

 const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    // Add a token to the request headers if available
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error: Error) => {
    return Promise.reject(error);
  }
);

export default api;