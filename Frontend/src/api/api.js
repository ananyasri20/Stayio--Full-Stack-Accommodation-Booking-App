import axios from 'axios';

// Single source of truth for the base URL
// No trailing slash — matches /api/reviews exactly
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;