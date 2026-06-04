import React from 'react';
import { Sidebar } from './Sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-margin-mobile md:p-margin-desktop min-h-screen">
        {children}
      </main>
    </div>
  );
};
