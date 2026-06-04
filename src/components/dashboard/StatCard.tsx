import React from 'react';
import { GlassCard } from '../ui/GlassCard';

interface StatCardProps {
  title: string;
  amount: number;
  icon: string;
  colorClass: string;
  trend?: { value: number; isPositive: boolean };
}

export const StatCard: React.FC<StatCardProps> = ({ title, amount, icon, colorClass, trend }) => {
  return (
    <GlassCard className="p-6" hoverEffect>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-full ${colorClass}/20 flex items-center justify-center text-${colorClass.replace('bg-', '')}`}>
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 font-label-sm text-sm ${trend.isPositive ? 'text-savings-emerald' : 'text-debts-coral'}`}>
            <span className="material-symbols-outlined text-[16px]">
              {trend.isPositive ? 'trending_up' : 'trending_down'}
            </span>
            {trend.value}%
          </div>
        )}
      </div>
      <div>
        <h3 className="font-label-sm text-sm text-on-surface-variant mb-1">{title}</h3>
        <p className="font-headline-lg text-headline-lg text-on-surface font-bold">
          ${amount.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </GlassCard>
  );
};
