import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import userService from '../../services/userService';
import type { User } from '../../types/user';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  currentUserId?: number;
  onStatusUpdated: (updatedUser: User) => void;
}

export const UserStatusModal: React.FC<UserStatusModalProps> = ({
  isOpen,
  onClose,
  user,
  currentUserId,
  onStatusUpdated,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const isSelf = currentUserId === user.id;
  const isCurrentlyActive = user.status === 'active';
  const targetStatus = isCurrentlyActive ? 'inactive' : 'active';

  const handleToggle = async () => {
    if (isSelf && isCurrentlyActive) {
      setErrorMessage('You cannot deactivate your own account.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const updated = await userService.updateStatus(user.id, targetStatus);
      onStatusUpdated(updated);
      onClose();
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        setErrorMessage(response?.data?.message || `Failed to update status to ${targetStatus}.`);
      } else {
        setErrorMessage('A network error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isCurrentlyActive
                  ? 'bg-rose-50 text-rose-600 border border-rose-100'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}
            >
              {isCurrentlyActive ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              {isCurrentlyActive ? 'Deactivate User Account' : 'Reactivate User Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <Alert variant="error" title="Action Prohibited">
              {errorMessage}
            </Alert>
          )}

          {isSelf && isCurrentlyActive ? (
            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              <span className="font-semibold block mb-0.5">Self-Deactivation Blocked</span>
              You are currently logged in as this administrator. Security policies prevent administrators from deactivating their own credentials.
            </div>
          ) : (
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to{' '}
              <strong className="text-slate-900">
                {isCurrentlyActive ? 'deactivate' : 'reactivate'}
              </strong>{' '}
              the account for <strong className="text-slate-900">{user.full_name}</strong> (
              <span className="font-mono text-slate-500">{user.email}</span>)?
              {isCurrentlyActive && (
                <span className="block mt-2 text-slate-500">
                  Deactivated users will be immediately logged out and blocked from signing in to the CRM.
                </span>
              )}
            </p>
          )}

          {/* User Preview pill */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-slate-800">{user.full_name}</p>
              <p className="text-slate-500 text-[11px] font-mono">{user.role?.role_name || 'No Role'}</p>
            </div>
            <span
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider ${
                user.status === 'active'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              Current: {user.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant={isCurrentlyActive ? 'danger' : 'primary'}
            size="sm"
            onClick={handleToggle}
            isLoading={isSubmitting}
            disabled={isSelf && isCurrentlyActive}
          >
            {isCurrentlyActive ? 'Confirm Deactivation' : 'Reactivate Account'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserStatusModal;
