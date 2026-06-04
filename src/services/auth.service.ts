import { apiClient } from './api';
import { AuthResponse, LoginCredentials, RegisterData } from '../types/user.types';

export const authService = {
  login: (credentials: LoginCredentials) => 
    apiClient.post<AuthResponse>('/auth/login', credentials),
    
  register: (data: RegisterData) => 
    apiClient.post<AuthResponse>('/auth/register', data),
};
