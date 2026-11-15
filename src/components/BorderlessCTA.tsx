import type { ReactNode } from 'react';

interface BorderlessCTAProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  arrow?: '→' | '↗' | '↓';
  className?: string;
  disabled?: boolean;
}

export function BorderlessCTA({
  children,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  arrow = '→',
  className = '',
  disabled = false,
}: BorderlessCTAProps) {
  const classes = `cta-borderless text-sm md:text-[15px] uppercase tracking-[0.06em] ${
    disabled ? 'opacity-50 pointer-events-none' : ''
  } ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        <span>{children}</span>
        <span className="cta-arrow" aria-hidden="true">
          {arrow}
        </span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden="true">
        {arrow}
      </span>
    </button>
  );
}
