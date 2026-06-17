'use client';

import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className}`}>
      {label && (
        <p
          className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] font-bold text-red-primary"
          aria-label={label}
        >
          {label}
        </p>
      )}

      <h2 className="mb-8 font-heading text-[10vw] md:text-7xl lg:text-[6rem] leading-[0.9] text-text-primary uppercase tracking-tighter">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-base text-text-muted max-w-lg ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionHeading.displayName = 'SectionHeading';

export default SectionHeading;
