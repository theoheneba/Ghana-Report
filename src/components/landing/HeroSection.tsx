import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { GhanaCoatOfArms } from '../ui/GhanaCoatOfArms';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <GhanaCoatOfArms className="h-24 w-24" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Ghana Report
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A secure platform for reporting workplace misconduct, fraud, and ethical concerns. Your voice matters, your identity is protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
            >
              <Link to="/report">Submit a Report</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link to="/status">Check Report Status</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}