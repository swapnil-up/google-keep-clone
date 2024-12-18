import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 5000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("api_token");
    console.log("Interceptor sends:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
