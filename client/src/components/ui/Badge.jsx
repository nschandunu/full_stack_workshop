import React from 'react';

/**
 * Neo-Brutalist Badge Component
 * Characteristics: Solid 2px black border, sharp corners, uppercase bold text
 */
export const Badge = ({
  children,
  variant = 'yellow',
  className = '',
  ...props
}) => {
  const variants = {
    yellow: 'bg-[#F5B400] text-black',
    white: 'bg-white text-black',
    gray: 'bg-[#EEF1F3] text-black',
    dark: 'bg-black text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 border-2 border-black text-xs font-black uppercase tracking-wider ${variants[variant] || variants.yellow} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
