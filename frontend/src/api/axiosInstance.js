import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", 
});

axiosInstance.interceptors.request.use((config) => {
  const data = localStorage.getItem("storeInfo");
  if (data) {
    const { token } = JSON.parse(data);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
