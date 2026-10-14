import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-hidden cursor-pointer select-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100';

  const variantStyles = {
    primary: 'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-xs focus:ring-2 focus:ring-emerald-600/30 focus:ring-offset-1 border border-emerald-800/40',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs focus:ring-2 focus:ring-slate-700/30 border border-slate-950',
    outline: 'bg-white hover:bg-slate-50/80 text-slate-700 border border-slate-300 shadow-2xs focus:ring-2 focus:ring-slate-300/40',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-2 focus:ring-rose-500/30 border border-rose-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-3.5 py-2 gap-2 h-9.5',
    lg: 'text-base px-4 py-2.5 gap-2.5 h-11',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
