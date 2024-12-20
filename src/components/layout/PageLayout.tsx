import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { GhanaCoatOfArms } from '../ui/ghana/GhanaCoatOfArms';
import { HeaderStrip } from '../ui/ghana/HeaderStrip';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <GhanaCoatOfArms className="h-10 w-10" />
              <div className="flex flex-col space-y-1">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Ghana Report
                </span>
                <HeaderStrip className="w-full" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Secure Anonymous Reporting
                </p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                Blog
              </Link>
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <Link to="/status">Check Status</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/report">Submit Report</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {(title || subtitle) && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}