import { apiClient } from './api';
import { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types/expense.types';
import { PaginatedResponse, QueryParams } from '../types/common.types';

export const expensesService = {
  getAll: (params?: QueryParams) => 
    apiClient.get<PaginatedResponse<Expense>>('/expenses', params),
    
  getById: (id: string) => 
    apiClient.get<Expense>(`/expenses/${id}`),
    
  create: (data: CreateExpenseDto) => 
    apiClient.post<Expense>('/expenses', data),
    
  update: (id: string, data: UpdateExpenseDto) => 
    apiClient.put<Expense>(`/expenses/${id}`, data),
    
  delete: (id: string) => 
    apiClient.delete<void>(`/expenses/${id}`),
};
