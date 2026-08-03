import React from 'react';

const SectionHeader = ({ title, subtitle, center = false, className = '' }) => {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4 inline-block relative">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent-500 rounded-full" />
      </h2>
      {subtitle && <p className="text-neutral-500 max-w-2xl mt-4">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
