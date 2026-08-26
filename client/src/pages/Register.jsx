import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  { value: 'admin',   label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'member',  label: 'User' },
];

export const Register = () => {
  const [name, setName]                       = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole]                       = useState('member');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [error, setError]                     = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register(name.trim(), email.trim(), password, role);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 text-left">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280] mb-2">
          New Workspace
        </p>
        <h1 className="text-4xl font-extrabold text-black tracking-tight mb-2">
          Create Account
        </h1>
        <p className="text-sm font-medium text-[#6B7280]">
          Start managing your projects and team workflows today.
        </p>
      </div>

      <Card className="w-full">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Full Name */}
          <Input
            id="name-input"
            label="FULL NAME"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />

          {/* Email */}
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

          {/* Role */}
          <div className="w-full flex flex-col space-y-1.5">
            <label
              htmlFor="role-select"
              className="text-xs font-bold uppercase tracking-wider text-black"
            >
              ROLE <span className="text-red-500">*</span>
            </label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white text-black text-sm px-4 py-3 border-2 border-black rounded-none font-medium focus:outline-none focus:bg-amber-50/20 appearance-none cursor-pointer"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <Input
            id="password-input"
            label="PASSWORD"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
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

          {/* Confirm Password */}
          <Input
            id="confirm-password-input"
            label="CONFIRM PASSWORD"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="p-1 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
              Create Account
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-[#6B7280]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-black underline underline-offset-4 hover:bg-[#F5B400] hover:text-black px-1 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
