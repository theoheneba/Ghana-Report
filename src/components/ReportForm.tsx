import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileUpload } from './FileUpload';
import { CategorySelect } from './CategorySelect';
import { ProgressSteps } from './ProgressSteps';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { SuccessMessage } from './SuccessMessage';
import { useReportSubmission } from '../hooks/useReportSubmission';
import type { Report } from '../types/report';

const STEPS = ['Category', 'Details', 'Evidence', 'Review'];

const initialFormData: Report = {
  title: '',
  category: 'corruption',
  description: '',
  date: '',
  location: '',
  willing_to_testify: false,
  files: []
};

export function ReportForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Report>(initialFormData);
  const { submitReport, isSubmitting, reportId, reset } = useReportSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReport(formData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    reset();
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateFormData = (field: keyof Report, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (reportId) {
    return (
      <div className="max-w-md mx-auto">
        <SuccessMessage reportId={reportId} onReset={handleReset} />
        <div className="text-center mt-4">
          <Link 
            to="/status" 
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Check your report status →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
      <ProgressSteps currentStep={currentStep} steps={STEPS} />
      
      <Card className="p-6">
        <div className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Select Report Category</h3>
              <CategorySelect
                value={formData.category}
                onChange={(category) => updateFormData('category', category)}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
              <Input
                label="Report Title"
                required
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="Brief title describing the incident"
              />
              <Textarea
                label="Description"
                required
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Provide detailed information about what happened"
                rows={5}
              />
              <Input
                label="Location"
                required
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="Where did this occur?"
              />
              <Input
                type="date"
                label="Date of Incident"
                required
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Upload Evidence</h3>
              <p className="text-sm text-gray-600">
                Upload any supporting documents, images, or files that help verify your report.
              </p>
              <FileUpload
                files={formData.files}
                onChange={(files) => updateFormData('files', files)}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Review Your Report</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge>{formData.category}</Badge>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{formData.date}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Title</h4>
                  <p className="text-gray-700">{formData.title}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-gray-700">{formData.location}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                </div>
                {formData.files.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900">Evidence Files</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {formData.files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        
        {currentStep < STEPS.length - 1 ? (
          <Button
            type="button"
            onClick={handleNext}
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        )}
      </div>
    </form>
  );
}