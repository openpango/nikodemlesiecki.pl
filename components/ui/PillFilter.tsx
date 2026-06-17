'use client';

import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface PillOption {
  value: string;
  label: string;
}

interface PillFilterProps {
  options: PillOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Styles                                    */
/* -------------------------------------------------------------------------- */

const pillBase = [
  'text-[0.65rem] font-bold uppercase tracking-[0.2em] pb-1',
  'cursor-pointer select-none whitespace-nowrap',
  'transition-all duration-300 ease-out border-b-2',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-primary focus-visible:outline-offset-2',
].join(' ');

const pillInactive = [
  'text-text-muted border-transparent hover:text-text-primary',
].join(' ');

const pillActive = [
  'text-red-primary border-red-primary',
].join(' ');

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const PillFilter: React.FC<PillFilterProps> = ({
  options,
  activeValue,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="radiogroup"
      className={`flex gap-2 overflow-x-auto scrollbar-hide ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === activeValue;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={`${pillBase} ${isActive ? pillActive : pillInactive}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

PillFilter.displayName = 'PillFilter';

export default PillFilter;
