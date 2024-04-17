/*import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esta URL por la URL de tu backend
});

// Añadir el token como encabezado de autorización en todas las solicitudes
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('586E3272357538782F413F4428472B4B6250655368566B597033733676397924');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;*/

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esta URL por la URL de tu backend
});

export default axiosInstance;
