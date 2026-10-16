import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Building,
  CheckCircle,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your corporate email and password.');
      return;
    }

    try {
      setIsLoading(true);
      await login({ email: email.trim(), password, remember });
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }).response;
        const msg = response?.data?.message || response?.data?.errors?.email?.[0] || 'Authentication failed. Please verify your credentials.';
        setErrorMessage(msg);
      } else {
        setErrorMessage('Unable to connect to the CRM authentication server. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fillQuickCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* Left Brand Panel (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Subtle geometric background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center font-bold text-white text-base tracking-wider shadow-md ring-1 ring-white/10">
            ITP
          </div>
          <div>
            <span className="font-semibold text-base tracking-tight text-white block">
              Ethiopian IT Park
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              Enterprise CRM Portal
            </span>
          </div>
        </div>

        {/* Center Presentation */}
        <div className="relative z-10 space-y-8 max-w-lg my-auto">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>Official Government & Enterprise Platform</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Centralized Relationship & Pipeline Infrastructure
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering Ethiopian IT Park to manage relationships with startups,
              international corporate tenants, investors, and incubation cohorts under rigorous SLA oversight.
            </p>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
              <div className="text-xl font-bold text-emerald-400 font-mono">38</div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">Database Tables</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
              <div className="text-xl font-bold text-emerald-400 font-mono">4 Tiers</div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">Role Governance</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
              <div className="text-xl font-bold text-emerald-400 font-mono">99.9%</div>
              <div className="text-[11px] text-slate-300 font-medium mt-0.5">SLA Target</div>
            </div>
          </div>

          {/* Compliance bullet points */}
          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Role-Based Access Control (Admin, Manager, BDO, Support)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sanctum Token Authentication with Session Rate-Limiting</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Audit Trail & SLA Escalation Monitoring</span>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 pt-6 border-t border-slate-800">
          <span>SRS v1.0 & Schema v2.0 Compliant</span>
          <span className="font-mono">Ethiopian IT Park © 2026</span>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Mobile branding header */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-white text-sm">
              ITP
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight text-slate-900 block">
                Ethiopian IT Park
              </span>
              <span className="text-[11px] text-slate-500 font-mono">CRM Core</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500">
              Enter your credentials to access the Ethiopian IT Park CRM system.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <Alert
              variant="error"
              title="Authentication Error"
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Corporate Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@itpark.gov.et"
              required
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter account password"
                required
                showPasswordToggle
                autoComplete="current-password"
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded-xs border-slate-300 text-emerald-700 focus:ring-emerald-600 h-4 w-4"
                />
                <span>Remember this workstation</span>
              </label>

              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password resets are managed by your system administrator.');
                }}
                className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full font-semibold shadow-sm"
            >
              Sign In to CRM
            </Button>
          </form>

          {/* Quick-fill Demo Accounts for Development */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Seeded Test Account
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Local Dev</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fillQuickCredentials('admin@itpark.gov.et', 'password')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin</span>
                <span className="text-[10px] text-slate-400 font-mono">(admin@itpark.gov.et)</span>
              </button>
            </div>
          </div>

          {/* Security Notice Footer */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-400 inline-flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Encrypted via Laravel Sanctum & PostgreSQL 16</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
