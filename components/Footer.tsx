import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-6 text-center text-slate-500 text-sm">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} AI Career Navigator. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;