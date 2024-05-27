import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://coachifybackend-1.onrender.com',
});

export default axiosInstance;
