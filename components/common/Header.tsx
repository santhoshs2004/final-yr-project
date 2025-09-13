
import React from 'react';
import type { UserProfile } from '../../types';

interface HeaderProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onLogout }) => {
  return (
    <header className="bg-bg-light shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l1.414 1.414m10.05 10.05l1.414 1.414M5.636 18.364l1.414-1.414m10.05-10.05l1.414-1.414"></path></svg>
          <h1 className="text-xl font-bold text-text-main">Career Navigator AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-text-secondary hidden sm:block">{userProfile.name}</span>
          <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center font-bold text-white">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>
          <button 
            onClick={onLogout} 
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary bg-bg-light border border-gray-600 rounded-md hover:bg-gray-700 hover:text-text-main transition-colors"
            aria-label="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;