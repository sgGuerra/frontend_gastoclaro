"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { PrivateRoute } from '../../src/components/auth/PrivateRoute';
import { StatCard } from '../../src/components/dashboard/StatCard';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { useExpenses } from '../../src/hooks/useExpenses';
import { useGoals } from '../../src/hooks/useGoals';
import { useSavings } from '../../src/hooks/useSavings';
import { useDebts } from '../../src/hooks/useDebts';
import { Spinner } from '../../src/components/ui/Spinner';
import { Badge } from '../../src/components/ui/Badge';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: expenses, fetchExpenses, isLoading: isExpensesLoading } = useExpenses();
  const { data: goals, fetchGoals, isLoading: isGoalsLoading } = useGoals();
  const { data: savings, fetchSavings, isLoading: isSavingsLoading } = useSavings();
  const { data: debts, fetchDebts, isLoading: isDebtsLoading } = useDebts();

  useEffect(() => {
    fetchExpenses({ limit: 5 });
    fetchGoals({ limit: 3, status: 'active' });
    fetchSavings({ limit: 10 });
    fetchDebts({ limit: 10, status: 'active' });
  }, [fetchExpenses, fetchGoals, fetchSavings, fetchDebts]);

  const isLoading = isExpensesLoading || isGoalsLoading || isSavingsLoading || isDebtsLoading;

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSavings = savings.reduce((sum, s) => sum + s.amount, 0);
  const totalDebts = debts.reduce((sum, d) => sum + d.amount, 0);

  if (isLoading) {
    return (
      <PrivateRoute>
        <AppLayout>
          <div className="flex h-[80vh] items-center justify-center">
            <Spinner />
          </div>
        </AppLayout>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <AppLayout>
        <header className="mb-10">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Hola, <span className="text-primary">{user?.name?.split(' ')[0]}</span> 👋
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Aquí tienes el resumen de tu panorama financiero.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8 animate-in slide-in-from-bottom-4 duration-500">
          <StatCard 
            title="Gastos Totales" 
            amount={totalExpenses} 
            icon="payments" 
            colorClass="bg-expenses-blue"
          />
          <StatCard 
            title="Ahorros Acumulados" 
            amount={totalSavings} 
            icon="savings" 
            colorClass="bg-savings-emerald"
          />
          <StatCard 
            title="Deudas Activas" 
            amount={totalDebts} 
            icon="account_balance_wallet" 
            colorClass="bg-debts-coral"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Main Content Area: Recent Transactions */}
          <section className="lg:col-span-2 space-y-gutter animate-in slide-in-from-bottom-6 duration-700">
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-md text-title-md font-bold">Últimos Gastos</h3>
                <Link href="/expenses" className="text-primary font-bold hover:underline font-label-sm text-sm">
                  Ver todos
                </Link>
              </div>
              
              <div className="divide-y divide-glass-border">
                {expenses.length === 0 ? (
                  <p className="text-on-surface-variant py-4 text-center">No hay gastos recientes</p>
                ) : (
                  expenses.map(expense => (
                    <div key={expense.id} className="py-4 flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                            {expense.category === 'Alimentación' ? 'restaurant' : 
                             expense.category === 'Transporte' ? 'directions_car' : 'receipt_long'}
                          </span>
                        </div>
                        <div>
                          <p className="font-title-md text-body-md font-bold">{expense.description || expense.category}</p>
                          <p className="font-label-sm text-xs text-on-surface-variant">
                            {new Date(expense.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-title-md text-body-md font-bold text-debts-coral">
                          -${expense.amount.toLocaleString()}
                        </p>
                        <Badge color="gray" className="scale-75 origin-right">{expense.category}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </section>

          {/* Sidebar Area: Goals */}
          <section className="space-y-gutter animate-in slide-in-from-bottom-8 duration-1000">
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-md text-title-md font-bold">Tus Metas</h3>
                <Link href="/goals" className="text-primary font-bold hover:underline font-label-sm text-sm">
                  Gestionar
                </Link>
              </div>

              <div className="space-y-6">
                {goals.length === 0 ? (
                  <p className="text-on-surface-variant text-center">No tienes metas activas</p>
                ) : (
                  goals.map(goal => (
                    <div key={goal.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-title-md text-sm font-bold">{goal.title}</span>
                        <span className="font-label-sm text-xs text-on-surface-variant">
                          ${goal.current_amount} / ${goal.target_amount}
                        </span>
                      </div>
                      <ProgressBar 
                        progress={(goal.current_amount / goal.target_amount) * 100} 
                        color="bg-goals-purple"
                      />
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </section>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
