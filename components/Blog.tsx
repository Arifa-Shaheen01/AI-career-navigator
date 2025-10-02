import React from 'react';
import { ArrowRight } from './Icons';

const blogPosts = [
    {
        title: "Top 5 In-Demand Tech Skills in India for 2025",
        category: "Career Advice",
        excerpt: "The tech landscape is ever-evolving. Stay ahead of the curve by mastering these critical skills that employers are looking for right now."
    },
    {
        title: "New Job Opening: Junior Data Analyst at TechCorp",
        category: "Job Openings",
        excerpt: "TechCorp is hiring a motivated Junior Data Analyst to join their growing team. This is a great opportunity for recent graduates."
    },
    {
        title: "A Guide to NSQF Levels: What They Mean for Your Career",
        category: "Education",
        excerpt: "Understand the National Skills Qualifications Framework and how it can help you choose the right vocational programs for your goals."
    },
    {
        title: "The Rise of AI and Machine Learning: Opportunities in India",
        category: "Industry Trends",
        excerpt: "Artificial Intelligence is no longer science fiction. Discover the exciting career paths opening up in India's booming AI sector."
    },
];

const BlogCard: React.FC<{ title: string; category: string; excerpt: string }> = ({ title, category, excerpt }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <span className="text-xs font-semibold text-indigo-600 uppercase mb-2">{category}</span>
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex-grow">{title}</h3>
        <p className="text-slate-600 text-sm mb-4">{excerpt}</p>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center group mt-auto" onClick={(e) => e.preventDefault()}>
            Read More <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </a>
    </div>
);

const Blog: React.FC = () => {
    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900">Career Insights & Opportunities</h1>
                <p className="text-lg text-slate-600 mt-2">Stay updated with the latest trends, job openings, and articles.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map(post => <BlogCard key={post.title} {...post} />)}
            </div>
        </div>
    );
};

export default Blog;