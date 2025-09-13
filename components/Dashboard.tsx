import React from 'react';
import type { AppState, CareerRecommendation } from '../types';
import CareerRecommendations from './dashboard/CareerRecommendations';
import CareerDetail from './career/CareerDetail';
import Loader from './common/Loader';

interface DashboardProps {
  appState: AppState;
  onSelectCareer: (career: CareerRecommendation) => void;
  onBack: () => void;
  onToggleStepCompletion: (stepIndex: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ appState, onSelectCareer, onBack, onToggleStepCompletion }) => {

  if (!appState.userProfile) {
    return <div className="text-center text-red-500">Error: User profile not found.</div>;
  }

  if (appState.isLoading && !appState.selectedCareer) {
    return <Loader message="Analyzing your profile..." />;
  }
  
  if (appState.error) {
    return <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-md">{appState.error}</div>;
  }

  return (
    <div className="animate-fade-in">
      {appState.selectedCareer ? (
        <CareerDetail
          career={appState.selectedCareer}
          skillGap={appState.skillGap}
          learningPath={appState.learningPath}
          futureOutlook={appState.futureOutlook}
          jobPostings={appState.jobPostings}
          sources={appState.sources}
          isLoading={appState.isLoading}
          onBack={onBack}
          completedSteps={appState.completedLearningSteps}
          onToggleStepCompletion={onToggleStepCompletion}
        />
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {appState.userProfile.name}!</h1>
          <p className="text-lg text-text-secondary mb-8">Here are your personalized AI-powered career recommendations.</p>
          <CareerRecommendations recommendations={appState.recommendations} onSelectCareer={onSelectCareer} />
        </>
      )}
    </div>
  );
};

export default Dashboard;