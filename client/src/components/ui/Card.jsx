import React from 'react';

/**
 * Neo-Brutalist Card Component
 * Characteristics: Solid 2px black border, flat white background, sharp corners (no border-radius), generous padding
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white border-2 border-black p-8 rounded-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
