import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Mail,
  Phone,
  Calendar,
  User,
  Sparkles,
  ArrowRight,
  Clock,
  Edit2,
  Trash2,
  Send,
  MessageSquare,
  AlertTriangle,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { LeadStatusBadge, LeadPriorityBadge } from './LeadBadges';
import leadService from '../../services/leadService';
import type { Lead, LeadStatus } from '../../types/lead';

interface LeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: number | null;
  onEdit: (lead: Lead) => void;
  onAssign: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  onDeleted: (leadId: number) => void;
  onStatusUpdated: (updatedLead: Lead) => void;
}

export const LeadDrawer: React.FC<LeadDrawerProps> = ({
  isOpen,
  onClose,
  leadId,
  onEdit,
  onAssign,
  onConvert,
  onDeleted,
  onStatusUpdated,
}) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const fetchLead = React.useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const data = await leadService.getLead(id);
      setLead(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && leadId) {
      fetchLead(leadId);
    } else {
      setLead(null);
    }
  }, [isOpen, leadId, fetchLead]);

  if (!isOpen) return null;

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead || lead.status === newStatus) return;
    setIsUpdatingStatus(true);
    try {
      const updated = await leadService.updateStatus(lead.id, newStatus);
      setLead(updated);
      onStatusUpdated(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!lead) return;
    if (window.confirm(`Are you sure you want to delete lead "${lead.name}"?`)) {
      try {
        await leadService.deleteLead(lead.id);
        onDeleted(lead.id);
        onClose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !newNote.trim()) return;
    setIsAddingNote(true);
    try {
      // Append note to existing notes
      const existingNotes = lead.notes ? `${lead.notes}\n---\n` : '';
      const updatedNotes = `${existingNotes}[${new Date().toLocaleDateString()}] ${newNote.trim()}`;
      const updated = await leadService.updateLead(lead.id, { notes: updatedNotes });
      setLead(updated);
      setNewNote('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingNote(false);
    }
  };

  const stages: Array<{ key: LeadStatus; label: string }> = [
    { key: 'new', label: 'New Inbound' },
    { key: 'contacted', label: 'Contacted' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'converted', label: 'Converted' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
          <div className="space-y-1.5 min-w-0 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              {lead && <LeadStatusBadge status={lead.status} size="md" />}
              {lead && <LeadPriorityBadge priority={lead.priority} size="md" />}
              {lead && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Score {lead.lead_score}/100
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold tracking-tight text-slate-900 truncate">
              {lead?.name || 'Loading details...'}
            </h2>

            {lead?.organization && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-800 truncate">{lead.organization}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {lead && (
              <button
                onClick={() => onEdit(lead)}
                title="Edit Lead"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {lead && (
              <button
                onClick={handleDelete}
                title="Delete Lead"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Stepper Bar */}
        {lead && lead.status !== 'unqualified' && (
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between gap-1 overflow-x-auto">
            {stages.map((stg, idx) => {
              const currentIdx = stages.findIndex((s) => s.key === lead.status);
              const isPast = idx <= currentIdx;
              const isCurrent = stg.key === lead.status;

              return (
                <button
                  key={stg.key}
                  disabled={isUpdatingStatus}
                  onClick={() => handleStatusChange(stg.key)}
                  className={`flex-1 min-w-[95px] text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    isCurrent
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase tracking-wider">Step {idx + 1}</div>
                  <div className="truncate">{stg.label}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* 1-Click Conversion Banner if Qualified */}
        {lead && lead.status === 'qualified' && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Prospect is Park-Qualified!
              </span>
              <p className="text-[11px] text-emerald-800">
                Ready to convert into Corporate Account, Contact, and Lease Opportunity.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConvert(lead)}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Convert
            </Button>
          </div>
        )}

        {/* Body Content Tabs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="p-12 text-center text-xs text-slate-400">Loading lead information...</div>
          ) : lead ? (
            <>
              {/* Quick Contact & Action Links */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {lead.email ? (
                  <a
                    href={`mailto:${lead.email}`}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-2 text-slate-700 truncate"
                  >
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>No email provided</span>
                  </div>
                )}

                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-2 text-slate-700 truncate"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{lead.phone}</span>
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>No phone provided</span>
                  </div>
                )}
              </div>

              {/* Assignment Card */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                      Assigned Lead Owner
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {lead.owner ? lead.owner.full_name || lead.owner.email : 'Unassigned (Shared Pool)'}
                    </span>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={() => onAssign(lead)}>
                  Reassign
                </Button>
              </div>

              {/* Lead Details Grid */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 block">
                  Profile & Park Specifications
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Industry Sector</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                      {lead.category?.category_name || 'General Tech'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Acquisition Source</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                      {lead.source?.source_name || 'Direct Inbound'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Space (sqm)</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block font-mono">
                      {lead.estimated_space_sqm ? `${lead.estimated_space_sqm} m²` : 'Not specified'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Target Desks / Staff</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block font-mono">
                      {lead.estimated_headcount ? `${lead.estimated_headcount} staff` : 'Not specified'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80 col-span-2">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Next Follow-Up Touchpoint</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-medium text-slate-800">
                        {lead.next_follow_up_at
                          ? new Date(lead.next_follow_up_at).toLocaleString()
                          : 'No follow-up scheduled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intake Notes */}
              {lead.notes && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 block">
                    Intake Notes & Project Requirements
                  </span>
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {lead.notes}
                  </div>
                </div>
              )}

              {/* Activity Trail & Touchpoint Log */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 block">
                  Activity Timeline & Touchpoints
                </span>

                {/* Quick Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Log a call, meeting, or quick update..."
                    className="flex-1 text-xs rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    isLoading={isAddingNote}
                    disabled={!newNote.trim()}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>

                {/* Activity List */}
                <div className="space-y-2.5 pt-1">
                  {lead.activities && lead.activities.length > 0 ? (
                    lead.activities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3 rounded-lg bg-white border border-slate-200/90 text-xs space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-slate-500 text-[11px]">
                          <span className="font-semibold text-slate-800">{act.title}</span>
                          <span className="font-mono">{new Date(act.created_at).toLocaleDateString()}</span>
                        </div>
                        {act.description && <p className="text-slate-600">{act.description}</p>}
                        {act.user && (
                          <span className="text-[10px] text-slate-400 block font-medium">
                            By {act.user.full_name || act.user.first_name}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
                      No activity logs recorded yet.
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LeadDrawer;
