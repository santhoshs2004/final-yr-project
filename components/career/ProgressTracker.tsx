
import React from 'react';

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="p-6 bg-bg-light rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Learning Progress</h3>
        <p className="font-semibold text-text-secondary">
          {completed} / {total} Steps Completed
        </p>
      </div>
      <div className="w-full bg-brand-dark rounded-full h-4">
        <div 
          className="bg-gradient-to-r from-brand-secondary to-brand-primary h-4 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-right text-lg font-bold mt-1 text-brand-light">{percentage}%</p>
    </div>
  );
};

export default ProgressTracker;
