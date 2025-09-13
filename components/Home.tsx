import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  error: string | null;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignUp, error }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        await onSignUp(email, password, name);
      } else {
        await onLogin(email, password);
      }
    } catch (e) {
      // Error is handled by the parent component, which passes it back as a prop.
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center animate-fade-in p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-bg-light rounded-2xl shadow-2xl">
        <div className="text-center">
          <svg className="w-16 h-16 text-brand-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l1.414 1.414m10.05 10.05l1.414 1.414M5.636 18.364l1.414-1.414m10.05-10.05l1.414-1.414"></path></svg>
          <h1 className="text-4xl font-bold mt-4">Career Navigator AI</h1>
          <p className="text-text-secondary mt-2">{isSignUp ? 'Create an account to get started.' : 'Sign in to your account.'}</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Full Name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-brand-primary focus:border-brand-primary"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light focus:ring-offset-bg-dark transition-transform transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-text-secondary">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => { setIsSignUp(!isSignUp); setEmail(''); setPassword(''); setName('');}} className="font-medium text-brand-light hover:underline ml-1">
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;