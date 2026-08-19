import React from 'react';

/**
 * Neo-Brutalist Button Component
 * Characteristics: Solid 2px black border, sharp corners, bold uppercase/title typography, #F5B400 accent background
 */
export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold text-sm md:text-base border-2 border-black rounded-none px-6 py-3.5 transition-all select-none focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#F5B400] text-black hover:bg-[#e5a800] active:translate-y-[1px]',
    secondary: 'bg-white text-black hover:bg-gray-100 active:translate-y-[1px]',
    dark: 'bg-black text-white hover:bg-gray-900 active:translate-y-[1px]',
    ghost: 'bg-transparent text-black border-transparent hover:border-black active:translate-y-[1px]',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center space-x-2 w-full">
          <span>{children}</span>
          {icon && <span className="inline-flex items-center">{icon}</span>}
        </span>
      )}
    </button>
  );
};

export default Button;
