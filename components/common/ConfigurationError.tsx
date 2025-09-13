import React from 'react';

const ConfigurationError: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark p-4">
      <div className="w-full max-w-2xl p-8 bg-bg-light rounded-2xl shadow-2xl border-2 border-red-500">
        <div className="flex flex-col items-center text-center">
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <h1 className="text-3xl font-bold mt-4 text-red-400">Configuration Required</h1>
          <p className="text-text-secondary mt-2">
            This application requires a connection to a Firebase backend, but it has not been configured yet.
          </p>
        </div>
        <div className="mt-6 text-left">
          <p className="font-semibold text-text-main">To fix this, please follow these steps:</p>
          <ol className="list-decimal list-inside mt-2 space-y-2 text-text-secondary">
            <li>Create a project on the <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-light hover:underline">Firebase Console</a>.</li>
            <li>Enable **Authentication** (with Google provider) and **Firestore Database**.</li>
            <li>In the **Authentication** section, go to the **Settings** tab and add your application's domain to the **Authorized domains** list.</li>
            <li>Find your project's web app configuration in the Project Settings.</li>
            <li>Open this file in your editor: <code className="bg-brand-dark text-brand-light px-2 py-1 rounded">services/firebase.ts</code></li>
            <li>Replace the placeholder values in the <code className="bg-brand-dark text-brand-light px-1 py-0.5 rounded">firebaseConfig</code> object with your actual project credentials.</li>
          </ol>
        </div>
        <div className="mt-6 bg-brand-dark p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm text-gray-300">
            <code className="language-typescript">
{`// In services/firebase.ts

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // <-- REPLACE
  authDomain: "YOUR_AUTH_DOMAIN", // <-- REPLACE
  projectId: "YOUR_PROJECT_ID", // <-- REPLACE
  storageBucket: "YOUR_STORAGE_BUCKET", // <-- REPLACE
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // <-- REPLACE
  appId: "YOUR_APP_ID", // <-- REPLACE
  measurementId: "YOUR_MEASUREMENT_ID" // <-- REPLACE (optional)
};`}
            </code>
          </pre>
        </div>
        <p className="text-center text-xs text-text-secondary mt-6">
          After updating the configuration, please refresh the application.
        </p>
      </div>
    </div>
  );
};

export default ConfigurationError;