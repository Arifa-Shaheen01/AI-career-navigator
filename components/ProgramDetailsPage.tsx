import React from 'react';
import type { Program } from '../types';
import { ArrowLeft, BookOpen, Briefcase, CheckCircle2 } from './Icons';

interface ProgramDetailsPageProps {
  program: Program;
  onBack: () => void;
}

const ProgramDetailsPage: React.FC<ProgramDetailsPageProps> = ({ program, onBack }) => {
  if (!program) {
    return (
      <div className="text-center">
        <p>Program not found.</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 hover:text-indigo-800">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center mb-8 text-indigo-600 hover:text-indigo-800 transition-colors group">
        <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
        Back to Admin Panel
      </button>
      
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-sm font-semibold text-indigo-600 uppercase">NSQF Level: {program.nsqf}</span>
          <h1 className="text-4xl font-bold mt-2 text-slate-900">{program.name}</h1>
          <div className="flex items-center text-slate-500 mt-2 gap-x-4">
            <span>Provider: {program.provider}</span>
            <span>Duration: {program.duration}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center text-slate-800"><BookOpen className="h-5 w-5 mr-2 text-indigo-500"/>Description</h2>
            <p className="text-slate-600">{program.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center text-slate-800"><CheckCircle2 className="h-5 w-5 mr-2 text-indigo-500"/>Learning Outcomes</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              {program.learningOutcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center text-slate-800"><Briefcase className="h-5 w-5 mr-2 text-indigo-500"/>Potential Job Roles</h2>
          <div className="flex flex-wrap gap-2">
            {program.potentialJobs.map(job => (
              <span key={job} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{job}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;