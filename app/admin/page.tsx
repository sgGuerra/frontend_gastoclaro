"use client";

import React, { useEffect, useState } from 'react';
import { useUsers } from '../../src/hooks/useUsers';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { AdminRoute } from '../../src/components/auth/AdminRoute';
import { ConfirmModal } from '../../src/components/ui/ConfirmModal';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Spinner } from '../../src/components/ui/Spinner';
import { ErrorMessage } from '../../src/components/ui/ErrorMessage';
import { Pagination } from '../../src/components/ui/Pagination';
import { Badge } from '../../src/components/ui/Badge';
import { GlassCard } from '../../src/components/ui/GlassCard';

export default function AdminUsersPage() {
  const { data, meta, isLoading, error, fetchUsers, deleteUser } = useUsers();
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers({ page: 1, limit: 10 });
  }, [fetchUsers]);

  const handlePageChange = (page: number) => {
    fetchUsers({ page, limit: meta.limit });
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete);
      setIsDeleteOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <AdminRoute>
      <AppLayout>
        <header className="mb-12">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Administración de Usuarios</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Vista exclusiva para administradores. Gestiona el acceso y visualiza a todos los usuarios de la plataforma GastoClaro.
          </p>
        </header>

        {isLoading && data.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error.message} onRetry={() => fetchUsers({ page: meta.page, limit: meta.limit })} />
        ) : data.length === 0 ? (
          <EmptyState 
            icon="group" 
            title="Sin usuarios" 
            message="No hay usuarios registrados en la plataforma."
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GlassCard className="rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 p-6 border-b border-glass-border font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
                <div className="col-span-2 md:col-span-1">Nombre</div>
                <div className="hidden md:block">Correo</div>
                <div>Rol</div>
                <div className="text-right">Acciones</div>
              </div>
              
              <div className="divide-y divide-glass-border">
                {data.map((user) => (
                  <div key={user.id} className="grid grid-cols-4 p-6 items-center hover:bg-white/40 transition-colors group">
                    <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-title-md text-body-md font-bold truncate pr-2">{user.name}</p>
                        <p className="md:hidden font-label-sm text-xs text-on-surface-variant truncate pr-2">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block font-body-md text-body-md text-on-surface-variant truncate pr-2">
                      {user.email}
                    </div>
                    
                    <div className="flex items-center">
                      <Badge color={user.role === 'admin' ? 'purple' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="text-right flex items-center justify-end">
                      <div className="flex gap-2">
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => { setUserToDelete(user.id); setIsDeleteOpen(true); }} 
                            className="p-1 hover:text-error transition-colors text-on-surface-variant"
                            title="Eliminar usuario"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            <Pagination 
              currentPage={meta.page} 
              totalPages={meta.totalPages} 
              totalItems={meta.totalItems}
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setUserToDelete(null); }}
          onConfirm={confirmDelete}
          title="¿Eliminar Usuario?"
          message="Esta acción no se puede deshacer. Se eliminarán permanentemente el usuario y todos sus registros asociados (gastos, metas, etc)."
          confirmText="Sí, Eliminar Permanentemente"
          cancelText="Cancelar"
          isLoading={isLoading}
        />
      </AppLayout>
    </AdminRoute>
  );
}
