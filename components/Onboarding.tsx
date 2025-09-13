import React, { useState } from 'react';
import type { UserProfile, QuizAnswer } from '../types';
import Loader from './common/Loader';
import PersonalityQuiz from './onboarding/PersonalityQuiz';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  isLoading: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isLoading }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [leetcodeUrl, setLeetcodeUrl] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [interests, setInterests] = useState('');

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      setResumeText(''); // Clear text if a file is chosen
      alert('PDF upload is for demonstration. For this prototype, please also paste your resume text in the text area for the AI to analyze it.');
    }
  };
  
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(event.target.value);
    if(fileName) setFileName(''); // Clear file if text is typed
  }

  const handleSubmit = () => {
    const interestsArray = interests.split(',').map(i => i.trim()).filter(Boolean);
    onComplete({ name, resumeText, interests: interestsArray, skills: [], quizAnswers, githubUrl, leetcodeUrl });
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-[60vh]"><Loader message="Analyzing your profile with AI..." /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 md:p-8 bg-bg-light rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2">Create Your Profile</h2>
      <p className="text-center text-text-secondary mb-8">Let's get to know you to find your perfect career.</p>

      <div className="flex justify-center items-center mb-8 w-full px-4">
        {[1, 2, 3, 4, 5].map(s => (
          <React.Fragment key={s}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${step >= s ? 'bg-brand-primary' : 'bg-gray-600'}`}>
              {s}
            </div>
            {s < 5 && <div className={`flex-auto h-1 transition-colors duration-300 ${step > s ? 'bg-brand-primary' : 'bg-gray-600'}`}></div>}
          </React.Fragment>
        ))}
      </div>
      
      <div className="animate-slide-in-up">
        {step === 1 && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">What's your full name?</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Alex Doe" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="resume-file" className="block text-sm font-medium text-text-secondary mb-2">Upload Resume (PDF) or Paste Below</label>
            <input id="resume-file" type="file" accept=".pdf" onChange={handleFileChange} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-dark file:text-brand-light hover:file:bg-brand-primary mb-2"/>
            <div className="text-center my-2 text-text-secondary text-sm">OR</div>
            <textarea id="resume" rows={10} value={resumeText} onChange={handleTextChange} placeholder="Paste your full resume text here... The AI will analyze this text." className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-center mb-4">Code Profile Analysis (Optional)</h3>
            <p className="text-center text-text-secondary mb-6">Provide links to your coding profiles for a more accurate skill analysis.</p>
            <div className="space-y-4">
                <div>
                    <label htmlFor="github" className="block text-sm font-medium text-text-secondary mb-2">GitHub Profile URL</label>
                    <input id="github" type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/username" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
                </div>
                <div>
                    <label htmlFor="leetcode" className="block text-sm font-medium text-text-secondary mb-2">LeetCode Profile URL</label>
                    <input id="leetcode" type="url" value={leetcodeUrl} onChange={(e) => setLeetcodeUrl(e.target.value)} placeholder="https://leetcode.com/username" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
                </div>
            </div>
          </div>
        )}

        {step === 4 && ( 
            <div>
                <h3 className="text-xl font-bold text-center">Personality Quiz <span className="text-sm font-normal text-text-secondary">(Optional)</span></h3>
                <p className="text-center text-text-secondary mb-6">Helps us understand your work style better.</p>
                <PersonalityQuiz answers={quizAnswers} setAnswers={setQuizAnswers} />
            </div>
        )}

        {step === 5 && (
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-text-secondary mb-2">What are your professional interests? (comma-separated)</label>
            <input id="interests" type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., data analysis, creative design, project management" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} disabled={step === 1} className="px-6 py-2 border border-gray-600 rounded-md text-text-main hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Back
        </button>
        {step < 5 ? (
          <button onClick={handleNext} disabled={(step === 1 && !name) || (step === 2 && !resumeText && !fileName)} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={!interests} className="px-6 py-2 bg-brand-secondary text-white rounded-md hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed">
            Finish & Analyze
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;