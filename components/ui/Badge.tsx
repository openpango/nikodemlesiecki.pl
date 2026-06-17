'use client';

import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type BadgeVariant =
  | 'expert'
  | 'advanced'
  | 'intermediate'
  | 'beginner'
  | 'status'
  | 'tech'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                  Styles                                    */
/* -------------------------------------------------------------------------- */

const variantClasses: Record<BadgeVariant, string> = {
  expert:
    'bg-text-primary/10 text-text-primary border border-text-primary/20',
  advanced:
    'bg-navy-surface text-text-primary border border-border-default',
  intermediate:
    'bg-transparent text-text-muted border border-border-default',
  beginner:
    'bg-transparent text-text-muted/60 border border-border-default/50',
  status:
    'bg-transparent text-red-primary border border-red-primary/30',
  tech:
    'bg-navy-surface text-text-muted border border-border-default',
  default:
    'bg-navy-surface text-text-primary border border-border-default',
};

/** Dot colour should match the text colour of each variant */
const dotColorClasses: Record<BadgeVariant, string> = {
  expert: 'bg-text-primary',
  advanced: 'bg-text-muted',
  intermediate: 'bg-text-muted',
  beginner: 'bg-border-default',
  status: 'bg-red-primary',
  tech: 'bg-text-muted',
  default: 'bg-text-primary',
};

const baseClasses = [
  'inline-flex items-center gap-1.5',
  'rounded-none px-2 py-1',
  'text-[0.65rem] font-bold uppercase tracking-widest',
  'select-none whitespace-nowrap',
].join(' ');

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  dot = false,
  icon,
  className = '',
  children,
}) => {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {dot && (
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${dotColorClasses[variant]}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
