import React from 'react';
import { UserCircle, Briefcase, BarChart3, ArrowRight, BookOpen, ShieldCheck } from './Icons';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-start h-full shadow-sm">
    <div className="bg-indigo-100 p-3 rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">{description}</p>
  </div>
);

const TechPillar: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center">
      <div className="bg-indigo-100 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text mb-6">
          AI-Powered Career Navigator
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10">
          Discover personalized vocational pathways aligned with your profile and market demands. Your journey to a successful career starts here.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-flex items-center group shadow-lg shadow-indigo-500/30"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-slate-900">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <FeatureCard 
            icon={<UserCircle className="h-6 w-6 text-indigo-500" />}
            title="Multi-step Onboarding"
            description="Build a comprehensive learner profile through our simple and intuitive onboarding process."
          />
          <FeatureCard 
            icon={<Briefcase className="h-6 w-6 text-indigo-500" />}
            title="Personalized Recommendations"
            description="Receive AI-driven career pathways tailored to your unique skills and aspirations."
          />
          <FeatureCard 
            icon={<BookOpen className="h-6 w-6 text-indigo-500" />}
            title="NSQF Mapping"
            description="All our recommended programs are mapped to the National Skills Qualifications Framework."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-6 w-6 text-indigo-500" />}
            title="Skill Progression"
            description="Visualize your learning journey and track your progress towards your career goals."
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Our Mission</h2>
            <p className="text-center text-slate-600 text-lg">
                We aim to bridge the gap between education and employment in India by providing AI-driven, personalized vocational guidance. Our platform connects learners with NSQF-aligned programs and real-time labour market insights, empowering them to build successful, future-proof careers.
            </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 bg-white rounded-xl border border-slate-200">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">A National Initiative for Career Excellence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                <TechPillar icon={<ShieldCheck className="h-8 w-8 text-indigo-500" />} title="Govt. of India Innovation" description="Proudly part of a national mission to foster innovation and empower India's workforce." />
                <TechPillar icon={<BookOpen className="h-8 w-8 text-indigo-500" />} title="NSQF Aligned Programs" description="All pathways feature programs aligned with the National Skills Qualifications Framework for certified quality." />
                <TechPillar icon={<BarChart3 className="h-8 w-8 text-indigo-500" />} title="Intelligent Guidance" description="Leveraging data-driven insights to provide personalized career recommendations that match market demand." />
            </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;