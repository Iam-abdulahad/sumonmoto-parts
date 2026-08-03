import React from 'react';

const Badge = ({ children, status = 'info', className = '' }) => {
  const styles = {
    info: 'bg-blue-50 text-blue-700 dot-info-500',
    success: 'bg-green-50 text-green-700 dot-success-500',
    warning: 'bg-amber-50 text-amber-700 dot-warning-500',
    danger: 'bg-red-50 text-red-700 dot-danger-500',
    accent: 'bg-accent-100 text-accent-600',
  };

  const getDotColor = (statusType) => {
    switch (statusType) {
      case 'info': return 'bg-info-500';
      case 'success': return 'bg-success-500';
      case 'warning': return 'bg-warning-500';
      case 'danger': return 'bg-danger-500';
      default: return null;
    }
  };

  const dotColor = getDotColor(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]} ${className}`}>
      {dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;
