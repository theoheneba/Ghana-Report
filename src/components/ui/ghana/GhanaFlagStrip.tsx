import React from 'react';
import { cn } from '../../../utils/cn';
import { BlackStar } from './BlackStar';
import { ASSETS } from '../../../constants/assets';

interface GhanaFlagStripProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showStar?: boolean;
}

const stripHeights = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

export function GhanaFlagStrip({ className, size = 'md', showStar = true }: GhanaFlagStripProps) {
  return (
    <div className={cn('relative w-full flex', stripHeights[size], className)}>
      <div className="w-1/3 bg-ghana-red" />
      <div className="w-1/3 bg-ghana-yellow relative">
        {showStar && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BlackStar size={size} />
          </div>
        )}
      </div>
      <div className="w-1/3 bg-ghana-green" />
    </div>
  );
}