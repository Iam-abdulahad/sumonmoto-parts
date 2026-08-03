import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastItem = ({ toast, onRemove }) => {
  const { message, type } = toast;
  
  const styles = {
    success: { border: 'border-l-success-500', icon: <CheckCircle className="w-5 h-5 text-success-500" /> },
    danger: { border: 'border-l-danger-500', icon: <AlertCircle className="w-5 h-5 text-danger-500" /> },
    info: { border: 'border-l-info-500', icon: <Info className="w-5 h-5 text-info-500" /> },
    warning: { border: 'border-l-warning-500', icon: <AlertCircle className="w-5 h-5 text-warning-500" /> },
  };

  const { border, icon } = styles[type] || styles.info;

  return (
    <div className={`bg-white shadow-lg rounded-lg pointer-events-auto flex items-center p-4 border-l-4 ${border} max-w-sm w-full animate-in slide-in-from-right-5 fade-in duration-300`}>
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className="flex-1 mr-2 text-sm font-medium text-neutral-800">{message}</div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 ml-4 text-neutral-400 hover:text-neutral-600 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
