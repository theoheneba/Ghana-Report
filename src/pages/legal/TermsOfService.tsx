import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';

export function TermsOfService() {
  return (
    <PageLayout title="Terms of Service">
      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By using Ghana Report, you agree to these terms and conditions.</p>

        <h2>2. Use of Service</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate information</li>
          <li>Maintain confidentiality</li>
          <li>Use the platform responsibly</li>
        </ul>

        <h2>3. Reporting Guidelines</h2>
        <p>When submitting reports:</p>
        <ul>
          <li>Provide truthful information</li>
          <li>Include relevant details</li>
          <li>Maintain professional conduct</li>
        </ul>

        <h2>4. Prohibited Activities</h2>
        <p>Users must not:</p>
        <ul>
          <li>Submit false reports</li>
          <li>Harass or threaten others</li>
          <li>Violate any laws</li>
        </ul>
      </div>
    </PageLayout>
  );
}