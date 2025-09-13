import React from 'react';
import type { JobPosting, Source } from '../../types';

interface JobPostingsProps {
  postings: JobPosting[];
  sources: Source[] | null;
}

const PlatformIcon: React.FC<{ platform: JobPosting['platform'] }> = ({ platform }) => {
    switch (platform.toLowerCase()) {
        case 'linkedin':
            return <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
        case 'indeed':
            return <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M416 32H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zM96 384H64V202.6h32zm20.3-209.5c0-11.3-9.2-20.5-20.5-20.5s-20.5 9.2-20.5 20.5 9.2 20.5 20.5 20.5 20.5-9.2 20.5-20.5zm223.4 209.5H304V283.4c0-24.5-19.9-44.4-44.4-44.4-24.5 0-44.4 19.9-44.4 44.4v100.6h-35.3V202.6h35.3v16.3c8.8-15.1 24.9-24.8 43.2-24.8 48.7 0 88.5 39.8 88.5 88.5z"/></svg>;
        case 'forage':
             return <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7v-2h4V7h2v4h4v2h-4v4h-2z"/></svg>;
        default:
            return <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/></svg>;
    }
}

const JobPostings: React.FC<JobPostingsProps> = ({ postings, sources }) => {
  return (
    <div className="p-6 bg-bg-light rounded-lg shadow-lg animate-slide-in-up" style={{ animationDelay: '300ms' }}>
      <h3 className="text-2xl font-bold mb-4">Live Job Opportunities</h3>
      <div className="space-y-4">
        {postings.map((post, index) => (
          <a
            key={index}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-brand-dark/30 rounded-lg hover:bg-brand-dark/60 transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-text-main group-hover:text-brand-light transition-colors">{post.title}</p>
                <p className="text-sm text-text-secondary">{post.company}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary capitalize">
                  <PlatformIcon platform={post.platform} />
                  <span>{post.platform}</span>
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-2">{post.description}</p>
          </a>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-xs text-text-secondary italic">
            Disclaimer: Job postings are aggregated by AI using Google Search and may not be exhaustive. Always verify on the source website.
        </p>
        {sources && sources.length > 0 && (
            <div className="mt-4">
                <h4 className="font-semibold text-text-secondary mb-2">Sources:</h4>
                <ul className="space-y-1">
                    {sources.map((source, index) => (
                        <li key={index}>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs text-brand-light hover:underline">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                <span>{source.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  );
};

export default JobPostings;