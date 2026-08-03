import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sumonmoto-parts-server.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
