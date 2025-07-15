import axios from 'axios';

// For demo purposes, we're using a mock API
// In a real app, this would point to your actual API server
const API_BASE_URL = 'https://api.mock-textype.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // For demo purposes, we'll just simulate the request
    // and not actually send it to a real server
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add a special flag for our mock handlers
    config._isMockRequest = true;
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock response handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If this is a real request to a non-existent server, convert it to a mock response
    if (error.request && !error.response && error.config._isMockRequest) {
      console.log('Converting API request to mock response:', error.config.url);
      
      // Return a mock successful response
      return Promise.resolve({
        data: { 
          success: true,
          message: 'This is a mock response',
          data: {}
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      });
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.hash = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;