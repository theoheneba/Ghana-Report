import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';

export function UserConsent() {
  return (
    <PageLayout title="User Consent">
      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <h1>User Consent Agreement</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Consent to Data Processing</h2>
        <p>By using Ghana Report, you consent to:</p>
        <ul>
          <li>Collection of report information</li>
          <li>Processing of submitted data</li>
          <li>Storage of necessary information</li>
        </ul>

        <h2>2. Understanding Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your data</li>
          <li>Request data deletion</li>
          <li>Withdraw consent</li>
        </ul>

        <h2>3. Data Usage</h2>
        <p>Your data will be used for:</p>
        <ul>
          <li>Report processing</li>
          <li>Investigation purposes</li>
          <li>Platform improvement</li>
        </ul>

        <h2>4. Consent Withdrawal</h2>
        <p>You may withdraw consent by:</p>
        <ul>
          <li>Contacting our support team</li>
          <li>Requesting data deletion</li>
          <li>Closing your account</li>
        </ul>
      </div>
    </PageLayout>
  );
}