import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { ASSETS } from '../../../constants/assets';

interface GhanaCoatOfArmsProps {
  className?: string;
}

export function GhanaCoatOfArms({ className }: GhanaCoatOfArmsProps) {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Shield className="h-full w-full text-ghana-yellow" />
      </div>
    );
  }

  return (
    <img 
      src={ASSETS.GHANA_COAT_OF_ARMS}
      alt="Ghana Coat of Arms"
      className={cn("object-contain", className)}
      onError={() => setError(true)}
      loading="eager"
      crossOrigin="anonymous"
    />
  );
}