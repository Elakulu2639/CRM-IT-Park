import React, { useState, useEffect } from 'react';
import { X, UserCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import leadService from '../../services/leadService';
import type { Lead } from '../../types/lead';

interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onAssigned: (updatedLead: Lead) => void;
}

export const AssignModal: React.FC<AssignModalProps> = ({
  isOpen,
  onClose,
  lead,
  onAssigned,
}) => {
  const [teamMembers, setTeamMembers] = useState<Array<{ id: number; full_name: string; role_name?: string }>>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      leadService.getTeamMembers().then(setTeamMembers).catch(console.error);
      setSelectedUserId(lead?.owner_user_id ? String(lead.owner_user_id) : '');
      setNote('');
      setError(null);
    }
  }, [isOpen, lead]);

  if (!isOpen || !lead) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const ownerId = selectedUserId ? Number(selectedUserId) : null;
      const updated = await leadService.assignLead(lead.id, ownerId, note.trim() || undefined);
      onAssigned(updated);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update lead assignment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Assign Lead Owner</h3>
              <p className="text-[11px] text-slate-500">Reassign {lead.name} to a team member</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Assignee (BDO / CRM Manager)
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            >
              <option value="">Leave Unassigned (Shared Inbound Pool)</option>
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.full_name} ({m.role_name || 'Staff'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Handover Remark / Instruction (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Follow up on specific space requirements in Phase 2..."
              className="w-full text-xs rounded-lg border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            leftIcon={<UserCheck className="w-4 h-4" />}
          >
            Update Assignment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
