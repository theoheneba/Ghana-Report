import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface HeaderStripProps {
  className?: string;
}

export function HeaderStrip({ className }: HeaderStripProps) {
  return (
    <div className={cn("relative h-[3px] w-full flex", className)}>
      <div className="w-1/3 h-full bg-ghana-red" />
      <div className="w-1/3 h-full bg-ghana-yellow relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Star 
            className="w-2.5 h-2.5 text-black fill-current transform -rotate-12" 
            strokeWidth={3}
          />
        </div>
      </div>
      <div className="w-1/3 h-full bg-ghana-green" />
    </div>
  );
}