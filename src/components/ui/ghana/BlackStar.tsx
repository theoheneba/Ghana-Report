import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface BlackStarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BlackStar({ className, size = 'md' }: BlackStarProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <Star 
      className={cn(
        'text-black fill-current transform -rotate-12',
        sizeClasses[size],
        className
      )}
      strokeWidth={3}
    />
  );
}