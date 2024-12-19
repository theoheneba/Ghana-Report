import React from 'react';
import { Link } from 'react-router-dom';
import { GhanaCoatOfArms } from './ui/GhanaCoatOfArms';
import { Button } from './ui/Button';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title = 'Ghana Report', showBack = false, onBack }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center"
              >
                ← Back
              </Button>
            )}
            <Link to="/" className="flex items-center space-x-3">
              <GhanaCoatOfArms className="h-10 w-10" />
              <span className="text-xl font-bold text-gray-900">{title}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}