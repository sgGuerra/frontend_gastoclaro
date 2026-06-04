import React from 'react';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className="floating-blob bg-primary top-[-10%] left-[-10%]"></div>
      <div className="floating-blob bg-secondary-container bottom-[-10%] right-[-10%]" style={{ animationDelay: '-5s' }}></div>
      <div className="floating-blob bg-goals-purple top-[40%] right-[15%] w-[300px] h-[300px]" style={{ animationDelay: '-10s' }}></div>
      
      <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-gutter items-center z-10">
        {/* Left Side: Branding & Value Prop */}
        <div className="hidden md:flex flex-col justify-center space-y-unit">
          <div className="flex items-center space-x-2 mb-gutter">
            <span className="material-symbols-outlined text-primary text-4xl font-variation-fill">account_balance_wallet</span>
            <span className="font-title-md text-title-md font-bold text-primary tracking-tight">GastoClaro</span>
          </div>
          
          <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
            Claridad financiera, <br />
            <span className="text-primary">sin complicaciones.</span>
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mt-4">
            Únete a la nueva era de la gestión de gastos personal. Monitorea, ahorra y alcanza tus metas con nuestro copiloto inteligente.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="glass-card p-4 rounded-xl flex items-center space-x-3">
              <span className="material-symbols-outlined text-savings-emerald">shield_with_heart</span>
              <span className="font-label-sm text-label-sm text-on-surface">100% Seguro</span>
            </div>
            <div className="glass-card p-4 rounded-xl flex items-center space-x-3">
              <span className="material-symbols-outlined text-secondary">insights</span>
              <span className="font-label-sm text-label-sm text-on-surface">Análisis IA</span>
            </div>
          </div>
        </div>
        
        {/* Right Side: Auth Card */}
        <div className="relative w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
};
