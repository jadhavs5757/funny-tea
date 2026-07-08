import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Inline styling additions for sizes other than md
  const buttonStyle = size !== 'md' ? {
    padding: size === 'sm' ? '0.5rem 1.25rem' : '1.25rem 3rem',
    fontSize: size === 'sm' ? '0.85rem' : '1.05rem',
  } : undefined;

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      style={buttonStyle}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon-left">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon-right">{icon}</span>}
    </button>
  );
}
