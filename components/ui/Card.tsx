'use client';

import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type CardVariant = 'large' | 'compact';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  hover?: boolean;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                  Styles                                    */
/* -------------------------------------------------------------------------- */

const variantClasses: Record<CardVariant, string> = {
  large: 'p-8',
  compact: 'p-6',
};

const baseClasses = [
  'bg-navy-surface border border-border-default rounded-none',
  'transition-all duration-300 ease-out relative overflow-hidden group',
].join(' ');

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = 'large',
    hover = true,
    as: Component = 'div',
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    hover ? 'hover:border-text-muted hover:bg-navy-secondary hover:-translate-y-1' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      {...rest}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </Component>
  );
});

Card.displayName = 'Card';

export default Card;
