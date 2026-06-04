import axios from 'axios';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';

    // Attach a consistent, user-friendly message for UI layers.
    // Keep the original Axios error shape so callers can read error.response, etc.
    error.userMessage = message;
    error.status = error.response?.status;

    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');

      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getProfile: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/profile', data),
};

// Jobs API
export const jobsAPI = {
  getAll: (params) => api.get('/api/jobs', { params }),
  getById: (id) => api.get(`/api/jobs/${id}`),
  getMyJobs: () => api.get('/api/jobs/recruiter/my-jobs'),
  getAllAdmin: () => api.get('/api/jobs/admin/all'),
  create: (data) => api.post('/api/jobs', data),
  update: (id, data) => api.put(`/api/jobs/${id}`, data),
  close: (id) => api.put(`/api/jobs/${id}/close`),
  reopen: (id) => api.put(`/api/jobs/${id}/reopen`),
  delete: (id) => api.delete(`/api/jobs/${id}`),
};

// Applications API
export const applicationsAPI = {
  apply: (jobId) => api.post(`/api/applications/${jobId}`),
  getMyApplications: () => api.get('/api/applications/my-applications'),
  getJobApplicants: (jobId) => api.get(`/api/applications/job/${jobId}`),
  updateStatus: (applicationId, status) =>
    api.put(`/api/applications/${applicationId}/status`, { status }),
  recomputeAiScore: (applicationId) => api.put(`/api/applications/${applicationId}/ai-score`),
  recomputeJobAiScores: (jobId) => api.put(`/api/applications/job/${jobId}/ai-scores`),
  withdraw: (applicationId) => api.delete(`/api/applications/${applicationId}`),
  getStats: () => api.get('/api/applications/recruiter/stats'),
};

// Notifications API
export const notificationsAPI = {
  getMy: (params) => api.get('/api/notifications', { params }),
  markRead: (id) => api.put(`/api/notifications/${id}/read`),
  markAllRead: () => api.put('/api/notifications/read-all')
};

// Resume API
export const resumeAPI = {
  upload: (formData) => {
    return api.post('/api/resumes', formData);
  },
  getMy: () => api.get('/api/resumes/me'),
  getById: (id) => api.get(`/api/resumes/${id}`),
  analyze: (id) => api.post(`/api/resumes/${id}/analyze`),
  delete: (id) => api.delete(`/api/resumes/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/api/admin/stats'),
  getAllUsers: (params) => api.get('/api/admin/users', { params }),
  getAllJobs: (params) => api.get('/api/admin/jobs', { params }),
  getAllApplications: (params) => api.get('/api/admin/applications', { params }),
  updateUserRole: (userId, role) => api.put(`/api/admin/users/${userId}/role`, { role }),
  deleteUser: (userId) => api.delete(`/api/admin/users/${userId}`),
  verifyRecruiter: (userId, verified = true) => api.put(`/api/admin/users/${userId}/verify`, { verified }),
};

// Interview API
export const interviewAPI = {
  schedule: (data) => api.post('/api/interviews', data),
  getForApplication: (applicationId) => api.get(`/api/interviews/application/${applicationId}`),
  recordParticipation: (id, data) => api.put(`/api/interviews/${id}/participation`, data),
  submitScore: (id, score) => api.put(`/api/interviews/${id}/score`, { score }),
  submitFeedback: (id, data) => api.put(`/api/interviews/${id}/feedback`, data),
  cancel: (id) => api.put(`/api/interviews/${id}/cancel`),
};

// Helper functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => localStorage.getItem('token');
export const getUserRole = () => localStorage.getItem('role');
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const setUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};
export const isAuthenticated = () => !!getAuthToken();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export default api;
