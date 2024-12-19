import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded flex items-start space-x-3">
      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
}