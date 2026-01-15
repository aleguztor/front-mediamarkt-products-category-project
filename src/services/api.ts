import axios from 'axios';
import qs from 'qs';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
});

// Si hiciera falta añadir el token a las peticiones:

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
