import React from 'react';
import { Lock, Shield, Eye, Clock, FileCheck, UserCheck } from 'lucide-react';
import { GhanaFlagLine } from '../ui/ghana';

const features = [
  {
    icon: Lock,
    title: 'Anonymous Reporting',
    description: 'Submit reports without revealing your identity. Your privacy is our top priority.'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'End-to-end encryption and secure data handling to protect sensitive information.'
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Track the status of your report and receive updates on investigations.'
  },
  {
    icon: FileCheck,
    title: 'Evidence Upload',
    description: 'Securely upload supporting documents and evidence with your report.'
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    description: 'Clear and documented handling procedures for all reported cases.'
  },
  {
    icon: UserCheck,
    title: 'Protected Identity',
    description: 'Advanced measures to ensure whistleblower protection and confidentiality.'
  }
];

export function FeatureSection() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <GhanaFlagLine className="mb-16" />
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We provide the tools and protection you need to report concerns safely.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="h-8 w-8 text-ghana-yellow dark:text-ghana-yellow/90 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}