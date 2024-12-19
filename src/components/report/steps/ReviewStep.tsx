import React from 'react';
import { Badge } from '../../ui/Badge';
import type { Report } from '../../../types/report';

interface ReviewStepProps {
  report: Report;
}

export function ReviewStep({ report }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Review Your Report</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Badge>{report.category}</Badge>
          <span className="text-gray-500">•</span>
          <span className="text-sm text-gray-600">{report.date}</span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Title</h4>
          <p className="text-gray-700">{report.title}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Location</h4>
          <p className="text-gray-700">{report.location}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Description</h4>
          <p className="text-gray-700 whitespace-pre-wrap">{report.description}</p>
        </div>
        {report.files.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">Evidence Files</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {report.files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}