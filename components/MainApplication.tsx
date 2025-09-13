import React from 'react';
import Header from './common/Header';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';
import type { AppState, CareerRecommendation } from '../types';

interface MainApplicationProps {
  appState: AppState;
  onSelectCareer: (career: CareerRecommendation) => void;
  onBackToDashboard: () => void;
  onToggleStepCompletion: (stepIndex: number) => void;
  onLogout: () => void;
}

const MainApplication: React.FC<MainApplicationProps> = ({
  appState,
  onSelectCareer,
  onBackToDashboard,
  onToggleStepCompletion,
  onLogout,
}) => {
  // A user must have a profile to see the main application.
  // This serves as a safeguard.
  if (!appState.userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-red-500">
          Error: Could not load user profile. Please try refreshing the page.
        </div>
      </div>
    );
  }

  return (
    <>
      <Header userProfile={appState.userProfile} onLogout={onLogout} />
      <main className="container mx-auto p-4 md:p-8">
        <Dashboard
          appState={appState}
          onSelectCareer={onSelectCareer}
          onBack={onBackToDashboard}
          onToggleStepCompletion={onToggleStepCompletion}
        />
      </main>
      <Chatbot appState={appState} />
    </>
  );
};

export default MainApplication;