import React, { useState, useCallback } from 'react';
import { UserProfile, CareerRecommendation, AppState, View } from './types';
import Onboarding from './components/Onboarding';
import MainApplication from './components/MainApplication';
import HomePage from './components/HomePage';
import { analyzeResumeAndInterests, getSkillGapAnalysis, generateLearningPath, getFutureCareerOutlook, getJobRecommendations } from './services/geminiService';
import Loader from './components/common/Loader';

const initialState: Omit<AppState, 'view' | 'isLoading' | 'error' | 'userProfile' | 'completedLearningSteps'> = {
  recommendations: [],
  selectedCareer: null,
  skillGap: null,
  learningPath: null,
  futureOutlook: null,
  jobPostings: null,
  sources: null,
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    view: View.HOME,
    userProfile: null,
    ...initialState,
    isLoading: false,
    error: null,
    completedLearningSteps: [],
  });
  
  const handleStartOnboarding = () => {
    setAppState(prev => ({ ...prev, view: View.ONBOARDING }));
  };

  const handleOnboardingComplete = async (profile: UserProfile) => {
    setAppState(prev => ({ ...prev, userProfile: profile, isLoading: true, error: null }));
    try {
      const recommendations = await analyzeResumeAndInterests(profile);
      
      const simpleSkills = profile.resumeText.toLowerCase().match(/python|javascript|react|aws|java|sql|scrum|agile/g) || [];
      const uniqueSkills = [...new Set(simpleSkills)];
      const completeProfile = { ...profile, skills: uniqueSkills };

      const finalState = {
        userProfile: completeProfile,
        recommendations,
      };

      setAppState(prev => ({
        ...prev,
        ...finalState,
        view: View.DASHBOARD,
        isLoading: false,
      }));
    } catch (err) {
      console.error(err);
      setAppState(prev => ({ ...prev, isLoading: false, error: 'Failed to analyze profile. Please try again.' }));
    }
  };

  const handleSelectCareer = useCallback(async (career: CareerRecommendation) => {
    if (appState.selectedCareer?.jobTitle === career.jobTitle) return;

    const newState = {
      ...appState,
      selectedCareer: career, 
      isLoading: true, 
      error: null,
      skillGap: null,
      learningPath: null,
      futureOutlook: null,
      jobPostings: null,
      sources: null,
      completedLearningSteps: [],
    };
    setAppState(newState);
    
    if (!appState.userProfile) {
        setAppState(prev => ({ ...prev, isLoading: false, error: 'User profile is not available.' }));
        return;
    }

    try {
        const skillGapPromise = getSkillGapAnalysis(appState.userProfile.skills, career.jobTitle);
        const futureOutlookPromise = getFutureCareerOutlook(career.jobTitle);
        const jobRecsPromise = getJobRecommendations(career.jobTitle);

        const [skillGap, futureOutlook, jobRecs] = await Promise.all([skillGapPromise, futureOutlookPromise, jobRecsPromise]);
        
        const learningPath = await generateLearningPath(skillGap.missingSkills.map(s => s.skill));

        const careerDetailsState = {
            skillGap,
            learningPath,
            futureOutlook,
            jobPostings: jobRecs.postings,
            sources: jobRecs.sources,
            selectedCareer: career,
            completedLearningSteps: [],
        };
        
        setAppState(prev => ({
            ...prev,
            ...careerDetailsState,
            isLoading: false
        }));

    } catch (err) {
      console.error(err);
      setAppState(prev => ({ ...prev, isLoading: false, error: 'Failed to fetch career details.' }));
    }
  }, [appState.userProfile, appState.selectedCareer]);

  const handleBackToDashboard = () => {
    const resetState = { 
        selectedCareer: null, 
        skillGap: null, 
        learningPath: null, 
        futureOutlook: null, 
        jobPostings: null, 
        sources: null, 
        completedLearningSteps: [] 
    };
    setAppState(prev => ({ ...prev, ...resetState }));
  };

  const handleToggleStepCompletion = (stepIndex: number) => {
    const completed = appState.completedLearningSteps;
    const newCompleted = completed.includes(stepIndex)
        ? completed.filter(i => i !== stepIndex)
        : [...completed, stepIndex];
        
    setAppState(prev => ({ ...prev, completedLearningSteps: newCompleted }));
  };

  const handleLogout = () => {
    setAppState({
      view: View.HOME,
      userProfile: null,
      ...initialState,
      isLoading: false,
      error: null,
      completedLearningSteps: [],
    });
  };

  const renderContent = () => {
    if (appState.isLoading && appState.view !== View.HOME) {
        return <div className="flex justify-center items-center h-[80vh]"><Loader message="Analyzing..." /></div>;
    }

    switch (appState.view) {
      case View.HOME:
        return <HomePage onStart={handleStartOnboarding} />;
      case View.ONBOARDING:
        return <main className="container mx-auto p-4 md:p-8"><Onboarding onComplete={handleOnboardingComplete} isLoading={appState.isLoading} /></main>;
      case View.DASHBOARD:
        return (
          <MainApplication 
            appState={appState}
            onSelectCareer={handleSelectCareer}
            onBackToDashboard={handleBackToDashboard}
            onToggleStepCompletion={handleToggleStepCompletion}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage onStart={handleStartOnboarding} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark font-sans">
      {renderContent()}
    </div>
  );
};

export default App;