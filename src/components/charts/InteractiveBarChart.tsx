import React, { useState } from 'react';
import { FadeIn } from '../animations/FadeIn';

interface ChartData {
  category: string;
  count: number;
}

interface InteractiveBarChartProps {
  data: ChartData[];
  title: string;
}

export function InteractiveBarChart({ data, title }: InteractiveBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(item => item.count));

  return (
    <FadeIn>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-200">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div 
              key={item.category} 
              className="space-y-2"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{item.category}</span>
                <span className="text-gray-900 dark:text-gray-100">{item.count}</span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    activeIndex === index 
                      ? 'bg-ghana-green dark:bg-ghana-green/90' 
                      : 'bg-ghana-yellow dark:bg-ghana-yellow/90'
                  }`}
                  style={{ width: `${(item.count / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}