import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  return (
    <FadeIn>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-200">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">{title}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} onMouseMove={(data) => setActiveIndex(data.activeTooltipIndex)}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis 
                dataKey="category" 
                className="text-gray-600 dark:text-gray-300"
              />
              <YAxis className="text-gray-600 dark:text-gray-300" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar
                dataKey="count"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                className="transition-all duration-200"
                opacity={activeIndex === null ? 1 : 0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </FadeIn>
  );
}