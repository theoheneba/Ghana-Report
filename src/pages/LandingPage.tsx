import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureSection } from '../components/landing/FeatureSection';
import { CTASection } from '../components/landing/CTASection';

export function LandingPage() {
  return (
    <PageLayout>
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </PageLayout>
  );
}