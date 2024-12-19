import React from 'react';
import { CategoryStep } from './steps/CategoryStep';
import { DetailsStep } from './steps/DetailsStep';
import { EvidenceStep } from './steps/EvidenceStep';
import { ReviewStep } from './steps/ReviewStep';
import type { Report } from '../../types/report';

interface ReportFormStepsProps {
  currentStep: number;
  formData: Report;
  updateFormData: (field: keyof Report, value: any) => void;
}

export function ReportFormSteps({ currentStep, formData, updateFormData }: ReportFormStepsProps) {
  switch (currentStep) {
    case 0:
      return <CategoryStep value={formData.category} onChange={(value) => updateFormData('category', value)} />;
    case 1:
      return <DetailsStep formData={formData} onChange={updateFormData} />;
    case 2:
      return <EvidenceStep files={formData.files} onChange={(files) => updateFormData('files', files)} />;
    case 3:
      return <ReviewStep report={formData} />;
    default:
      return null;
  }
}