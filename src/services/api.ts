import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API or mock endpoint
  timeout: 10000,
});

// Example interceptor for error handling or token injection
api.interceptors.response.use(
  response => response,
  error => {
    // Add retry mechanism or custom error handling as needed
    return Promise.reject(error);
  }
);

export default api;
