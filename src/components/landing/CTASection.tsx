import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function CTASection() {
  return (
    <div className="bg-yellow-500 dark:bg-yellow-600">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            Your report can help create a safer, more ethical workplace. Take the first step today.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white text-yellow-600 hover:bg-yellow-50 border-gray-900"
            to="/report"
          >
            <span className="inline-flex items-center">
              Submit a Report
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}