import React, { useState, useCallback, useEffect } from 'react';
import type { UserProfile, PathwayStep } from '../types';
import { RECOMMENDED_PATHWAYS } from '../constants';
import { getCareerDetails } from '../services/geminiService';
import { UserCircle, BookOpen, Briefcase, CheckCircle2, Loader, X, AlertTriangle } from './Icons';

interface DashboardProps {
  userProfile: UserProfile;
}

const CareerDetailsModal: React.FC<{ programName: string; onClose: () => void }> = ({ programName, onClose }) => {
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await getCareerDetails(programName);
      if (result.startsWith("Could not load")) {
        setIsError(true);
      }
      setDetails(result);
    } catch (error) {
      setIsError(true);
      setDetails("Could not load career details at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [programName]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const formatDetails = (text: string) => {
      return text
          .split('\n')
          .map((line, index) => {
              if (line.startsWith('**')) {
                  return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-indigo-600">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.startsWith('- ')) {
                  return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
              }
              return <p key={index} className="mb-2">{line}</p>;
          });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 id="modal-title" className="text-xl font-bold text-slate-900">{programName}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900" aria-label="Close modal">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader className="h-8 w-8 text-indigo-500" />
              <p className="mt-4 text-slate-500">Fetching career insights...</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertTriangle className="h-10 w-10 text-red-500" />
                <h3 className="mt-4 text-lg font-semibold text-slate-800">Error Fetching Details</h3>
                <p className="mt-2 text-slate-500">{details}</p>
            </div>
          ) : (
            <div className="text-slate-600 prose prose-p:text-slate-600">
                {formatDetails(details)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgressCircle: React.FC<{ progress: number; size?: number }> = ({ progress, size = 100 }) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            <circle
                className="text-slate-200"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="text-indigo-500"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
             <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                className="text-xl font-bold fill-current text-slate-800 transform rotate-90"
                transform-origin="center"
            >
                {`${Math.round(progress)}%`}
            </text>
        </svg>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const [pathways, setPathways] = useState<PathwayStep[]>(RECOMMENDED_PATHWAYS);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const toggleComplete = (step: number) => {
    setPathways(
      pathways.map(p => (p.step === step ? { ...p, completed: !p.completed } : p))
    );
  };
  
  const completedSteps = pathways.filter(p => p.completed).length;
  const totalSteps = pathways.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {selectedProgram && <CareerDetailsModal programName={selectedProgram} onClose={() => setSelectedProgram(null)} />}
      
      {/* Sidebar */}
      <aside className="lg:w-1/3 xl:w-1/4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24 shadow-sm">
          <div className="flex items-center mb-4">
            <UserCircle className="h-12 w-12 text-indigo-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{userProfile.name}</h2>
              <p className="text-sm text-slate-600">{userProfile.education} ({userProfile.stream})</p>
            </div>
          </div>
          
           <div className="my-6">
            <h3 className="font-semibold text-slate-700 mb-3 text-center">Pathway Progress</h3>
            <div className="flex justify-center">
                <ProgressCircle progress={progress} />
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2 flex items-center"><BookOpen className="h-4 w-4 mr-2" />Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map(skill => (
                  <span key={skill} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-xs font-medium">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-2 flex items-center"><Briefcase className="h-4 w-4 mr-2" />Aspirations</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.aspirations.map(asp => (
                  <span key={asp} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">{asp}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content: Visual Roadmap */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">Your Personalized Learning Pathway</h1>
        <div className="relative">
          {/* The connecting line */}
          <div className="absolute left-5 top-5 h-full w-0.5 bg-slate-300" aria-hidden="true"></div>
          
          <div className="space-y-8">
            {pathways.map((step) => (
              <div key={step.step} className="relative flex items-start">
                <div className="z-10 flex-shrink-0">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full border-2 bg-white ${step.completed ? 'border-green-500' : 'border-indigo-500'}`}>
                      {step.completed ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <span className="font-bold text-indigo-600">{step.step}</span>}
                  </div>
                </div>

                <div className={`ml-6 flex-1 transition-all ${step.completed ? 'opacity-60' : ''}`}>
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className={`font-semibold text-lg ${step.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>{step.programName}</h3>
                        <div className="flex items-center text-xs text-slate-500 gap-x-3 mt-1">
                          <span>NSQF Level: {step.nsqfLevel}</span>
                          <span>{step.duration}</span>
                          <span>{step.mode}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center justify-end gap-x-4">
                        <button onClick={() => setSelectedProgram(step.programName)} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium disabled:opacity-50" disabled={step.completed}>
                          Learn More
                        </button>
                        <button
                          onClick={() => toggleComplete(step.step)}
                          className={`text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                            step.completed
                              ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {step.completed ? 'Undo' : 'Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;