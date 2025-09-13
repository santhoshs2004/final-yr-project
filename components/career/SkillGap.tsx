
import React from 'react';
import type { SkillGapAnalysis } from '../../types';

const SkillGap: React.FC<{ analysis: SkillGapAnalysis }> = ({ analysis }) => {
    const importanceColor = {
        High: 'bg-red-500',
        Medium: 'bg-yellow-500',
        Low: 'bg-blue-500',
    };

  return (
    <div className="p-6 bg-bg-light rounded-lg shadow-lg animate-slide-in-up">
      <h3 className="text-2xl font-bold mb-4">Skill Gap Analysis</h3>
      <p className="text-text-secondary mb-6">{analysis.summary}</p>
      <ul className="space-y-3">
        {analysis.missingSkills.map(({ skill, importance }) => (
          <li key={skill} className="flex items-center justify-between p-3 bg-brand-dark/30 rounded-md">
            <span className="font-medium">{skill}</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${importanceColor[importance]}`}>
              {importance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillGap;
