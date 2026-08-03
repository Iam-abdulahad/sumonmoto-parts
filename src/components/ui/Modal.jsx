import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-primary-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        className={`relative bg-white rounded-2xl shadow-lg w-full ${maxWidth} max-h-[90vh] overflow-y-auto transform transition-all`}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-lg p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-lg p-1 z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
