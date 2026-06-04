import { useState, useCallback } from 'react';
import { savingsService } from '../services/savings.service';
import { Saving, CreateSavingDto, UpdateSavingDto } from '../types/saving.types';
import { QueryParams, PaginatedResponse } from '../types/common.types';
import { useToast } from './useToast';

export const useSavings = () => {
  const [data, setData] = useState<PaginatedResponse<Saving>>({ data: [], meta: { page: 1, limit: 10, totalItems: 0, totalPages: 0 } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const fetchSavings = useCallback(async (params?: QueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await savingsService.getAll(params);
      setData(res);
    } catch (err: any) {
      setError(err);
      showToast(err.message || 'Error al cargar ahorros', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const createSaving = async (dto: CreateSavingDto) => {
    setIsLoading(true);
    try {
      await savingsService.create(dto);
      showToast('Ahorro creado con éxito', 'success');
      await fetchSavings({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al crear ahorro', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSaving = async (id: string, dto: UpdateSavingDto) => {
    setIsLoading(true);
    try {
      await savingsService.update(id, dto);
      showToast('Ahorro actualizado', 'success');
      await fetchSavings({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al actualizar ahorro', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSaving = async (id: string) => {
    setIsLoading(true);
    try {
      await savingsService.delete(id);
      showToast('Ahorro eliminado', 'success');
      await fetchSavings({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al eliminar ahorro', 'error');
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
    fetchSavings,
    createSaving,
    updateSaving,
    deleteSaving
  };
};
