import React from 'react';

interface HomePageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: JSX.Element; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-bg-light p-6 rounded-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="flex justify-center items-center mb-4 text-brand-primary">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-text-main">{title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
            <svg className="w-16 h-16 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l1.414 1.414m10.05 10.05l1.414 1.414M5.636 18.364l1.414-1.414m10.05-10.05l1.414-1.414"></path></svg>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main">Career Navigator AI</h1>
        </div>
        <p className="text-lg sm:text-xl text-text-secondary mt-4 max-w-2xl mx-auto">
          Your personal guide to a fulfilling career. Analyze your skills, discover new paths, and build a roadmap to success with the power of AI.
        </p>

        <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h.01M4.88 15.12A10 10 0 1115.12 4.88 10 10 0 014.88 15.12z" /></svg>}
                title="AI-Powered Recommendations"
                description="Our AI analyzes your unique profile to suggest careers where you'll thrive and find satisfaction."
            />
            <FeatureCard 
                icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4l6 3.106A1 1 0 0116 8v8.382a1 1 0 01-.553.894L9 20z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4v16" /></svg>}
                title="Personalized Learning Paths"
                description="Get a custom, step-by-step roadmap with courses and projects to bridge your skill gaps for any role."
            />
            <FeatureCard 
                icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                title="Future Career Outlook"
                description="Look ahead with AI-driven insights on future demand, automation risks, and salary trends for your career."
            />
        </div>

        <button
          onClick={onStart}
          className="px-8 py-4 text-lg font-bold rounded-lg text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-light focus:ring-offset-2 focus:ring-offset-bg-dark"
        >
          Create Your Profile & Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;