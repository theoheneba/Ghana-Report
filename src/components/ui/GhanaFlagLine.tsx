import React from 'react';
import { Star } from 'lucide-react';

export function GhanaFlagLine() {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[3px] flex items-center">
      <div className="w-1/3 h-full bg-red-600" />
      <div className="w-1/3 h-full bg-yellow-400 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Star className="h-4 w-4 text-black fill-black" />
        </div>
      </div>
      <div className="w-1/3 h-full bg-green-600" />
    </div>
  );
}