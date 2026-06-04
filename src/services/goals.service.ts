import { apiClient } from './api';
import { Goal, CreateGoalDto, UpdateGoalDto } from '../types/goal.types';
import { PaginatedResponse, QueryParams } from '../types/common.types';

export const goalsService = {
  getAll: (params?: QueryParams) => 
    apiClient.get<PaginatedResponse<Goal>>('/goals', params),
    
  getById: (id: string) => 
    apiClient.get<Goal>(`/goals/${id}`),
    
  create: (data: CreateGoalDto) => 
    apiClient.post<Goal>('/goals', data),
    
  update: (id: string, data: UpdateGoalDto) => 
    apiClient.put<Goal>(`/goals/${id}`, data),
    
  delete: (id: string) => 
    apiClient.delete<void>(`/goals/${id}`),
};
