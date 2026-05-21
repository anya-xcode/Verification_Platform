import axios from 'axios';

// Normalize: ensure the base URL always ends with /api
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawUrl.endsWith('/api')
  ? rawUrl
  : `${rawUrl.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject Bearer token from localStorage for all API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vshield_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Candidates endpoints
export const candidateApi = {
  getCandidates: async (params) => {
    const response = await api.get('/candidates', { params });
    return response.data;
  },
  getCandidateById: async (id) => {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },
  createCandidate: async (candidateData) => {
    const response = await api.post('/candidates', candidateData);
    return response.data;
  },
  deleteCandidate: async (id) => {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/candidates/stats/summary');
    return response.data;
  },
};

// Verification endpoints
export const verificationApi = {
  verifyAadhaar: async (candidateId) => {
    const response = await api.post(`/verification/aadhaar/${candidateId}`);
    return response.data;
  },
  verifyPan: async (candidateId) => {
    const response = await api.post(`/verification/pan/${candidateId}`);
    return response.data;
  },
};

// Reports endpoints
export const reportApi = {
  downloadReport: async (candidateId) => {
    const response = await api.get(`/reports/pdf/${candidateId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
