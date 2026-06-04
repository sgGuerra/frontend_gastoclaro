"use client";

import React, { useEffect, useState } from 'react';
import { useSavings } from '../../src/hooks/useSavings';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { PrivateRoute } from '../../src/components/auth/PrivateRoute';
import { SavingTable } from '../../src/components/savings/SavingTable';
import { SavingForm } from '../../src/components/savings/SavingForm';
import { ConfirmModal } from '../../src/components/ui/ConfirmModal';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Spinner } from '../../src/components/ui/Spinner';
import { ErrorMessage } from '../../src/components/ui/ErrorMessage';
import { Pagination } from '../../src/components/ui/Pagination';
import { Saving } from '../../src/types/saving.types';
import { Button } from '../../src/components/ui/Button';
import { StatCard } from '../../src/components/dashboard/StatCard';

export default function SavingsPage() {
  const { data, meta, isLoading, error, fetchSavings, createSaving, updateSaving, deleteSaving } = useSavings();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingSaving, setEditingSaving] = useState<Saving | null>(null);
  const [savingToDelete, setSavingToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchSavings({ page: 1, limit: 10 });
  }, [fetchSavings]);

  const handlePageChange = (page: number) => {
    fetchSavings({ page, limit: meta.limit });
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingSaving) {
      await updateSaving(editingSaving.id, formData);
      setEditingSaving(null);
    } else {
      await createSaving(formData);
    }
    setIsFormOpen(false);
  };

  const confirmDelete = async () => {
    if (savingToDelete) {
      await deleteSaving(savingToDelete);
      setIsDeleteOpen(false);
      setSavingToDelete(null);
    }
  };

  // Calculate total savings shown on the page (for a quick stat)
  const totalSavings = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <PrivateRoute>
      <AppLayout>
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Ahorros</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Registra y monitorea el crecimiento de tus fondos y ahorros personales.
            </p>
          </div>
          <Button leftIcon="add" onClick={() => { setEditingSaving(null); setIsFormOpen(true); }}>
            Nuevo Ingreso a Ahorros
          </Button>
        </header>

        {data.length > 0 && (
          <div className="mb-8 w-full md:w-1/3">
            <StatCard 
              title="Ahorros en esta página" 
              amount={totalSavings} 
              icon="savings" 
              colorClass="bg-savings-emerald"
            />
          </div>
        )}

        {isLoading && data.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error.message} onRetry={() => fetchSavings({ page: meta.page, limit: meta.limit })} />
        ) : data.length === 0 ? (
          <EmptyState 
            icon="savings" 
            title="Sin ahorros registrados" 
            message="Comienza a registrar tus ahorros para construir un futuro financiero sólido."
            action={<Button onClick={() => { setEditingSaving(null); setIsFormOpen(true); }}>Registrar primer ahorro</Button>}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SavingTable 
              savings={data} 
              onEdit={(saving) => { setEditingSaving(saving); setIsFormOpen(true); }}
              onDelete={(id) => { setSavingToDelete(id); setIsDeleteOpen(true); }}
            />
            <Pagination 
              currentPage={meta.page} 
              totalPages={meta.totalPages} 
              totalItems={meta.totalItems}
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        <SavingForm 
          isOpen={isFormOpen} 
          onClose={() => { setIsFormOpen(false); setEditingSaving(null); }}
          onSubmit={handleFormSubmit}
          initialData={editingSaving}
          isLoading={isLoading}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setSavingToDelete(null); }}
          onConfirm={confirmDelete}
          title="¿Eliminar Registro de Ahorro?"
          message="Esta acción restará este monto de tu historial de ahorros permanentemente."
          confirmText="Sí, Eliminar"
          cancelText="Cancelar"
          isLoading={isLoading}
        />
      </AppLayout>
    </PrivateRoute>
  );
}
