import React from 'react';
import { AlertCircle, BadgeAlert, Ban, Building2, FileWarning, ShieldAlert, HelpCircle } from 'lucide-react';
import type { ReportCategory } from '../types/report';

interface CategorySelectProps {
  value: ReportCategory;
  onChange: (category: ReportCategory) => void;
}

const categories = [
  { id: 'corruption', label: 'Corruption', icon: ShieldAlert, color: 'blue' },
  { id: 'fraud', label: 'Fraud', icon: FileWarning, color: 'red' },
  { id: 'misconduct', label: 'Misconduct', icon: AlertCircle, color: 'yellow' },
  { id: 'harassment', label: 'Harassment', icon: Ban, color: 'purple' },
  { id: 'discrimination', label: 'Discrimination', icon: BadgeAlert, color: 'pink' },
  { id: 'environmental', label: 'Environmental', icon: Building2, color: 'green' },
  { id: 'other', label: 'Other', icon: HelpCircle, color: 'gray' },
] as const;

const getColorClasses = (color: string, isSelected: boolean) => {
  const baseClasses = 'transition-all duration-300 ease-in-out transform hover:scale-105';
  const colorMap = {
    blue: `${isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'hover:bg-blue-50 hover:border-blue-300'}`,
    red: `${isSelected ? 'bg-red-100 border-red-500 text-red-700' : 'hover:bg-red-50 hover:border-red-300'}`,
    yellow: `${isSelected ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'hover:bg-yellow-50 hover:border-yellow-300'}`,
    purple: `${isSelected ? 'bg-purple-100 border-purple-500 text-purple-700' : 'hover:bg-purple-50 hover:border-purple-300'}`,
    pink: `${isSelected ? 'bg-pink-100 border-pink-500 text-pink-700' : 'hover:bg-pink-50 hover:border-pink-300'}`,
    green: `${isSelected ? 'bg-green-100 border-green-500 text-green-700' : 'hover:bg-green-50 hover:border-green-300'}`,
    gray: `${isSelected ? 'bg-gray-100 border-gray-500 text-gray-700' : 'hover:bg-gray-50 hover:border-gray-300'}`,
  };
  return `${baseClasses} ${colorMap[color]}`;
};

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(({ id, label, icon: Icon, color }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id as ReportCategory)}
            className={`p-6 rounded-xl border-2 shadow-sm ${getColorClasses(color, isSelected)}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <Icon className={`w-8 h-8 ${isSelected ? 'animate-bounce' : ''}`} />
              <span className="text-sm font-medium">{label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}