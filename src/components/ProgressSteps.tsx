import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 mb-4 sm:mb-0">
          <div className="relative flex flex-col items-center flex-1">
            <div className="relative w-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full">
                {index < steps.length - 1 && (
                  <div 
                    className={`h-1 transition-all duration-500 ${
                      index < currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} 
                  />
                )}
              </div>
              <div 
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                  transition-all duration-300 transform hover:scale-110
                  ${index < currentStep 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : index === currentStep 
                      ? 'border-blue-500 text-blue-500 animate-pulse' 
                      : 'border-gray-200 dark:border-gray-700 text-gray-400'}`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5 animate-bounce" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
            </div>
            <span className={`mt-3 text-sm font-medium text-center ${
              index <= currentStep ? 'text-blue-500' : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}