import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Award, BookOpen, Code2, FolderGit2, ShieldCheck, UserCheck, Target, CheckSquare } from 'lucide-react';

interface NavbarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange }) => {
  const location = useLocation();

  const navLinks = [
    { path: '/student/skill-passport', label: 'Skill Passport', icon: ShieldCheck },
    { path: '/student/skills', label: 'My Skills', icon: UserCheck },
    { path: '/student/skill-gaps', label: 'Skill Gaps', icon: Target },
    { path: '/student/learning', label: 'Learning Paths', icon: BookOpen },
    { path: '/student/assessment', label: 'Assessment', icon: CheckSquare },
    { path: '/student/github', label: 'GitHub Evidence', icon: Code2 },
    { path: '/student/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/student/certificates', label: 'Certificates', icon: Award },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SkillIntel
              </span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Module 1
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Role Switcher for Demo */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 font-medium">Demo Role:</span>
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="bg-transparent text-xs font-semibold text-emerald-400 focus:outline-none cursor-pointer"
              >
                <option value="STUDENT" className="bg-slate-900 text-slate-200">STUDENT (Alex Chen)</option>
                <option value="INDUSTRY" className="bg-slate-900 text-slate-200">INDUSTRY (TechCorp HR)</option>
                <option value="ACADEMICIAN" className="bg-slate-900 text-slate-200">FACULTY (Prof. Vance)</option>
                <option value="INSTITUTION_ADMIN" className="bg-slate-900 text-slate-200">ADMIN (Dean Miller)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                AC
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-200">Alex Chen</p>
                <p className="text-[10px] text-slate-400">Backend Dev</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
