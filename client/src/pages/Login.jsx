import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { MOCK_USER } from '../data/mockData';
import './login.css';

/**
 * Login Page Component
 * Neo-Brutalist, high-contrast, flat design with border-based separation.
 * Frontend-only state and dummy submission logic.
 */
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        'planr-demo-session',
        JSON.stringify({ email: email.trim(), rememberMe }),
      );
      navigate('/dashboard', { replace: true });
    }, 600);
  };

  const handleFillDemoCredentials = () => {
    setEmail(MOCK_USER.email);
    setPassword('DemoPassword2026!');
    setRememberMe(true);
  };

  return (
    <div className="login-page">
      {/* Header Section */}
      <div className="login-intro">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-2">
          Welcome back
        </p>
        <h1 className="text-4xl font-extrabold text-black tracking-tight mb-2">
          Sign In
        </h1>
        <p className="text-sm font-medium text-[#6B7280]">
          Access your projects, tasks, and team activity.
        </p>
      </div>

      {/* Main Login Card */}
      <Card className="login-card">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          {/* Email Field */}
          <Input
            id="email-input"
            label="EMAIL"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          {/* Password Field with Show/Hide Toggle */}
          <Input
            id="password-input"
            label="PASSWORD"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2.5 cursor-pointer select-none font-bold text-black">
              <input
                id="remember-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                alert('Forgot Password clicked (Frontend Demo)');
              }}
              className="font-bold text-[#6B7280] hover:text-black hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              Forgot password?
            </a>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              icon={<ArrowRight className="w-5 h-5 ml-1 stroke-[2.5]" />}
            >
              Sign In
            </Button>
          </div>
        </form>

        {/* Quick Demo Autofill helper button */}
        <div className="mt-5 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Demo helper:
          </span>
          <button
            type="button"
            onClick={handleFillDemoCredentials}
            className="text-xs font-bold text-black bg-[#EEF1F3] border-2 border-black px-2.5 py-1 hover:bg-[#F5B400] transition-colors focus:outline-none focus:ring-2 focus:ring-black"
          >
            Autofill Test User
          </button>
        </div>
      </Card>

        {error && <p className="login-error" role="alert">{error}</p>}

      {/* Footer link below card */}
      <div className="login-signup">
        <p className="text-sm font-medium text-[#6B7280]">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-black underline underline-offset-4 hover:bg-[#F5B400] hover:text-black px-1 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
