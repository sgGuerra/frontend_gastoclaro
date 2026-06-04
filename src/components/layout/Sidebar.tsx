import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { href: '/expenses', label: 'Gastos', icon: 'payments' },
    { href: '/debts', label: 'Deudas', icon: 'account_balance_wallet' },
    { href: '/savings', label: 'Ahorros', icon: 'savings' },
    { href: '/goals', label: 'Metas', icon: 'target' },
  ];

  if (isAdmin) {
    links.push({ href: '/admin', label: 'Usuarios', icon: 'group' });
  }

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 backdrop-blur-xl bg-glass-bg border-r border-glass-border shadow-xl flex flex-col p-gutter z-40">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="font-title-md text-title-md font-bold text-primary">GastoClaro</h1>
        <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Personal Copilot</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 p-3 transition-all duration-200 active:scale-95 rounded-r-lg ${
                isActive
                  ? 'bg-primary/10 text-primary border-r-4 border-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-body-md text-body-md">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-gutter border-t border-glass-border flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-label-sm text-label-sm font-bold truncate">{user?.name}</span>
            <span className="font-label-sm text-label-sm opacity-60 truncate">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-error hover:bg-error/10 p-2 rounded-lg transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
