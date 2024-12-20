```typescript
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ASSETS } from '../../constants/assets';
import { useImagePreload } from '../../hooks/useImagePreload';

interface GhanaCoatOfArmsProps {
  className?: string;
}

export function GhanaCoatOfArms({ className }: GhanaCoatOfArmsProps) {
  const { isLoaded, error } = useImagePreload(ASSETS.GHANA_COAT_OF_ARMS);

  if (!isLoaded || error) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Shield className="h-full w-full text-yellow-500" />
      </div>
    );
  }

  return (
    <img 
      src={ASSETS.GHANA_COAT_OF_ARMS}
      alt="Ghana Coat of Arms"
      className={cn("animate-fadeIn", className)}
      loading="eager"
      crossOrigin="anonymous"
    />
  );
}
```