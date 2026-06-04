import { apiClient } from './api';
import { Saving, CreateSavingDto, UpdateSavingDto } from '../types/saving.types';
import { PaginatedResponse, QueryParams } from '../types/common.types';

export const savingsService = {
  getAll: (params?: QueryParams) => 
    apiClient.get<PaginatedResponse<Saving>>('/savings', params),
    
  getById: (id: string) => 
    apiClient.get<Saving>(`/savings/${id}`),
    
  create: (data: CreateSavingDto) => 
    apiClient.post<Saving>('/savings', data),
    
  update: (id: string, data: UpdateSavingDto) => 
    apiClient.put<Saving>(`/savings/${id}`, data),
    
  delete: (id: string) => 
    apiClient.delete<void>(`/savings/${id}`),
};
