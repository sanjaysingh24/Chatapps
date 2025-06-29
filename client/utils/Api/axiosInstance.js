import axios from 'axios';
 const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
    withCredentials: true,
})
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

const token = getCookie('token');
console.log(token);

export default axiosInstance;
