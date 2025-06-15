import axios from 'axios';
 const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
