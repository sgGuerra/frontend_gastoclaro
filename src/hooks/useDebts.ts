import { useState, useCallback } from 'react';
import { debtsService } from '../services/debts.service';
import { Debt, CreateDebtDto, UpdateDebtDto } from '../types/debt.types';
import { QueryParams, PaginatedResponse } from '../types/common.types';
import { useToast } from './useToast';

export const useDebts = () => {
  const [data, setData] = useState<PaginatedResponse<Debt>>({ data: [], meta: { page: 1, limit: 10, totalItems: 0, totalPages: 0 } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const fetchDebts = useCallback(async (params?: QueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await debtsService.getAll(params);
      setData(res);
    } catch (err: any) {
      setError(err);
      showToast(err.message || 'Error al cargar deudas', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const createDebt = async (dto: CreateDebtDto) => {
    setIsLoading(true);
    try {
      await debtsService.create(dto);
      showToast('Deuda creada con éxito', 'success');
      await fetchDebts({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al crear deuda', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDebt = async (id: string, dto: UpdateDebtDto) => {
    setIsLoading(true);
    try {
      await debtsService.update(id, dto);
      showToast('Deuda actualizada', 'success');
      await fetchDebts({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al actualizar deuda', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDebt = async (id: string) => {
    setIsLoading(true);
    try {
      await debtsService.delete(id);
      showToast('Deuda eliminada', 'success');
      await fetchDebts({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al eliminar deuda', 'error');
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
    fetchDebts,
    createDebt,
    updateDebt,
    deleteDebt
  };
};
