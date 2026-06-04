import { useState, useCallback } from 'react';
import { expensesService } from '../services/expenses.service';
import { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types/expense.types';
import { QueryParams, PaginatedResponse } from '../types/common.types';
import { useToast } from './useToast';

export const useExpenses = () => {
  const [data, setData] = useState<PaginatedResponse<Expense>>({ data: [], meta: { page: 1, limit: 10, totalItems: 0, totalPages: 0 } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const fetchExpenses = useCallback(async (params?: QueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await expensesService.getAll(params);
      setData(res);
    } catch (err: any) {
      setError(err);
      showToast(err.message || 'Error al cargar gastos', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const createExpense = async (dto: CreateExpenseDto) => {
    setIsLoading(true);
    try {
      await expensesService.create(dto);
      showToast('Gasto creado con éxito', 'success');
      await fetchExpenses({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al crear gasto', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateExpense = async (id: string, dto: UpdateExpenseDto) => {
    setIsLoading(true);
    try {
      await expensesService.update(id, dto);
      showToast('Gasto actualizado', 'success');
      await fetchExpenses({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al actualizar gasto', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    setIsLoading(true);
    try {
      await expensesService.delete(id);
      showToast('Gasto eliminado', 'success');
      await fetchExpenses({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al eliminar gasto', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: data.data,
    meta: data.meta,
    isLoading,
    error,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense
  };
};
