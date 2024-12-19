import React from 'react';
import { cn } from '../../utils/cn';
import { ASSETS } from '../../constants/assets';

interface GhanaCoatOfArmsProps {
  className?: string;
}

export function GhanaCoatOfArms({ className }: GhanaCoatOfArmsProps) {
  return (
    <img 
      src={ASSETS.GHANA_COAT_OF_ARMS}
      alt="Ghana Coat of Arms"
      className={cn('animate-fadeIn', className)}
      loading="eager"
      onError={(e) => {
        console.error('Failed to load Ghana Coat of Arms');
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}