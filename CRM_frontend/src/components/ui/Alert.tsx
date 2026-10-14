import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const configs = {
    error: {
      container: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
    },
    info: {
      container: 'bg-slate-50 border-slate-200 text-slate-800',
      icon: <Info className="w-4 h-4 text-slate-600 shrink-0" />,
    },
  };

  const current = configs[variant];

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-2.5 p-3 rounded-lg border text-xs leading-relaxed ${current.container} ${className}`}
    >
      <div className="pt-0.5">{current.icon}</div>
      <div className="flex-1">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded-sm"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
