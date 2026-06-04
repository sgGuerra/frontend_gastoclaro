import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
      {totalItems !== undefined && (
        <span className="font-body-md text-sm text-on-surface-variant">
          Página {currentPage} de {totalPages} ({totalItems} registros)
        </span>
      )}
      
      <div className="flex gap-2">
        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center border border-glass-border hover:bg-white/50 disabled:opacity-50 transition-colors"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        {/* Simple pagination: show current, prev, next if available */}
        {currentPage > 2 && <button className="w-10 h-10 rounded-full border border-glass-border hover:bg-white/50 hidden sm:flex items-center justify-center" onClick={() => onPageChange(1)}>1</button>}
        {currentPage > 3 && <span className="w-10 h-10 hidden sm:flex items-center justify-center text-outline">...</span>}
        
        {currentPage > 1 && (
          <button className="w-10 h-10 rounded-full border border-glass-border hover:bg-white/50 flex items-center justify-center" onClick={() => onPageChange(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}
        
        <button className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold shadow-lg flex items-center justify-center">
          {currentPage}
        </button>
        
        {currentPage < totalPages && (
          <button className="w-10 h-10 rounded-full border border-glass-border hover:bg-white/50 flex items-center justify-center" onClick={() => onPageChange(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}

        {currentPage < totalPages - 2 && <span className="w-10 h-10 hidden sm:flex items-center justify-center text-outline">...</span>}
        {currentPage < totalPages - 1 && <button className="w-10 h-10 rounded-full border border-glass-border hover:bg-white/50 hidden sm:flex items-center justify-center" onClick={() => onPageChange(totalPages)}>{totalPages}</button>}

        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center border border-glass-border hover:bg-white/50 disabled:opacity-50 transition-colors"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
