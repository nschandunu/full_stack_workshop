import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export const Register = () => {
  return (
    <div className="w-full">
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

      <Card className="w-full text-center space-y-6">
        <p className="text-sm text-[#6B7280]">
          Registration interface stub (Frontend Demo).
        </p>
        <Link to="/login" className="block w-full">
          <Button
            variant="primary"
            fullWidth
            icon={<ArrowLeft className="w-5 h-5 ml-1 stroke-[2.5]" />}
          >
            Back to Sign In
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Register;
