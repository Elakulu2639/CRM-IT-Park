import React, { useState, useEffect, useCallback } from 'react';
import {
  Users2,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  RefreshCw,
  Clock,
} from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import Button from '../../components/ui/Button';
import LeadsTable from './LeadsTable';
import LeadsKanban from './LeadsKanban';
import LeadModal from './LeadModal';
import LeadDrawer from './LeadDrawer';
import AssignModal from './AssignModal';
import ConvertLeadModal from './ConvertLeadModal';
import leadService from '../../services/leadService';
import type {
  Lead,
  LeadStatus,
  LeadPriority,
  LeadMetrics,
  LeadFilters,
} from '../../types/lead';

export const LeadsPage: React.FC = () => {
  // Views
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Leads Data
  const [tableLeads, setTableLeads] = useState<Lead[]>([]);
  const [kanbanColumns, setKanbanColumns] = useState<Record<LeadStatus, Lead[]>>({
    new: [],
    contacted: [],
    qualified: [],
    converted: [],
    unqualified: [],
  });
  const [metrics, setMetrics] = useState<LeadMetrics | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    has_more: false,
  });

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [teamMembers, setTeamMembers] = useState<Array<{ id: number; full_name: string }>>([]);

  // Modals & Drawers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);

  const [drawerLeadId, setDrawerLeadId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [assignLead, setAssignLead] = useState<Lead | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [convertLead, setConvertLead] = useState<Lead | null>(null);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Load team members and metrics on mount
  useEffect(() => {
    leadService.getTeamMembers().then(setTeamMembers).catch(console.error);
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const data = await leadService.getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch leads based on active view mode and filters
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      if (viewMode === 'table') {
        const res = await leadService.getLeadsTable({
          search: searchTerm || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          priority: priorityFilter !== 'all' ? priorityFilter : undefined,
          owner_id: ownerFilter !== 'all' ? ownerFilter : undefined,
          page: pagination.current_page,
          per_page: pagination.per_page,
        });
        setTableLeads(res.data);
        setPagination(res.pagination);
      } else {
        const res = await leadService.getLeadsKanban({
          search: searchTerm || undefined,
          priority: priorityFilter !== 'all' ? priorityFilter : undefined,
          owner_id: ownerFilter !== 'all' ? ownerFilter : undefined,
        });
        setKanbanColumns(res.data.columns);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [viewMode, searchTerm, statusFilter, priorityFilter, ownerFilter, pagination.current_page, pagination.per_page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handlers
  const handleOpenCreateModal = () => {
    setLeadToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead: Lead) => {
    setLeadToEdit(lead);
    setIsModalOpen(true);
  };

  const handleSelectLead = (lead: Lead) => {
    setDrawerLeadId(lead.id);
    setIsDrawerOpen(true);
  };

  const handleOpenAssign = (lead: Lead) => {
    setAssignLead(lead);
    setIsAssignModalOpen(true);
  };

  const handleOpenConvert = (lead: Lead) => {
    setConvertLead(lead);
    setIsConvertModalOpen(true);
  };

  const handleLeadSaved = (saved: Lead) => {
    fetchLeads();
    fetchMetrics();
    // Refresh drawer if viewing
    if (drawerLeadId === saved.id) {
      setDrawerLeadId(saved.id);
    }
  };

  const handleLeadDeleted = (deletedId: number) => {
    fetchLeads();
    fetchMetrics();
    if (drawerLeadId === deletedId) {
      setIsDrawerOpen(false);
    }
  };

  const handleAdvanceStatus = async (lead: Lead, nextStatus: LeadStatus) => {
    try {
      await leadService.updateStatus(lead.id, nextStatus);
      fetchLeads();
      fetchMetrics();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell
      title="Leads Pipeline"
      subtitle="Capture, track, qualify, and convert commercial tenant inquiries"
    >
      <div className="space-y-6">
        {/* Top Action Header Bar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Users2 className="w-5 h-5 text-emerald-600" />
              Inbound Leads & Tenant Pipeline
            </h1>
            <p className="text-xs text-slate-500">
              Manage prospective companies, foreign investors, and startup incubation candidates.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* View Switcher (Table vs Kanban) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Kanban Board</span>
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                fetchLeads();
                fetchMetrics();
              }}
              title="Refresh leads list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreateModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              New Inbound Lead
            </Button>
          </div>
        </div>

        {/* 4 Pipeline Metric Cards */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Total Leads */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Active Pipeline</span>
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                {metrics.total}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="font-semibold text-emerald-700 font-mono">
                  {metrics.conversion_rate_pct}%
                </span>
                <span>conversion rate</span>
              </div>
            </div>

            {/* Metric 2: Qualified Prospects */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Park Qualified</span>
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                {metrics.qualified}
              </div>
              <div className="text-[11px] text-slate-500">
                Ready for commercial lease conversion
              </div>
            </div>

            {/* Metric 3: SLA Warning */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Uncontacted SLA Alert</span>
                <span className={`p-1.5 rounded-lg ${metrics.sla_breaches > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                  <AlertTriangle className="w-4 h-4" />
                </span>
              </div>
              <div className={`text-2xl font-bold font-mono tracking-tight ${metrics.sla_breaches > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                {metrics.sla_breaches}
              </div>
              <div className="text-[11px] text-slate-500">
                Inbound leads untouched &gt; 48 hours
              </div>
            </div>

            {/* Metric 4: Hot Priority Leads */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Hot Leads 🔥</span>
                <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tracking-tight">
                {metrics.hot_leads}
              </div>
              <div className="text-[11px] text-slate-500">
                Urgent tier or lead score &ge; 80
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          {/* Status Tab Pills (Table view) */}
          {viewMode === 'table' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
              {[
                { key: 'all', label: 'All Inbound' },
                { key: 'new', label: 'New Inbound' },
                { key: 'contacted', label: 'Contacted' },
                { key: 'qualified', label: 'Qualified' },
                { key: 'converted', label: 'Converted' },
                { key: 'unqualified', label: 'Unqualified' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setStatusFilter(tab.key);
                    setPagination((p) => ({ ...p, current_page: 1 }));
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    statusFilter === tab.key
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Search & Secondary Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPagination((p) => ({ ...p, current_page: 1 }));
                }}
                placeholder="Search leads by name, company, email, or phone..."
                className="w-full text-xs rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPagination((p) => ({ ...p, current_page: 1 }));
                }}
                className="w-full text-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent 🔥</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            {/* Owner Filter */}
            <div>
              <select
                value={ownerFilter}
                onChange={(e) => {
                  setOwnerFilter(e.target.value);
                  setPagination((p) => ({ ...p, current_page: 1 }));
                }}
                className="w-full text-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="all">All Owners</option>
                <option value="unassigned">Unassigned (Shared Pool)</option>
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content View (Table or Kanban) */}
        {viewMode === 'table' ? (
          <div className="space-y-4">
            <LeadsTable
              leads={tableLeads}
              isLoading={isLoading}
              onSelectLead={handleSelectLead}
              onEditLead={handleOpenEditModal}
              onAssignLead={handleOpenAssign}
              onConvertLead={handleOpenConvert}
              onDeleteLead={handleLeadDeleted}
            />

            {/* Pagination Controls */}
            {pagination.total > 0 && (
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs text-slate-500">
                <span>
                  Showing <strong className="text-slate-900">{tableLeads.length}</strong> of{' '}
                  <strong className="text-slate-900">{pagination.total}</strong> leads
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.current_page <= 1 || isLoading}
                    onClick={() =>
                      setPagination((p) => ({ ...p, current_page: p.current_page - 1 }))
                    }
                  >
                    Previous
                  </Button>

                  <span className="font-mono text-slate-700 px-2">
                    Page {pagination.current_page} of {pagination.last_page}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.current_page >= pagination.last_page || isLoading}
                    onClick={() =>
                      setPagination((p) => ({ ...p, current_page: p.current_page + 1 }))
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <LeadsKanban
            columns={kanbanColumns}
            isLoading={isLoading}
            onSelectLead={handleSelectLead}
            onAdvanceStatus={handleAdvanceStatus}
            onConvertLead={handleOpenConvert}
          />
        )}
      </div>

      {/* Modals & Drawers */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadToEdit={leadToEdit}
        onSaved={handleLeadSaved}
        onInspectDuplicate={(id) => {
          setDrawerLeadId(id);
          setIsDrawerOpen(true);
        }}
      />

      <LeadDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        leadId={drawerLeadId}
        onEdit={handleOpenEditModal}
        onAssign={handleOpenAssign}
        onConvert={handleOpenConvert}
        onDeleted={handleLeadDeleted}
        onStatusUpdated={handleLeadSaved}
      />

      <AssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        lead={assignLead}
        onAssigned={handleLeadSaved}
      />

      <ConvertLeadModal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        lead={convertLead}
        onConverted={handleLeadSaved}
      />
    </AppShell>
  );
};

export default LeadsPage;
