import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string; // Tailwind color class
  height?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'bg-primary',
  height = 'h-2',
  showLabel = false,
}) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full flex flex-col gap-1">
      {showLabel && (
        <div className="flex justify-between font-label-sm text-xs text-on-surface-variant">
          <span>Progreso</span>
          <span className="font-bold">{safeProgress.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-variant/50 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};
