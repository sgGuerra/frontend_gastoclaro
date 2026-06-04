import { useState, useCallback } from 'react';
import { goalsService } from '../services/goals.service';
import { Goal, CreateGoalDto, UpdateGoalDto } from '../types/goal.types';
import { QueryParams, PaginatedResponse } from '../types/common.types';
import { useToast } from './useToast';

export const useGoals = () => {
  const [data, setData] = useState<PaginatedResponse<Goal>>({ data: [], meta: { page: 1, limit: 10, totalItems: 0, totalPages: 0 } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const fetchGoals = useCallback(async (params?: QueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await goalsService.getAll(params);
      setData(res);
    } catch (err: any) {
      setError(err);
      showToast(err.message || 'Error al cargar metas', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const createGoal = async (dto: CreateGoalDto) => {
    setIsLoading(true);
    try {
      await goalsService.create(dto);
      showToast('Meta creada con éxito', 'success');
      await fetchGoals({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al crear meta', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGoal = async (id: string, dto: UpdateGoalDto) => {
    setIsLoading(true);
    try {
      await goalsService.update(id, dto);
      showToast('Meta actualizada', 'success');
      await fetchGoals({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al actualizar meta', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGoal = async (id: string) => {
    setIsLoading(true);
    try {
      await goalsService.delete(id);
      showToast('Meta eliminada', 'success');
      await fetchGoals({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al eliminar meta', 'error');
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
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal
  };
};
