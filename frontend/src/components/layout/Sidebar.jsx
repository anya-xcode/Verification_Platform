import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, Users, UserPlus } from 'lucide-react';

export const Sidebar = () => {
  const links = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/candidates', label: 'Candidates', icon: <Users className="w-5 h-5" /> },
    { to: '/candidates/new', label: 'Add Candidate', icon: <UserPlus className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-darkBg/30 flex flex-col h-screen sticky top-0 flex-shrink-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-white/5">
        <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-lg font-black tracking-widest text-white uppercase">VShield</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide border transition-all duration-300 ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.15)]'
                  : 'text-white/55 hover:text-white border-transparent hover:bg-white/5'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
