import React from 'react';

interface GhanaCoatOfArmsProps {
  className?: string;
}

export function GhanaCoatOfArms({ className = '' }: GhanaCoatOfArmsProps) {
  return (
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/5/59/Coat_of_arms_of_Ghana.svg"
      alt="Ghana Coat of Arms"
      className={className}
    />
  );
}