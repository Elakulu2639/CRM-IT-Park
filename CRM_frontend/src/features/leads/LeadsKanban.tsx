import React from 'react';
import {
  Building2,
  Sparkles,
  ArrowRight,
  User,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { LeadPriorityBadge } from './LeadBadges';
import type { Lead, LeadStatus } from '../../types/lead';

interface LeadsKanbanProps {
  columns: Record<LeadStatus, Lead[]>;
  isLoading: boolean;
  onSelectLead: (lead: Lead) => void;
  onAdvanceStatus: (lead: Lead, nextStatus: LeadStatus) => void;
  onConvertLead: (lead: Lead) => void;
}

export const LeadsKanban: React.FC<LeadsKanbanProps> = ({
  columns,
  isLoading,
  onSelectLead,
  onAdvanceStatus,
  onConvertLead,
}) => {
  const columnConfigs: Array<{
    status: LeadStatus;
    title: string;
    nextStatus?: LeadStatus;
    headerBg: string;
    borderColor: string;
  }> = [
    {
      status: 'new',
      title: 'New Inbound',
      nextStatus: 'contacted',
      headerBg: 'bg-blue-50 text-blue-900 border-blue-200',
      borderColor: 'border-blue-400',
    },
    {
      status: 'contacted',
      title: 'Contacted / Discovery',
      nextStatus: 'qualified',
      headerBg: 'bg-purple-50 text-purple-900 border-purple-200',
      borderColor: 'border-purple-400',
    },
    {
      status: 'qualified',
      title: 'Park Qualified',
      nextStatus: 'converted',
      headerBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      borderColor: 'border-emerald-400',
    },
    {
      status: 'converted',
      title: 'Converted Tenants',
      headerBg: 'bg-teal-50 text-teal-900 border-teal-200',
      borderColor: 'border-teal-400',
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-xs text-slate-400">
        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading Kanban Pipeline...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      {columnConfigs.map((col) => {
        const items = columns[col.status] || [];

        return (
          <div
            key={col.status}
            className="rounded-xl bg-slate-100/70 border border-slate-200 flex flex-col max-h-[80vh] overflow-hidden"
          >
            {/* Column Header */}
            <div className={`p-3.5 border-b flex items-center justify-between ${col.headerBg}`}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-tight">{col.title}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/80 font-bold border border-slate-200/50">
                  {items.length}
                </span>
              </div>
            </div>

            {/* Cards Container */}
            <div className="p-2.5 overflow-y-auto space-y-2.5 flex-1 min-h-[300px]">
              {items.length === 0 ? (
                <div className="p-6 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                  No prospects in this stage
                </div>
              ) : (
                items.map((lead) => {
                  const isSlaBreached =
                    lead.status === 'new' &&
                    new Date().getTime() - new Date(lead.created_at).getTime() > 48 * 3600 * 1000;

                  return (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2.5 group"
                    >
                      {/* Card Top: Badges */}
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm bg-slate-100 text-[10px] font-mono font-bold text-slate-700">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                            {lead.lead_score}
                          </span>
                          <LeadPriorityBadge priority={lead.priority} size="sm" />
                        </div>

                        {isSlaBreached && (
                          <span
                            title="Uncontacted > 48 hours"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm text-[9.5px] font-bold bg-rose-100 text-rose-800"
                          >
                            <AlertTriangle className="w-2.5 h-2.5" /> SLA
                          </span>
                        )}
                      </div>

                      {/* Card Middle: Title & Org */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {lead.name}
                        </h4>
                        {lead.organization && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 truncate">
                            <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{lead.organization}</span>
                          </div>
                        )}
                      </div>

                      {/* Specifications Preview */}
                      {(lead.estimated_space_sqm || lead.category) && (
                        <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="truncate max-w-[120px]">
                            {lead.category?.category_name || 'General Tech'}
                          </span>
                          {lead.estimated_space_sqm && (
                            <span className="font-mono font-medium text-slate-700">
                              {lead.estimated_space_sqm} m²
                            </span>
                          )}
                        </div>
                      )}

                      {/* Card Footer: Owner & Advance Trigger */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1 min-w-0">
                          <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold shrink-0">
                            <User className="w-2.5 h-2.5" />
                          </div>
                          <span className="truncate text-[10px]">
                            {lead.owner ? lead.owner.first_name : 'Unassigned'}
                          </span>
                        </div>

                        {/* Stage Progression Buttons */}
                        {col.status === 'qualified' ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onConvertLead(lead);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs"
                          >
                            <span>Convert</span>
                            <CheckCircle2 className="w-2.5 h-2.5" />
                          </button>
                        ) : col.nextStatus ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdvanceStatus(lead, col.nextStatus!);
                            }}
                            title={`Advance to ${col.nextStatus}`}
                            className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 px-1.5 py-0.5 rounded-md transition-colors"
                          >
                            <span>Next</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeadsKanban;
