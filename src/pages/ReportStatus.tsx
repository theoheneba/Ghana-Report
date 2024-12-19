import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ReportLookup } from '../components/ReportLookup';
import { GhanaFlagLine } from '../components/ui/GhanaFlagLine';

export function ReportStatus() {
  return (
    <PageLayout 
      title="Report Status" 
      subtitle="Track your report's progress"
    >
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Check Your Report Status
          </h1>
          <div className="w-32 mx-auto mb-4">
            <GhanaFlagLine />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Enter your report ID to check its current status and any updates
          </p>
        </div>
        <ReportLookup />
      </div>
    </PageLayout>
  );
}