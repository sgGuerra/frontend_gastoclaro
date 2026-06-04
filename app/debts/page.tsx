"use client";

import React, { useEffect, useState } from 'react';
import { useDebts } from '../../src/hooks/useDebts';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { PrivateRoute } from '../../src/components/auth/PrivateRoute';
import { DebtTable } from '../../src/components/debts/DebtTable';
import { DebtForm } from '../../src/components/debts/DebtForm';
import { ConfirmModal } from '../../src/components/ui/ConfirmModal';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Spinner } from '../../src/components/ui/Spinner';
import { ErrorMessage } from '../../src/components/ui/ErrorMessage';
import { Pagination } from '../../src/components/ui/Pagination';
import { Debt } from '../../src/types/debt.types';
import { Button } from '../../src/components/ui/Button';

export default function DebtsPage() {
  const { data, meta, isLoading, error, fetchDebts, createDebt, updateDebt, deleteDebt } = useDebts();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [debtToDelete, setDebtToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchDebts({ page: 1, limit: 10 });
  }, [fetchDebts]);

  const handlePageChange = (page: number) => {
    fetchDebts({ page, limit: meta.limit });
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingDebt) {
      await updateDebt(editingDebt.id, formData);
      setEditingDebt(null);
    } else {
      await createDebt(formData);
    }
    setIsFormOpen(false);
  };

  const confirmDelete = async () => {
    if (debtToDelete) {
      await deleteDebt(debtToDelete);
      setIsDeleteOpen(false);
      setDebtToDelete(null);
    }
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Deudas y Créditos</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Controla tus deudas activas, pagos mensuales y tasas de interés en un solo lugar.
            </p>
          </div>
          <Button leftIcon="add" onClick={() => { setEditingDebt(null); setIsFormOpen(true); }}>
            Nueva Deuda
          </Button>
        </header>

        {isLoading && data.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error.message} onRetry={() => fetchDebts({ page: meta.page, limit: meta.limit })} />
        ) : data.length === 0 ? (
          <EmptyState 
            icon="account_balance_wallet" 
            title="Sin deudas registradas" 
            message="Excelente, no tienes deudas pendientes. O puedes registrar una nueva para empezar a llevar su control."
            action={<Button onClick={() => { setEditingDebt(null); setIsFormOpen(true); }}>Registrar Deuda</Button>}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DebtTable 
              debts={data} 
              onEdit={(debt) => { setEditingDebt(debt); setIsFormOpen(true); }}
              onDelete={(id) => { setDebtToDelete(id); setIsDeleteOpen(true); }}
            />
            <Pagination 
              currentPage={meta.page} 
              totalPages={meta.totalPages} 
              totalItems={meta.totalItems}
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        <DebtForm 
          isOpen={isFormOpen} 
          onClose={() => { setIsFormOpen(false); setEditingDebt(null); }}
          onSubmit={handleFormSubmit}
          initialData={editingDebt}
          isLoading={isLoading}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setDebtToDelete(null); }}
          onConfirm={confirmDelete}
          title="¿Eliminar Registro de Deuda?"
          message="Esta acción no se puede deshacer y borrará permanentemente este registro de tu cuenta."
          confirmText="Sí, Eliminar Deuda"
          cancelText="No, mantener"
          isLoading={isLoading}
        />
      </AppLayout>
    </PrivateRoute>
  );
}
