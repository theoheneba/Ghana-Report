import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-2 border-blue-300 animate-spin" style={{ animationDuration: '1.5s' }}></div>
      </div>
    </div>
  );
}