import React from 'react';
import { CategorySelect } from '../../CategorySelect';
import type { ReportCategory } from '../../../types/report';

interface CategoryStepProps {
  value: ReportCategory;
  onChange: (category: ReportCategory) => void;
}

export function CategoryStep({ value, onChange }: CategoryStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Report Category</h3>
      <CategorySelect value={value} onChange={onChange} />
    </div>
  );
}