import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { sm: 1, md: 2, lg: 4 }, 
  gap = 'gap-6' 
}: ResponsiveGridProps) {
  const getGridCols = () => {
    return `grid grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg}`;
  };

  return (
    <div className={`${getGridCols()} ${gap}`}>
      {children}
    </div>
  );
}