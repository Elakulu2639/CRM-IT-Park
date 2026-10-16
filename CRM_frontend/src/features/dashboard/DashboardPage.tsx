import React from 'react';
import {
  Users2,
  Building2,
  Briefcase,
  TicketCheck,
  TrendingUp,
  Plus,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AppShell from '../../components/layout/AppShell';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const metrics = [
    {
      label: 'Active Leads Pipeline',
      value: '142',
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
      label: 'Open Support Tickets',
      value: '9',
      change: '100% SLA',
      period: 'all on schedule',
      icon: TicketCheck,
      variant: 'purple' as const,
    },
  ];

  const pipelineStages = [
    { name: 'New Inbound Lead', count: 42, pct: 100, color: 'bg-emerald-600' },
    { name: 'Contacted & Discovery', count: 36, pct: 85, color: 'bg-emerald-500' },
    { name: 'Proposal / Due Diligence', count: 24, pct: 57, color: 'bg-sky-500' },
    { name: 'Incubation Agreement', count: 18, pct: 42, color: 'bg-indigo-500' },
    { name: 'Active Park Tenant', count: 12, pct: 28, color: 'bg-slate-700' },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Admin Session Initialized',
      actor: `${user?.full_name || 'System Administrator'}`,
      role: user?.role?.role_name || 'Admin',
      time: 'Just now',
      type: 'auth',
    },
    {
      id: 2,
      title: 'Database Schema Migrated',
      actor: 'System Engine',
      role: 'PostgreSQL 16',
      time: '28 tables linked',
      type: 'system',
    },
    {
      id: 3,
      title: 'SLA Escalation Scheduler Active',
      actor: 'Queue Worker',
      role: 'Redis 7',
      time: 'Cron cycle running',
      type: 'cron',
    },
    {
      id: 4,
      title: 'Scramble OpenAPI Generated',
      actor: 'API Gateway',
      role: 'Laravel 11',
      time: 'Docs available at /docs/api',
      type: 'api',
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
                Welcome back, {user?.first_name || 'Administrator'}
              </h1>
              <Badge variant="emerald" size="sm" dot>
                {user?.role?.role_name || 'Admin'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Session authenticated via Laravel Sanctum. All systems operational.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="http://localhost:8000/docs/api"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                API Docs
              </Button>
            </a>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => alert('Lead ingestion module is ready for development!')}
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

        {/* Main Grid: Pipeline Funnel & System Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline Funnel Stage Distribution (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Startup & Client Pipeline Funnel
                </h2>
                <p className="text-xs text-slate-500">
                  Progression across official Ethiopian IT Park onboarding stages
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                Active Cycle
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

          {/* Infrastructure Health & Recent Events (1 col) */}
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
                  System Health & Audit
                </h2>
                <p className="text-xs text-slate-500">Live infrastructure nodes</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Micro System Service Indicators */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">PostgreSQL</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 38 Tables
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Redis Queue</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active (7.0)
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Auth Provider</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sanctum
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Mailpit SMTP</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Port 1025
                </span>
              </div>
            </div>

            {/* Audit Log Timeline */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Recent Audit Trail
              </span>
              <div className="space-y-3">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-2.5 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">{act.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {act.actor} · <span className="font-mono">{act.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default DashboardPage;
