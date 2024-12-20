import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';

export function DataPolicy() {
  return (
    <PageLayout title="Data Policy">
      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <h1>Data Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Data Collection</h2>
        <p>We collect and process data in accordance with GDPR and local regulations.</p>

        <h2>2. Data Storage</h2>
        <p>Your data is:</p>
        <ul>
          <li>Stored securely using encryption</li>
          <li>Processed within secure environments</li>
          <li>Retained only as long as necessary</li>
        </ul>

        <h2>3. Data Access</h2>
        <p>Access to report data is:</p>
        <ul>
          <li>Strictly controlled</li>
          <li>Limited to authorized personnel</li>
          <li>Logged and audited</li>
        </ul>

        <h2>4. Data Deletion</h2>
        <p>We implement:</p>
        <ul>
          <li>Automatic data retention policies</li>
          <li>Secure deletion procedures</li>
          <li>User data removal requests</li>
        </ul>
      </div>
    </PageLayout>
  );
}