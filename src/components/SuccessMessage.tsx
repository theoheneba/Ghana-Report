import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface SuccessMessageProps {
  reportId: string;
  onReset: () => void;
}

export function SuccessMessage({ reportId, onReset }: SuccessMessageProps) {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted Successfully</h2>
      <p className="text-gray-600 mb-6">
        Your report has been submitted anonymously. Please save this reference number:
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <p className="text-lg font-mono font-medium text-gray-900 select-all">{reportId}</p>
      </div>
      <Button
        onClick={onReset}
        className="w-full"
      >
        Submit Another Report
      </Button>
    </div>
  );
}