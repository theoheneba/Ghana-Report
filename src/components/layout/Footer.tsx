import React from 'react';
import { Link } from 'react-router-dom';
import { GhanaFlagLine } from '../ui/ghana/GhanaFlagLine';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Ghana Report provides a secure platform for anonymous reporting of workplace misconduct and ethical concerns.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/report" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  Submit Report
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  Check Status
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/data-policy" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  Data Policy
                </Link>
              </li>
              <li>
                <Link to="/consent" className="text-gray-600 dark:text-gray-300 hover:text-ghana-yellow">
                  User Consent
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">
              For general inquiries, please contact our support team.
            </p>
          </div>
        </div>
        
        <GhanaFlagLine className="my-8" />
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Ghana Report. All rights reserved.</p>
          <p className="mt-1">A secure platform for anonymous reporting and whistleblowing.</p>
        </div>
      </div>
    </footer>
  );
}