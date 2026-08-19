import React from 'react';
import { Layers } from 'lucide-react';
import Badge from '../ui/Badge';

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#EEF1F3] flex flex-col justify-between items-center px-4 py-8 sm:py-12 selection:bg-[#F5B400] selection:text-black">
      {/* Top Bar / Brand header */}
      <header className="w-full max-w-[440px] flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 bg-black flex items-center justify-center border-2 border-black">
            <Layers className="w-5 h-5 text-[#F5B400]" />
          </div>
          <span className="text-xl font-black tracking-tight text-black uppercase">
            PLANR<span className="text-[#6B7280]">.SYS</span>
          </span>
        </div>
        <Badge variant="yellow">V2.4</Badge>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[440px] my-auto">
        {children}
      </main>

      {/* Bottom Footer Info */}
      <footer className="w-full max-w-[440px] mt-8 text-center text-xs font-semibold text-[#6B7280]">
        <div className="flex items-center justify-center space-x-4">
          <span className="hover:text-black transition-colors cursor-pointer">Security</span>
          <span>•</span>
          <span className="hover:text-black transition-colors cursor-pointer">Privacy</span>
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
