import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AuthorBadgeProps {
  name: string;
  verified?: boolean;
  className?: string;
}

export function AuthorBadge({ name, verified = false, className }: AuthorBadgeProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="text-gray-900 dark:text-gray-100">{name}</span>
      {verified && (
        <CheckCircle className="w-4 h-4 text-ghana-yellow" />
      )}
    </div>
  );
}