import React from 'react';
import type { LearningPath } from '../../types';

interface LearningPlanProps {
  path: LearningPath;
  completedSteps: number[];
  onToggleCompletion: (stepIndex: number) => void;
}

const LearningPlan: React.FC<LearningPlanProps> = ({ path, completedSteps, onToggleCompletion }) => {
  return (
    <div className="p-4 sm:p-6 bg-bg-light rounded-lg shadow-lg animate-slide-in-up" style={{animationDelay: '200ms'}}>
      <h3 className="text-2xl font-bold mb-2">Your Personalized Learning Path</h3>
      <p className="text-text-secondary mb-6">Estimated Time: <span className="font-bold text-brand-light">{path.estimatedTimeToCompletion}</span></p>
      
      <div className="relative border-l-2 border-brand-secondary/50 ml-2 pl-6 sm:ml-4 sm:pl-8 space-y-10">
        {path.path.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          return (
            <div key={index} className="relative">
              <div className={`absolute -left-[29px] sm:-left-[43px] top-1 w-8 h-8 rounded-full border-4 border-bg-light flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500' : 'bg-brand-primary'}`}>
                {isCompleted && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className='mb-2 sm:mb-0'>
                    <p className="text-sm font-semibold text-brand-light">{step.duration}</p>
                    <h4 className="text-xl font-bold mt-1">{step.title}</h4>
                </div>
                <label className="flex items-center cursor-pointer self-start">
                    <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={isCompleted}
                        onChange={() => onToggleCompletion(index)}
                    />
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCompleted ? 'bg-green-600/50 text-green-300' : 'bg-gray-600/50 text-text-secondary'}`}>
                        {isCompleted ? 'Completed' : 'Mark Done'}
                    </span>
                </label>
              </div>
              
              <div className="mt-3 space-y-4">
                {step.learningObjectives.map((obj, i) => (
                    <div key={i} className="p-3 bg-brand-dark/30 rounded-md">
                        <p className="text-text-main">{obj.description}</p>
                        <div className="mt-2 space-y-1">
                            {obj.courses.map((course, j) => (
                                <a href={course.url} target="_blank" rel="noopener noreferrer" key={j} className="flex items-center space-x-2 text-sm text-brand-light hover:text-white transition-colors group">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    <span className="group-hover:underline break-all">{course.title} on <span className="font-semibold">{course.platform}</span></span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-brand-dark/50 rounded-md border-l-4 border-brand-secondary">
                  <p className="font-semibold text-text-main">Project:</p>
                  <p className="text-text-secondary">{step.project}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default LearningPlan;