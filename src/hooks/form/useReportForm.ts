import { useState } from 'react';
import type { Report } from '../../types/report';

const initialFormData: Report = {
  title: '',
  category: 'corruption',
  description: '',
  date: '',
  location: '',
  willing_to_testify: false,
  files: []
};

export function useReportForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Report>(initialFormData);

  const updateFormData = (field: keyof Report, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    previousStep,
    reset
  };
}