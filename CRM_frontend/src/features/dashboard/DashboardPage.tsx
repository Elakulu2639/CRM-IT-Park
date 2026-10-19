import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users2,
  Building2,
  Briefcase,
  TicketCheck,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  PhoneCall,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AppShell from '../../components/layout/AppShell';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { apiClient } from '../../services/api';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leadMetrics, setLeadMetrics] = useState<{
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    conversion_rate_pct: number;
  } | null>(null);

  useEffect(() => {
    apiClient
      .get('/leads/metrics')
      .then((res) => {
        if (res.data?.success && res.data?.data) {
          setLeadMetrics(res.data.data);
        }
      })
      .catch(() => {
        // Fall back gracefully if server is busy or offline
      });
  }, []);

  const displayName =
    user?.first_name && user.first_name.toLowerCase() !== 'system'
      ? `${user.first_name} ${user.last_name || ''}`.trim()
      : (user?.full_name || 'System Administrator');

  const metrics = [
    {
      label: 'Active Leads Pipeline',
      value: leadMetrics?.total ? String(leadMetrics.total) : '142',
      change: '+12.4%',
      period: 'vs last month',
      icon: Users2,
      variant: 'emerald' as const,
    },
    {
      label: 'Corporate Accounts',
      value: '68',
      change: '+4 new',
      period: 'this quarter',
      icon: Building2,
      variant: 'blue' as const,
    },
    {
      label: 'Open Deals & Grants',
      value: 'ETB 24.8M',
      change: '18 Deals',
      period: 'in negotiation',
      icon: Briefcase,
      variant: 'amber' as const,
    },
    {
      label: 'SLA Response Rate',
      value: '99.2%',
      change: 'Target 99%',
      period: '0 active breaches',
      icon: TicketCheck,
      variant: 'purple' as const,
    },
  ];

  const pipelineStages = [
    {
      name: 'New Inbound Lead',
      count: leadMetrics?.new ?? 42,
      pct: 100,
      color: 'bg-emerald-600',
    },
    {
      name: 'Contacted & Discovery',
      count: leadMetrics?.contacted ?? 36,
      pct: 85,
      color: 'bg-emerald-500',
    },
    {
      name: 'Proposal / Due Diligence',
      count: leadMetrics?.qualified ?? 24,
      pct: 57,
      color: 'bg-sky-500',
    },
    {
      name: 'Incubation Agreement',
      count: 18,
      pct: 42,
      color: 'bg-indigo-500',
    },
    {
      name: 'Active Park Tenant',
      count: leadMetrics?.converted ?? 12,
      pct: 28,
      color: 'bg-slate-700',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New Lead Inbound',
      organization: 'Ethio-Fintech Global',
      description: 'Applied for incubation space (Tier 1)',
      time: '15m ago',
      icon: FileText,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 2,
      title: 'Proposal Submitted',
      organization: 'East Africa Cloud Technologies',
      description: '750 sqm data center lease proposal sent',
      time: '2h ago',
      icon: Briefcase,
      iconColor: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      id: 3,
      title: 'Discovery Call Completed',
      organization: 'Safaricom Enterprise Solutions',
      description: 'BDO meeting completed with technical lead',
      time: '4h ago',
      icon: PhoneCall,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      id: 4,
      title: 'Tenancy Agreement Signed',
      organization: 'AfroTech Innovation Hub',
      description: 'Signed facility onboarding agreement',
      time: 'Yesterday',
      icon: UserCheck,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  const priorityTasks = [
    {
      id: 1,
      title: 'Qualify 3 new inbound startup applications',
      due: 'Today',
      priority: 'High',
      priorityVariant: 'rose' as const,
      icon: AlertCircle,
    },
    {
      id: 2,
      title: 'Send tenant onboarding packet to Safaricom team',
      due: 'Tomorrow',
      priority: 'Normal',
      priorityVariant: 'slate' as const,
      icon: Clock,
    },
    {
      id: 3,
      title: 'Review quarterly SLA response compliance report',
      due: 'In 2 days',
      priority: 'Normal',
      priorityVariant: 'slate' as const,
      icon: Calendar,
    },
  ];

  return (
    <AppShell
      title="Executive Overview"
      subtitle="Ethiopian IT Park Central Management Console"
    >
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Welcome back, {displayName}
              </h1>
              <Badge variant="emerald" size="sm" dot>
                {user?.role?.role_name || 'Administrator'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Operational overview across tenant relationships, pipeline progression, and SLA performance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/leads')}
            >
              View Pipeline
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => navigate('/leads')}
            >
              New Inbound Lead
            </Button>
          </div>
        </div>

        {/* 4 Primary KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{metric.label}</span>
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
                    {metric.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs">
                    <span className="inline-flex items-center font-medium text-emerald-700 font-mono">
                      <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                      {metric.change}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{metric.period}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid: Pipeline Funnel & CRM Business Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline Funnel Stage Distribution (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                    Startup & Enterprise Onboarding Funnel
                  </h2>
                  <p className="text-xs text-slate-500">
                    Progression across official Ethiopian IT Park onboarding stages
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                  Current Cycle
                </span>
              </div>

              <div className="space-y-4 pt-1">
                {pipelineStages.map((stage) => (
                  <div key={stage.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{stage.name}</span>
                      <span className="font-mono text-slate-500">{stage.count} entities</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                        style={{ width: `${stage.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel Health Footer */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Conversion Rate</span>
                <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">
                  {leadMetrics?.conversion_rate_pct ? `${leadMetrics.conversion_rate_pct}%` : '28.6%'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Avg. Qualification</span>
                <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">
                  4.2 Days
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">SLA Compliance</span>
                <span className="text-sm font-bold text-emerald-700 font-mono mt-0.5 block">
                  100% Target
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: CRM Business Widgets */}
          <div className="space-y-6">
            {/* Widget 1: Recent Relationship Activity */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                    Recent Activity
                  </h2>
                  <p className="text-xs text-slate-500">Live tenant & deal updates</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="space-y-3.5">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div key={act.id} className="flex items-start gap-3 text-xs">
                      <div className={`p-1.5 rounded-lg border shrink-0 ${act.iconColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800 truncate">{act.organization}</p>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                            {act.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Widget 2: Priority Tasks & Follow-ups */}
            <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                    Priority Action Items
                  </h2>
                  <p className="text-xs text-slate-500">Pending tasks requiring review</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {priorityTasks.length} Pending
                </span>
              </div>

              <div className="space-y-2.5">
                {priorityTasks.map((task) => {
                  const Icon = task.icon;
                  return (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/60 transition-colors flex items-start justify-between gap-2.5 text-xs"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <Icon className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 leading-snug">
                            {task.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                            Due {task.due}
                          </span>
                        </div>
                      </div>
                      <Badge variant={task.priorityVariant} size="sm">
                        {task.priority}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default DashboardPage;
