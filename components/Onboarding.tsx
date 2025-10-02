import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { ArrowRight } from './Icons';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const TOTAL_STEPS = 4;

const educationLevels = {
    '': 'Select Education',
    'High School (+2)': 'High School (+2)',
    'Diploma': 'Diploma',
    'Graduation': 'Graduation',
    'Post Graduation': 'Post Graduation',
    'Ph.D': 'Ph.D'
};

const streams = {
    'High School (+2)': ['Science', 'Commerce', 'Arts'],
    'Graduation': ['B.Tech', 'B.Sc.', 'B.A.', 'B.Com.', 'BCA']
};

const aptitudeQuestions = [
    {
        question: "Which number should come next in the series? 1, 4, 9, 16, __",
        options: ["20", "25", "30", "36"],
        answer: "25"
    },
    {
        question: "Choose the word that is most nearly opposite in meaning to 'ABUNDANT'.",
        options: ["Plentiful", "Scarce", "Ample", "Copious"],
        answer: "Scarce"
    },
    {
        question: "A man buys an article for Rs. 27.50 and sells it for Rs. 28.60. What is his gain percent?",
        options: ["2.5%", "3%", "4%", "5%"],
        answer: "4%"
    }
];


const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    stream: '',
    skills: '',
    aspirations: ''
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      const profile: UserProfile = {
        name: formData.name,
        education: formData.education,
        stream: formData.stream,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        aspirations: formData.aspirations.split(',').map(a => a.trim()).filter(Boolean),
      };
      onComplete(profile);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const isStreamInputText = ['Diploma', 'Post Graduation', 'Ph.D'].includes(formData.education);

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !formData.name || !formData.education || !formData.stream;
      case 2:
        return !formData.skills;
      case 3:
          return Object.keys(answers).length < aptitudeQuestions.length;
      case 4:
        return !formData.aspirations;
      default:
        return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'education') {
        // Reset stream when education changes
        setFormData(prev => ({ ...prev, education: value, stream: '' }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({...prev, [questionIndex]: answer}));
  }

  const progressPercentage = (step / TOTAL_STEPS) * 100;

  const renderStreamInput = () => {
      if (!formData.education) return null;
      
      const inputClasses = "w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500";

      if (streams[formData.education]) {
          return (
            <div>
                <label htmlFor="stream" className="block text-sm font-medium text-slate-700 mb-1">Stream</label>
                <select name="stream" id="stream" value={formData.stream} onChange={handleChange} className={inputClasses}>
                    <option value="">Select Stream</option>
                    {streams[formData.education].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
          );
      }

      if (isStreamInputText) {
          return (
            <div>
                <label htmlFor="stream" className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                <input type="text" name="stream" id="stream" value={formData.stream} onChange={handleChange} className={inputClasses} placeholder="e.g., Computer Science" />
            </div>
          );
      }

      return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Create Your Learner Profile</h2>
        <p className="text-slate-600 text-center mb-6">Let's get to know you better to suggest the perfect career path.</p>

        {/* Progress Bar */}
        <div className="mb-8">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-indigo-600">Step {step} of {TOTAL_STEPS}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>

        {/* Form Steps */}
        <div className="space-y-6">
            {step === 1 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Personal & Educational Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Ananya Sharma" />
                        </div>
                        <div>
                            <label htmlFor="education" className="block text-sm font-medium text-slate-700 mb-1">Highest Education</label>
                            <select name="education" id="education" value={formData.education} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500">
                                {Object.entries(educationLevels).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                            </select>
                        </div>
                        {renderStreamInput()}
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Your Skills</h3>
                    <div>
                        <label htmlFor="skills" className="block text-sm font-medium text-slate-700 mb-1">Enter skills you have (comma-separated)</label>
                        <textarea name="skills" id="skills" value={formData.skills} onChange={handleChange} rows={4} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Communication, Basic Computer, Problem Solving"></textarea>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Aptitude Check</h3>
                    <div className="space-y-6">
                        {aptitudeQuestions.map((q, index) => (
                            <div key={index}>
                                <p className="font-medium text-slate-800 mb-2">{index + 1}. {q.question}</p>
                                <div className="space-y-2">
                                    {q.options.map(option => (
                                        <label key={option} className="flex items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                                            <input type="radio" name={`question-${index}`} value={option} checked={answers[index] === option} onChange={() => handleAnswerChange(index, option)} className="mr-3 h-4 w-4 text-indigo-600 bg-slate-100 border-slate-300 focus:ring-indigo-500" />
                                            <span className="text-slate-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {step === 4 && (
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Career Goals</h3>
                    <div>
                        <label htmlFor="aspirations" className="block text-sm font-medium text-slate-700 mb-1">What are your career aspirations? (comma-separated)</label>
                        <textarea name="aspirations" id="aspirations" value={formData.aspirations} onChange={handleChange} rows={4} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Work in IT, Start my own business, Public service"></textarea>
                    </div>
                </div>
            )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
            <button
                onClick={handleBack}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-opacity ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-600 hover:bg-slate-100'}`}
                disabled={step === 1}
                aria-hidden={step === 1}
            >
                Back
            </button>
            <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg inline-flex items-center group disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
                {step === TOTAL_STEPS ? 'Finish' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;