import axios from 'axios';
import { ApiResponse, AuthResponse, LoginData, RegisterData, User } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/usuarios/login', loginData);
    return response.data;
  },

  async register(registerData: RegisterData): Promise<ApiResponse<User>> {
    const response = await api.post<ApiResponse<User>>('/api/usuarios', registerData);
    return response.data;
  },

  async getCurrentUser(): Promise<User | null> {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default api;




