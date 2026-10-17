import React from 'react';
import {
  Building2,
  Mail,
  Phone,
  User,
  MoreVertical,
  Edit2,
  UserCheck,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LeadStatusBadge, LeadPriorityBadge } from './LeadBadges';
import type { Lead } from '../../types/lead';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onSelectLead: (lead: Lead) => void;
  onEditLead: (lead: Lead) => void;
  onAssignLead: (lead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
  onDeleteLead: (leadId: number) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  isLoading,
  onSelectLead,
  onEditLead,
  onAssignLead,
  onConvertLead,
  onDeleteLead,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center text-xs text-slate-400">
        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading leads pipeline...
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center text-xs text-slate-500 space-y-2">
        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
          <Building2 className="w-5 h-5" />
        </div>
        <p className="font-semibold text-slate-800">No leads found</p>
        <p className="text-slate-400 max-w-sm mx-auto">
          No leads match your current search and filter criteria. Adjust your filters or register a new inbound lead.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10.5px]">
            <tr>
              <th className="py-3 px-4">Prospect & Organization</th>
              <th className="py-3 px-3">Contact Details</th>
              <th className="py-3 px-3">Industry & Source</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Score & Priority</th>
              <th className="py-3 px-3">Owner</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {leads.map((lead) => {
              const isSlaBreached =
                lead.status === 'new' &&
                new Date().getTime() - new Date(lead.created_at).getTime() > 48 * 3600 * 1000;

              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  {/* Prospect & Company */}
                  <td className="py-3.5 px-4 min-w-[200px]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {lead.name}
                        </span>
                        {isSlaBreached && (
                          <span
                            title="Uncontacted > 48 hours"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-sm text-[9.5px] font-bold bg-rose-100 text-rose-800"
                          >
                            <AlertTriangle className="w-2.5 h-2.5" /> SLA
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{lead.organization || 'Individual Inbound'}</span>
                      </div>
                    </div>
                  </td>

                  {/* Contact Details */}
                  <td className="py-3.5 px-3 min-w-[170px]">
                    <div className="space-y-0.5 text-[11px]">
                      {lead.email && (
                        <div className="flex items-center gap-1.5 text-slate-600 truncate">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-1.5 text-slate-600 truncate">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {!lead.email && !lead.phone && (
                        <span className="text-slate-400 italic">No contact info</span>
                      )}
                    </div>
                  </td>

                  {/* Industry & Source */}
                  <td className="py-3.5 px-3 min-w-[150px]">
                    <div className="space-y-0.5">
                      <span className="font-medium text-slate-800 block truncate">
                        {lead.category?.category_name || 'General Tech'}
                      </span>
                      <span className="text-[10.5px] text-slate-400 block truncate">
                        {lead.source?.source_name || 'Inbound'}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <LeadStatusBadge status={lead.status} />
                  </td>

                  {/* Score & Priority */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-slate-100 text-[10px] font-mono font-bold text-slate-700">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        {lead.lead_score}
                      </span>
                      <LeadPriorityBadge priority={lead.priority} />
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="py-3.5 px-3 whitespace-nowrap min-w-[130px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-slate-700 truncate">
                        {lead.owner ? lead.owner.first_name : 'Unassigned'}
                      </span>
                    </div>
                  </td>

                  {/* Quick Actions */}
                  <td
                    className="py-3.5 px-4 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {lead.status === 'qualified' && (
                        <button
                          onClick={() => onConvertLead(lead)}
                          title="Convert to Account"
                          className="px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Convert</span>
                        </button>
                      )}

                      <button
                        onClick={() => onAssignLead(lead)}
                        title="Assign Lead"
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onEditLead(lead)}
                        title="Edit Lead"
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete lead "${lead.name}"?`)) {
                            onDeleteLead(lead.id);
                          }
                        }}
                        title="Delete Lead"
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
