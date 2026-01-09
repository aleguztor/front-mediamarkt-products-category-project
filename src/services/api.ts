import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://tu-api.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
