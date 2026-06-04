"use client";

import React, { useEffect, useState } from 'react';
import { useExpenses } from '../../src/hooks/useExpenses';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { PrivateRoute } from '../../src/components/auth/PrivateRoute';
import { ExpenseTable } from '../../src/components/expenses/ExpenseTable';
import { ExpenseForm } from '../../src/components/expenses/ExpenseForm';
import { ConfirmModal } from '../../src/components/ui/ConfirmModal';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Spinner } from '../../src/components/ui/Spinner';
import { ErrorMessage } from '../../src/components/ui/ErrorMessage';
import { Pagination } from '../../src/components/ui/Pagination';
import { Expense, CreateExpenseDto } from '../../src/types/expense.types';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';

export default function ExpensesPage() {
  const { data, meta, isLoading, error, fetchExpenses, createExpense, updateExpense, deleteExpense } = useExpenses();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchExpenses({ page: 1, limit: 10 });
  }, [fetchExpenses]);

  const handlePageChange = (page: number) => {
    fetchExpenses({ page, limit: meta.limit, category: filterCategory || undefined });
  };

  const handleSearch = () => {
    fetchExpenses({ page: 1, limit: meta.limit, category: filterCategory || undefined });
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, formData);
      setEditingExpense(null);
    } else {
      await createExpense(formData);
    }
    setIsFormOpen(false);
  };

  const confirmDelete = async () => {
    if (expenseToDelete) {
      await deleteExpense(expenseToDelete);
      setIsDeleteOpen(false);
      setExpenseToDelete(null);
    }
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Módulo de Gastos</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Gestiona tus salidas de dinero con precisión. Filtra por categoría, método de pago o fecha para tener una visión clara de tus finanzas.
            </p>
          </div>
          <Button leftIcon="add" onClick={() => { setEditingExpense(null); setIsFormOpen(true); }}>
            Nuevo Gasto
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-8">
          <div className="md:col-span-2 glass-card p-4 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">search</span>
            <input 
              type="text" 
              placeholder="Buscar por descripción..." 
              className="bg-transparent border-none focus:ring-0 w-full font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="glass-card p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-savings-emerald">filter_list</span>
              <select 
                className="bg-transparent font-body-md text-body-md outline-none"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  fetchExpenses({ page: 1, limit: meta.limit, category: e.target.value || undefined });
                }}
              >
                <option value="">Todas las categorías</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Transporte">Transporte</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Salud">Salud</option>
              </select>
            </div>
          </div>
        </section>

        {isLoading && data.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error.message} onRetry={() => fetchExpenses({ page: meta.page, limit: meta.limit })} />
        ) : data.length === 0 ? (
          <EmptyState 
            icon="receipt_long" 
            title="Sin gastos registrados" 
            message="Aún no has registrado ningún gasto. Haz clic en 'Nuevo Gasto' para comenzar a llevar el control de tu dinero."
            action={<Button onClick={() => { setEditingExpense(null); setIsFormOpen(true); }}>Crear primer gasto</Button>}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ExpenseTable 
              expenses={data} 
              onEdit={(expense) => { setEditingExpense(expense); setIsFormOpen(true); }}
              onDelete={(id) => { setExpenseToDelete(id); setIsDeleteOpen(true); }}
            />
            <Pagination 
              currentPage={meta.page} 
              totalPages={meta.totalPages} 
              totalItems={meta.totalItems}
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        <ExpenseForm 
          isOpen={isFormOpen} 
          onClose={() => { setIsFormOpen(false); setEditingExpense(null); }}
          onSubmit={handleFormSubmit}
          initialData={editingExpense}
          isLoading={isLoading}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setExpenseToDelete(null); }}
          onConfirm={confirmDelete}
          title="¿Confirmar Eliminación?"
          message="Esta acción no se puede deshacer. El registro del gasto se borrará permanentemente de tu historial."
          confirmText="Sí, Eliminar Gasto"
          cancelText="No, mantener"
          isLoading={isLoading}
        />
      </AppLayout>
    </PrivateRoute>
  );
}
