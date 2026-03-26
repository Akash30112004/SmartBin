import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
=======
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
<<<<<<< HEAD

    const normalized_error = {
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Request failed',
      code: error.response?.data?.error_code,
      details: error.response?.data?.errors || null,
      raw: error
    };

    return Promise.reject(normalized_error);
=======
    return Promise.reject(error);
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
  }
);

export default api;
