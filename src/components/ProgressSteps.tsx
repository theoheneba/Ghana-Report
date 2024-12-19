import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between mt-8 mb-6 px-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 mb-4 sm:mb-0">
          <div className="relative flex flex-col items-center flex-1">
            <div className="relative w-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full">
                {index < steps.length - 1 && (
                  <div 
                    className={`h-[2px] transition-all duration-500 ${
                      index < currentStep 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} 
                  />
                )}
              </div>
              <div 
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 
                  transition-all duration-300 transform hover:scale-110
                  ${index < currentStep 
                    ? 'border-yellow-500 bg-yellow-500 text-white' 
                    : index === currentStep 
                      ? 'border-yellow-500 text-yellow-500 animate-pulse' 
                      : 'border-gray-200 dark:border-gray-700 text-gray-400'}`}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4 animate-bounce" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
            </div>
            <span className={`mt-2 text-xs font-medium text-center ${
              index <= currentStep ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}