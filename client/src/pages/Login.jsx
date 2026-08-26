import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import './login.css';

export const Login = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    try {
      await login(email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
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

      {/* Card */}
      <Card className="login-card">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />

          {error && (
            <p className="text-sm font-semibold text-red-600 border-2 border-red-600 bg-red-50 px-4 py-2" role="alert">
              {error}
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              icon={<ArrowRight className="w-5 h-5 ml-1 stroke-[2.5]" />}
            >
              Sign In
            </Button>
          </div>
        </form>
      </Card>

      {/* Footer */}
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
