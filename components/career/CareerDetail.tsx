import React from 'react';
import type { CareerRecommendation, SkillGapAnalysis, LearningPath, FutureOutlook, JobPosting, Source } from '../../types';
import SkillGap from './SkillGap';
import LearningPlan from './LearningPlan';
import FutureOutlookComponent from './FutureOutlook';
import Loader from '../common/Loader';
import ProgressTracker from './ProgressTracker';
import JobPostings from './JobPostings';

interface CareerDetailProps {
  career: CareerRecommendation;
  skillGap: SkillGapAnalysis | null;
  learningPath: LearningPath | null;
  futureOutlook: FutureOutlook | null;
  jobPostings: JobPosting[] | null;
  sources: Source[] | null;
  isLoading: boolean;
  onBack: () => void;
  completedSteps: number[];
  onToggleStepCompletion: (stepIndex: number) => void;
}

const CareerDetail: React.FC<CareerDetailProps> = ({ career, skillGap, learningPath, futureOutlook, jobPostings, sources, isLoading, onBack, completedSteps, onToggleStepCompletion }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <button onClick={onBack} className="mb-4 text-brand-light hover:text-white transition-colors">&larr; Back to Recommendations</button>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{career.jobTitle}</h1>
        <p className="text-lg text-text-secondary mt-2">{career.reasoning}</p>
      </div>
      
      {learningPath && !isLoading && (
        <ProgressTracker 
            completed={completedSteps.length} 
            total={learningPath.path.length} 
        />
      )}

      {isLoading && <div className="flex justify-center"><Loader message={`Analyzing path to ${career.jobTitle}...`} /></div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {skillGap && !isLoading && <SkillGap analysis={skillGap} />}
          {futureOutlook && !isLoading && <FutureOutlookComponent outlook={futureOutlook} />}
          {jobPostings && !isLoading && <JobPostings postings={jobPostings} sources={sources} />}
        </div>
        <div>
          {learningPath && !isLoading && (
            <LearningPlan 
                path={learningPath} 
                completedSteps={completedSteps} 
                onToggleCompletion={onToggleStepCompletion}
            />
           )}
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;