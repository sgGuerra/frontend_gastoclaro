import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-surface-variant/80 backdrop-blur-md text-on-surface"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="material-symbols-outlined">
          {isSidebarOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="md:ml-64 flex-1 p-margin-mobile md:p-margin-desktop min-h-screen w-full pt-16 md:pt-margin-desktop">
        {children}
      </main>
    </div>
  );
};

