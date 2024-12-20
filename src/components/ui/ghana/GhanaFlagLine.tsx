import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { ASSETS } from '../../../constants/assets';

interface GhanaFlagLineProps {
  className?: string;
  variant?: 'default' | 'thin';
  showStar?: boolean;
}

export function GhanaFlagLine({ 
  className, 
  variant = 'default',
  showStar = true 
}: GhanaFlagLineProps) {
  const height = variant === 'thin' ? 'h-[5px]' : 'h-3';
  
  return (
    <div className={cn("relative w-full", height, className)}>
      <div className="absolute inset-0 flex">
        <div className="w-1/3 bg-ghana-red" />
        <div className="w-1/3 bg-ghana-yellow relative">
          {showStar && variant === 'default' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Star 
                className="w-2.5 h-2.5 text-black fill-current transform -rotate-12" 
                strokeWidth={3}
              />
            </div>
          )}
        </div>
        <div className="w-1/3 bg-ghana-green" />
      </div>
    </div>
  );
}