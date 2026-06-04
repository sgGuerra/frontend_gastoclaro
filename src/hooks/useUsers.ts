import { useState, useCallback } from 'react';
import { usersService } from '../services/users.service';
import { User } from '../types/user.types';
import { QueryParams, PaginatedResponse } from '../types/common.types';
import { useToast } from './useToast';

export const useUsers = () => {
  const [data, setData] = useState<PaginatedResponse<User>>({ data: [], meta: { page: 1, limit: 10, totalItems: 0, totalPages: 0 } });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const fetchUsers = useCallback(async (params?: QueryParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await usersService.getAll(params);
      setData(res);
    } catch (err: any) {
      setError(err);
      showToast(err.message || 'Error al cargar usuarios', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      await usersService.delete(id);
      showToast('Usuario eliminado', 'success');
      await fetchUsers({ page: data.meta.page, limit: data.meta.limit });
    } catch (err: any) {
      showToast(err.message || 'Error al eliminar usuario', 'error');
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
    fetchUsers,
    deleteUser
  };
};
