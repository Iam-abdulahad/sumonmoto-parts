import React from 'react';

const Input = React.forwardRef(({ label, error, helperText, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`border rounded-lg px-3 py-2 text-neutral-900 bg-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors
          ${error ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500' : 'border-neutral-300'}
          ${props.disabled ? 'bg-neutral-100 cursor-not-allowed opacity-70' : ''}
          ${className}`}
        {...props}
      />
      {error && <span className="mt-1 text-sm text-danger-500">{error}</span>}
      {!error && helperText && <span className="mt-1 text-sm text-neutral-500">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
