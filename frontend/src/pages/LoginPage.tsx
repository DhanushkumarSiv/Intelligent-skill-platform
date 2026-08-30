import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, GraduationCap, BookOpen, Building2, BarChart3, Lock, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { User } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchPersona } = useAuth();
  const [email, setEmail] = useState('alex.chen@student.edu');
  const [password, setPassword] = useState('password123');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let role: User['role'] = 'STUDENT';
    if (email.includes('nit.edu') && email.includes('sarah')) role = 'ACADEMICIAN';
    else if (email.includes('vmware.com') || email.includes('industry')) role = 'INDUSTRY';
    else if (email.includes('dean') || email.includes('admin')) role = 'INSTITUTION_ADMIN';

    const user: User = {
      id: Date.now(),
      username: email.split('@')[0],
      email,
      fullName: email.split('@')[0].toUpperCase(),
      role
    };

    login(user, `jwt-token-${user.id}`);
    redirectToRoleHome(role);
  };

  const handleQuickLogin = (role: User['role']) => {
    switchPersona(role);
    redirectToRoleHome(role);
  };

  const redirectToRoleHome = (role: User['role']) => {
    switch (role) {
      case 'ACADEMICIAN':
        navigate('/faculty/profile');
        break;
      case 'INDUSTRY':
        navigate('/industry/dashboard');
        break;
      case 'INSTITUTION_ADMIN':
        navigate('/institution/dashboard');
        break;
      default:
        navigate('/student/skill-passport');
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/20">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">SkillIntel SaaS Platform Authentication</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Role-Based Access Control (RBAC) governing Students, Academicians, Industry Recruiters, and Institutional Deans.
        </p>
      </div>

      {/* Grid: Quick Demo Preset Logins + Manual Credentials Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quick Demo Logins Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">1-Click Quick Demo Role Logins</h2>
          </div>
          <p className="text-xs text-slate-400">Instantly authenticate as any persona to evaluate role-based access control:</p>

          <div className="space-y-3 pt-1">
            
            <button
              onClick={() => handleQuickLogin('STUDENT')}
              className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-emerald-500/30 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Alex Chen (Student)</h3>
                  <p className="text-[10px] text-slate-400">Verified Skill Passport & Opportunities</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={() => handleQuickLogin('ACADEMICIAN')}
              className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-purple-500/30 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-purple-400 transition">Dr. Sarah Jenkins (Faculty)</h3>
                  <p className="text-[10px] text-slate-400">Research Portfolio & Joint Calls</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={() => handleQuickLogin('INDUSTRY')}
              className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-blue-500/30 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition">Marcus Vance (Industry Recruiter)</h3>
                  <p className="text-[10px] text-slate-400">Post Jobs (AI JD) & Candidate Search</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => handleQuickLogin('INSTITUTION_ADMIN')}
              className="w-full p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-amber-500/30 text-left transition flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition">Dean Dr. Raman (Institution Admin)</h3>
                  <p className="text-[10px] text-slate-400">Gap × Demand Matrix & Analytics</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

          </div>
        </div>

        {/* Manual Credentials Login Form */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lock className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white">Manual Credentials Login</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">Enter user email and password to generate a secure JWT token:</p>

            <form onSubmit={handleCustomLogin} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white text-xs shadow-lg shadow-blue-500/20 hover:opacity-90 transition flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Authenticate & Secure JWT Login</span>
              </button>
            </form>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            🔒 Protected with Spring Security JWT Token Validation
          </div>
        </div>

      </div>

    </div>
  );
};
