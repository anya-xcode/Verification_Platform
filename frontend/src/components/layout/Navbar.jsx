import React from 'react';
import { LogOut, User, Shield } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../ui/Toast';

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { info } = useToast();

  const handleLogout = () => {
    logout();
    info('Logged out securely.');
  };

  return (
    <nav className="h-16 border-b border-white/5 bg-darkBg/60 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
      {/* Brand logo (mobile only) */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="p-1.5 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-black text-white tracking-widest uppercase">VShield</span>
      </div>

      <div className="hidden md:block">
        {/* Placeholder / Empty left spacing */}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-white/80">{user?.name}</span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2.5 rounded-xl hover:bg-rose-500/10 text-white/50 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all duration-300"
          title="Sign Out"
        >
          <LogOut className="w-4.5 h-4.5" />
        </button>
      </div>
    </nav>
  );
};
