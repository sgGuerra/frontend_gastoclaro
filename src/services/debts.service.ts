import { apiClient } from './api';
import { Debt, CreateDebtDto, UpdateDebtDto } from '../types/debt.types';
import { PaginatedResponse, QueryParams } from '../types/common.types';

export const debtsService = {
  getAll: (params?: QueryParams) => 
    apiClient.get<PaginatedResponse<Debt>>('/debts', params),
    
  getById: (id: string) => 
    apiClient.get<Debt>(`/debts/${id}`),
    
  create: (data: CreateDebtDto) => 
    apiClient.post<Debt>('/debts', data),
    
  update: (id: string, data: UpdateDebtDto) => 
    apiClient.put<Debt>(`/debts/${id}`, data),
    
  delete: (id: string) => 
    apiClient.delete<void>(`/debts/${id}`),
};
