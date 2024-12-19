import React from 'react';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import type { Report } from '../../../types/report';

interface DetailsStepProps {
  formData: Report;
  onChange: (field: keyof Report, value: any) => void;
}

export function DetailsStep({ formData, onChange }: DetailsStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
      <Input
        label="Report Title"
        required
        value={formData.title}
        onChange={(e) => onChange('title', e.target.value)}
        placeholder="Brief title describing the incident"
      />
      <Textarea
        label="Description"
        required
        value={formData.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Provide detailed information about what happened"
        rows={5}
      />
      <Input
        label="Location"
        required
        value={formData.location}
        onChange={(e) => onChange('location', e.target.value)}
        placeholder="Where did this occur?"
      />
      <Input
        type="date"
        label="Date of Incident"
        required
        value={formData.date}
        onChange={(e) => onChange('date', e.target.value)}
      />
    </div>
  );
}