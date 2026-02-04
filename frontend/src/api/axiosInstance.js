import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
});

axiosInstance.interceptors.request.use((config) => {
  const raw = localStorage.getItem("storeInfo");
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
