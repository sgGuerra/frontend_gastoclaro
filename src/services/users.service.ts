import { apiClient } from './api';
import { User } from '../types/user.types';
import { PaginatedResponse, QueryParams } from '../types/common.types';

export const usersService = {
  getAll: (params?: QueryParams) => 
    apiClient.get<PaginatedResponse<User>>('/users', params),
    
  delete: (id: string) => 
    apiClient.delete<void>(`/users/${id}`),
};
