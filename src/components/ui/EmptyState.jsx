import React from 'react';

const EmptyState = ({ icon: Icon, title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl shadow-sm border border-neutral-200 h-full min-h-[300px]">
      {Icon && (
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-neutral-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 max-w-sm mb-6">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg px-5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
