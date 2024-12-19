import React from 'react';
import { FileUpload } from '../../FileUpload';

interface EvidenceStepProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export function EvidenceStep({ files, onChange }: EvidenceStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Upload Evidence</h3>
      <p className="text-sm text-gray-600">
        Upload any supporting documents, images, or files that help verify your report.
      </p>
      <FileUpload files={files} onChange={onChange} />
    </div>
  );
}