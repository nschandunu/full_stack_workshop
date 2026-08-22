import React from 'react';

/**
 * Neo-Brutalist Input Component
 * Characteristics: Solid 2px black border, flat white background, sharp corners, uppercase small label, high-contrast focus
 */
export const Input = React.forwardRef(({
  label,
  id,
  type = 'text',
  error,
  rightElement,
  className = '',
  required = false,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold uppercase tracking-wider text-black select-none flex items-center justify-between"
        >
          <span>{label} {required && <span className="text-red-500 font-bold">*</span>}</span>
        </label>
      )}
      <div className="relative w-full flex items-center">
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          className={`w-full bg-white text-black text-sm md:text-base px-4 py-3 border-2 border-black rounded-none placeholder-gray-400 font-medium transition-colors focus:outline-none focus:bg-amber-50/20 focus:border-black ${
            rightElement ? 'pr-12' : ''
          } ${error ? 'border-red-600' : ''} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-semibold text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
