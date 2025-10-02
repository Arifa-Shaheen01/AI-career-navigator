import React from 'react';
import type { Program } from '../types';
import { ChevronRight } from './Icons';

const mockUsers = [
    { id: 1, name: 'Ananya Sharma', education: '12th Pass (Science)', skills: ['Communication', 'Python'], progress: '75%' },
    { id: 2, name: 'Rohan Verma', education: '10th Pass', skills: ['Teamwork', 'MS Office'], progress: '50%' },
    { id: 3, name: 'Priya Singh', education: 'ITI Diploma', skills: ['Electrical Wiring', 'Safety'], progress: '100%' },
];

const mockPrograms: Program[] = [
    { id: 'P01', name: 'Certified Python Programmer', nsqf: 4, provider: 'Skill India', duration: '6 Months', description: 'A foundational course covering Python basics, data structures, and object-oriented programming. Ideal for beginners aiming for a tech career.', learningOutcomes: ['Write clean, efficient Python code', 'Understand core programming concepts', 'Build simple applications'], potentialJobs: ['Junior Python Developer', 'QA Automation Tester'] },
    { id: 'P02', name: 'Advanced Diploma in Data Analytics', nsqf: 5, provider: 'Coursera', duration: '1 Year', description: 'This program covers statistical analysis, data visualization, and machine learning techniques using Python and R. Prepares learners for data-driven roles.', learningOutcomes: ['Perform complex data analysis', 'Create insightful visualizations', 'Apply basic machine learning models'], potentialJobs: ['Data Analyst', 'Business Intelligence Analyst'] },
    { id: 'P03', name: 'AI Engineer Capstone Project', nsqf: 7, provider: 'Local Institute', duration: '6 Months', description: 'An intensive, project-based program where learners build a real-world AI application from scratch, covering deep learning, NLP, and model deployment.', learningOutcomes: ['Design and train neural networks', 'Deploy AI models to production', 'Manage a complete AI project lifecycle'], potentialJobs: ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist'] },
];


const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{children}</th>
);

const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{children}</td>
);

interface AdminPanelProps {
  onSelectProgram: (program: Program) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onSelectProgram }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-slate-900">Admin Panel</h1>

            {/* Users Table */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-slate-800">Users</h2>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Education</TableHeader>
                                <TableHeader>Skills</TableHeader>
                                <TableHeader>Pathway Progress</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {mockUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.education}</TableCell>
                                    <TableCell>{user.skills.join(', ')}</TableCell>
                                    <TableCell>{user.progress}</TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Programs Table */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-slate-800">Programs</h2>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <TableHeader>Program Name</TableHeader>
                                <TableHeader>NSQF Level</TableHeader>
                                <TableHeader>Provider</TableHeader>
                                <TableHeader>Duration</TableHeader>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {mockPrograms.map(program => (
                                <tr key={program.id} onClick={() => onSelectProgram(program)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                                    <TableCell>{program.name}</TableCell>
                                    <TableCell>{program.nsqf}</TableCell>
                                    <TableCell>{program.provider}</TableCell>
                                    <TableCell>
                                      <div className="flex justify-between items-center">
                                        {program.duration}
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                      </div>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;