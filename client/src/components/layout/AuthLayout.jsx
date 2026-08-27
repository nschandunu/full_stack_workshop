import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import Badge from '../ui/Badge';
import './auth-layout.css';

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-shell">
      {/* Top Bar / Brand header */}
      <header className="auth-header">
        <div className="auth-brand">
          <div className="auth-brand-mark">
            <Layers aria-hidden="true" />
          </div>
          <span className="auth-brand-name">
            PLANR<span className="text-[#6B7280]">.SYS</span>
          </span>
        </div>
        <Badge variant="yellow">V2.4</Badge>
      </header>

      {/* Main Content Area */}
      <main className="auth-main">
        {children}
      </main>

      {/* Bottom Footer Info */}
      <footer className="auth-footer">
        <div className="auth-footer-links">
          <Link to="/terms" className="hover:text-black font-semibold underline underline-offset-2 transition-colors cursor-pointer text-gray-700">
            Terms & Conditions
          </Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-black font-semibold underline underline-offset-2 transition-colors cursor-pointer text-gray-700">
            Privacy Policy
          </Link>
          <span>•</span>
          <span className="hover:text-black transition-colors cursor-pointer">Security</span>
          <span>•</span>
          <span className="hover:text-black transition-colors cursor-pointer">System Status</span>
        </div>
        <p className="mt-2 text-[11px] text-gray-400">
          © 2026 PLANR System Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
