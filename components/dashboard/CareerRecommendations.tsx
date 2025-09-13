import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { CareerRecommendation } from '../../types';

interface CareerRecommendationsProps {
  recommendations: CareerRecommendation[];
  onSelectCareer: (career: CareerRecommendation) => void;
}

const COLORS = ['#4f46e5', '#7c3aed', '#a5b4fc'];

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ recommendations, onSelectCareer }) => {
  if (recommendations.length === 0) {
    return <div className="text-center p-8 bg-bg-light rounded-lg">No recommendations available yet.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {recommendations.map((rec, index) => (
        <div 
          key={rec.jobTitle} 
          className="bg-bg-light rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-brand-primary/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-slide-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => onSelectCareer(rec)}
        >
          <div>
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-2xl font-bold text-text-main mb-2 flex-1">{rec.jobTitle}</h3>
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                <div className="relative w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ name: 'Match', value: rec.matchPercentage }, { name: 'Gap', value: 100 - rec.matchPercentage }]}
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill={COLORS[index % COLORS.length]} />
                        <Cell fill="#4b5563" />
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg sm:text-xl font-bold text-text-main">{rec.matchPercentage}%</p>
                    <p className="text-xs text-text-secondary -mt-1">Match</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-text-secondary mt-2 mb-4">{rec.reasoning}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-text-secondary mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {rec.requiredSkills.slice(0, 4).map(skill => (
                  <span key={skill} className="bg-brand-dark text-brand-light text-xs font-semibold px-2.5 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          <button className="w-full mt-auto text-center font-bold text-brand-light hover:text-white transition-colors">
            View Details &rarr;
          </button>
        </div>
      ))}
    </div>
  );
};

export default CareerRecommendations;