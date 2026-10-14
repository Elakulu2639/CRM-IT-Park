import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      showPasswordToggle = false,
      type = 'text',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const resolvedType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-slate-700 tracking-tight"
          >
            {label}
            {props.required && <span className="text-rose-600 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative rounded-lg shadow-2xs">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={`
              w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400
              transition-colors duration-150
              ${leftIcon ? 'pl-9.5' : ''}
              ${showPasswordToggle ? 'pr-10' : ''}
              ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 hover:border-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15'
              }
              focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />

          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-hidden"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-slate-500" />
              ) : (
                <Eye className="w-4 h-4 text-slate-500" />
              )}
            </button>
          )}
        </div>

        {error ? (
          <p className="text-xs text-rose-600 flex items-center gap-1 font-normal">
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
