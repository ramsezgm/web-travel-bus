import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://travel-bus-81kx.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
