import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl border border-red-100 text-center h-full min-h-[250px]">
      <AlertCircle className="w-12 h-12 text-danger-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-900 mb-2">Oops!</h3>
      <p className="text-red-700 mb-6">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="bg-white hover:bg-neutral-50 border-red-200">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
