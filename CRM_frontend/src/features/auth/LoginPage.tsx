import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
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

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCredentialError, setHasCredentialError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setHasCredentialError(false);

    if (!email.trim()) {
      setErrorMessage('Please enter your email.');
      emailInputRef.current?.focus();
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      passwordInputRef.current?.focus();
      return;
    }

    try {
      setIsLoading(true);
      await login({ email: email.trim(), password, remember });
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as {
          response?: {
            status?: number;
            data?: {
              message?: string;
              errors?: Record<string, string[]>;
            };
          };
        };

        const status = axiosErr.response?.status;
        const responseData = axiosErr.response?.data;

        if (status === 403) {
          setErrorMessage(responseData?.message || 'This account has been deactivated. Please contact a CRM administrator.');
          setHasCredentialError(true);
        } else if (status === 429 || (responseData?.errors?.email?.[0] && responseData.errors.email[0].toLowerCase().includes('too many'))) {
          setErrorMessage(responseData?.errors?.email?.[0] || responseData?.message || 'Too many login attempts. Please try again later.');
          setPassword('');
          setTimeout(() => passwordInputRef.current?.focus(), 50);
        } else if (status === 401 || status === 422) {
          // Explicit invalid credential response
          setErrorMessage('Invalid email or password');
          setHasCredentialError(true);
          setPassword('');
          setTimeout(() => passwordInputRef.current?.focus(), 50);
        } else {
          // Server error (500, 502, 503, etc.)
          setErrorMessage(responseData?.message || 'Server error. Please try again.');
        }
      } else {
        setErrorMessage('Unable to connect to the CRM authentication server. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-slate-50 selection:bg-emerald-600 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ethiopian IT Park
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Enterprise CRM Portal
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Sign in to your account
            </h2>
            <p className="text-xs text-slate-500">
              Enter your credentials to access the CRM system.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <Alert
              variant="error"
              title="Authentication Error"
              onClose={() => {
                setErrorMessage(null);
                setHasCredentialError(false);
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              ref={emailInputRef}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (hasCredentialError) {
                  setHasCredentialError(false);
                  setErrorMessage(null);
                }
              }}
              placeholder="Enter your email"
              required
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <div className="space-y-1">
              <Input
                ref={passwordInputRef}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (hasCredentialError) {
                    setHasCredentialError(false);
                    setErrorMessage(null);
                  }
                }}
                placeholder="Enter your password"
                required
                showPasswordToggle
                autoComplete="current-password"
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded-xs border-slate-300 text-emerald-700 focus:ring-emerald-600 h-4 w-4"
                />
                <span>Remember me</span>
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
              className="w-full font-semibold shadow-sm mt-2"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Security Notice Footer */}
        <div className="text-center">
          <p className="text-[11px] text-slate-400 inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Official Platform • Ethiopian IT Park © 2026</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
