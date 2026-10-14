import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users2,
  Building2,
  Contact2,
  Briefcase,
  TicketCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Search,
  Menu,
  X,
  Mail,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../ui/Badge';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  title = 'Overview',
  subtitle = 'Ethiopian IT Park Relationship Management',
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Leads Pipeline', to: '/leads', icon: Users2 },
    { label: 'Corporate Accounts', to: '/accounts', icon: Building2 },
    { label: 'Contacts', to: '/contacts', icon: Contact2 },
    { label: 'Deals & Opportunities', to: '/opportunities', icon: Briefcase },
    { label: 'Support & Tickets', to: '/tickets', icon: TicketCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased text-slate-900">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-xs">
            ITP
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-slate-900 block leading-tight">
              Ethiopian IT Park
            </span>
            <span className="text-[10px] text-slate-500 font-mono">CRM Core</span>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md border border-slate-200 hover:bg-slate-50"
          aria-label="Toggle navigation"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
          fixed md:sticky top-0 z-50 md:z-auto h-screen w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0
          transition-transform duration-200 ease-in-out border-r border-slate-800
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-inner ring-1 ring-white/10">
              ITP
            </div>
            <div>
              <h1 className="font-semibold text-sm tracking-tight text-white leading-tight">
                Ethiopian IT Park
              </h1>
              <p className="text-[11px] text-emerald-400 font-medium">Enterprise CRM</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-emerald-800/80 text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0 text-slate-300" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            );
          })}

          <div className="pt-5 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            Developer & System
          </div>

          <a
            href="http://localhost:8000/docs/api"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 shrink-0 text-slate-300" />
              <span>Swagger / API Docs</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-mono">
              v1.0
            </span>
          </a>

          <a
            href="http://localhost:8025"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 shrink-0 text-slate-300" />
              <span>Mailpit Mailbox</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-emerald-950 text-emerald-400 font-mono">
              Live
            </span>
          </a>
        </div>

        {/* User Session Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-100 font-semibold text-xs flex items-center justify-center shrink-0 ring-1 ring-emerald-500/20">
                {user?.first_name?.[0] || 'U'}
                {user?.last_name?.[0] || ''}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate leading-tight">
                  {user?.full_name || user?.email}
                </p>
                <p className="text-[10px] text-slate-300 truncate font-mono">
                  {user?.role?.role_name || 'Staff User'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-md text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Utility Header */}
        <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 tracking-tight leading-none">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-slate-500 mt-0.5 tracking-tight hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Environment Badge */}
            <Badge variant="emerald" size="sm" dot>
              PostgreSQL Connected
            </Badge>

            {/* Quick Search Cue */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 text-xs border border-slate-200">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search records...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-slate-300 rounded-sm font-mono text-slate-600 shadow-2xs">
                ⌘K
              </kbd>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 pl-2 border-l border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium text-slate-700">{user?.role?.role_name || 'Active'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
