'use client';

import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/* -------------------------------------------------------------------------- */
/*                                  Styles                                    */
/* -------------------------------------------------------------------------- */

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-red-primary text-navy-base border border-red-primary',
    'hover:bg-text-primary hover:border-text-primary',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'bg-navy-surface border border-border-default text-text-primary',
    'hover:border-text-primary hover:bg-navy-secondary',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-muted hover:text-text-primary',
    'hover:underline underline-offset-4',
    'active:opacity-80',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-xs gap-2',
  lg: 'px-8 py-4 text-sm gap-2.5',
};

const baseClasses = [
  'inline-flex items-center justify-center relative',
  'rounded-none uppercase tracking-widest font-bold',
  'transition-all duration-300 ease-out',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-primary focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  'select-none whitespace-nowrap',
].join(' ');

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    children,
    ...rest
  } = props;

  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  /* Render as anchor when href is provided */
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsAnchor &
      Record<string, unknown>;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as ButtonAsButton &
    Record<string, unknown>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
