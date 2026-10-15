import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-600">
        <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm mb-4">
          ITP
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
          <span>Verifying security session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
