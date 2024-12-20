import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-lg",
        "transition-all duration-300 hover:shadow-xl",
        "border border-gray-100 dark:border-gray-700",
        "text-gray-900 dark:text-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}