import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';

export function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect only the information necessary to process your reports and ensure the security of our platform:</p>
        <ul>
          <li>Report details and evidence you provide</li>
          <li>Anonymous usage statistics</li>
          <li>Technical data required for security</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information is used solely for:</p>
        <ul>
          <li>Processing and investigating reports</li>
          <li>Maintaining platform security</li>
          <li>Improving our services</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>We employ industry-standard security measures to protect your data:</p>
        <ul>
          <li>End-to-end encryption</li>
          <li>Secure data storage</li>
          <li>Regular security audits</li>
        </ul>

        <h2>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your data</li>
          <li>Request data deletion</li>
          <li>Withdraw consent</li>
        </ul>
      </div>
    </PageLayout>
  );
}