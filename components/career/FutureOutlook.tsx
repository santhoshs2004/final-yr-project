import React from 'react';
import type { FutureOutlook } from '../../types';

const FutureOutlookComponent: React.FC<{ outlook: FutureOutlook }> = ({ outlook }) => {
  
  const getDemandColor = (demand: string) => {
    if (demand.toLowerCase().includes('very high') || demand.toLowerCase().includes('high')) return 'text-green-400';
    if (demand.toLowerCase().includes('medium')) return 'text-yellow-400';
    if (demand.toLowerCase().includes('low')) return 'text-orange-400';
    if (demand.toLowerCase().includes('declining')) return 'text-red-500';
    return 'text-text-main';
  }

  return (
    <div className="p-6 bg-bg-light rounded-lg shadow-lg animate-slide-in-up" style={{animationDelay: '100ms'}}>
      <h3 className="text-2xl font-bold mb-4">5-Year Future Outlook</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-text-secondary">Demand Trend</h4>
          <p className={`text-lg font-bold ${getDemandColor(outlook.fiveYearDemand)}`}>Analysis</p>
          <p className="text-text-secondary text-sm mt-1">{outlook.fiveYearDemand}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-text-secondary mb-2">New Skills on the Rise</h4>
          <div className="space-y-2">
            {outlook.newSkillsOnTheRise.map(item => (
              <div key={item.skill}>
                <span className="bg-brand-dark text-brand-light text-xs font-semibold px-2.5 py-1 rounded-full">{item.skill}</span>
                <p className="text-xs text-text-secondary italic mt-1 ml-1">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 text-center">
            <div>
                 <h4 className="font-semibold text-text-secondary">Automation Risk</h4>
                 <p className={`text-3xl font-bold ${outlook.automationRisk.level === 'Low' ? 'text-green-400' : outlook.automationRisk.level === 'Medium' ? 'text-yellow-400' : 'text-red-500'}`}>{outlook.automationRisk.percentage}%</p>
                 <p className="text-sm text-text-secondary">{outlook.automationRisk.level} Risk</p>
            </div>
             <div>
                 <h4 className="font-semibold text-text-secondary">Salary Growth</h4>
                 <p className="text-3xl font-bold text-green-400">+{outlook.salaryTrend.growthPercentage}%</p>
                 <p className="text-sm text-text-secondary">Expected Growth</p>
            </div>
        </div>
        
        <div className='space-y-4'>
          <p className="text-sm text-text-secondary italic"><strong>Automation Analysis:</strong> "{outlook.automationRisk.commentary}"</p>
          <p className="text-sm text-text-secondary italic"><strong>Salary Analysis:</strong> "{outlook.salaryTrend.commentary}"</p>
        </div>

      </div>
    </div>
  );
};

export default FutureOutlookComponent;