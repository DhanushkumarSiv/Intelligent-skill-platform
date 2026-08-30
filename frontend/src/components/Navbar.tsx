import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Award, Briefcase, BookOpen, Sparkles, ShieldCheck, GraduationCap, Building2, Users, BarChart3, TrendingUp, LogOut, UserCheck, ChevronDown, Target } from 'lucide-react';
import { User } from '../types';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, switchPersona } = useAuth();
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);

  const currentRole = user?.role || 'STUDENT';

  const handleRoleSelect = (role: User['role']) => {
    switchPersona(role);
    setShowSwitchDropdown(false);
    if (role === 'INSTITUTION_ADMIN') {
      navigate('/institution/dashboard');
    } else if (role === 'ACADEMICIAN') {
      navigate('/faculty/profile');
    } else if (role === 'INDUSTRY') {
      navigate('/industry/dashboard');
    } else {
      navigate('/student/skill-passport');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'INSTITUTION_ADMIN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">DEAN / ADMIN</span>;
      case 'ACADEMICIAN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">FACULTY</span>;
      case 'INDUSTRY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30">INDUSTRY</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">STUDENT</span>;
    }
  };

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/student/skill-passport')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight text-white">SkillIntel</span>
                {user && getRoleBadge(user.role)}
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Academia ↔ Industry Skill Intelligence SaaS</p>
            </div>
          </div>

          {/* User Session & Role Switcher */}
          {user ? (
            <div className="flex items-center space-x-3">
              
              {/* Persona Quick Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-200 transition"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Role Switcher</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showSwitchDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 text-xs space-y-1 animate-scale-in">
                    <span className="text-[10px] font-bold text-slate-500 px-2.5 py-1 block uppercase">Switch Demo Role</span>
                    
                    <button
                      onClick={() => handleRoleSelect('STUDENT')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 font-bold transition ${currentRole === 'STUDENT' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-900'}`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Student (Alex Chen)</span>
                    </button>

                    <button
                      onClick={() => handleRoleSelect('ACADEMICIAN')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 font-bold transition ${currentRole === 'ACADEMICIAN' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-slate-900'}`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Faculty (Dr. Sarah)</span>
                    </button>

                    <button
                      onClick={() => handleRoleSelect('INDUSTRY')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 font-bold transition ${currentRole === 'INDUSTRY' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-900'}`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Industry (Marcus V.)</span>
                    </button>

                    <button
                      onClick={() => handleRoleSelect('INSTITUTION_ADMIN')}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center space-x-2 font-bold transition ${currentRole === 'INSTITUTION_ADMIN' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-300 hover:bg-slate-900'}`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Institution (Dean)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar & Logout */}
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  {user.fullName.substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-white leading-tight">{user.fullName}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <NavLink to="/login" className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow transition">
              Sign In
            </NavLink>
          )}

        </div>

        {/* Dynamic Nav Links Strictly Filtered by Active Role */}
        {user && (
          <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-900 text-xs scrollbar-none">
            
            {user.role === 'STUDENT' && (
              <>
                <NavLink to="/student/skill-passport" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <Award className="w-3.5 h-3.5" />
                  <span>Skill Passport</span>
                </NavLink>
                <NavLink to="/student/target-role" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <Target className="w-3.5 h-3.5" />
                  <span>Target Role & Proof</span>
                </NavLink>
                <NavLink to="/student/skills" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Verified Skills</span>
                </NavLink>
                <NavLink to="/student/skill-gaps" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Skill Gaps</span>
                </NavLink>
                <NavLink to="/student/learning" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Learning Paths</span>
                </NavLink>
                <NavLink to="/student/opportunities" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1 ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Opportunities</span>
                </NavLink>
                <NavLink to="/student/mentorship" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1 ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <Users className="w-3.5 h-3.5" />
                  <span>Mentorship</span>
                </NavLink>
                <NavLink to="/student/collaborations" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Collaborations</span>
                </NavLink>
                <NavLink to="/student/internships" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>My Internships</span>
                </NavLink>
              </>
            )}

            {user.role === 'ACADEMICIAN' && (
              <>
                <NavLink to="/faculty/profile" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${isActive ? 'bg-purple-900/40 text-purple-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Faculty Portfolio</span>
                </NavLink>
                <NavLink to="/faculty/collaborations" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-purple-900/40 text-purple-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Industry Calls & Research</span>
                </NavLink>
                <NavLink to="/faculty/students" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-purple-900/40 text-purple-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Student Intelligence Audit</span>
                </NavLink>
              </>
            )}

            {user.role === 'INDUSTRY' && (
              <>
                <NavLink to="/industry/dashboard" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${isActive ? 'bg-blue-900/40 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Recruiter Portal</span>
                </NavLink>
                <NavLink to="/industry/opportunities/create" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-blue-900/40 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Post Opportunity (AI JD)</span>
                </NavLink>
                <NavLink to="/industry/candidates" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-blue-900/40 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Candidate Search Engine</span>
                </NavLink>
                <NavLink to="/industry/collaborations" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-blue-900/40 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Faculty Search & Joint Calls</span>
                </NavLink>
                <NavLink to="/industry/mentors" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-blue-900/40 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Mentors & Feedback</span>
                </NavLink>
              </>
            )}

            {user.role === 'INSTITUTION_ADMIN' && (
              <>
                <NavLink to="/institution/dashboard" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Institution Overview</span>
                </NavLink>
                <NavLink to="/institution/skill-gaps" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Student Skill Gaps</span>
                </NavLink>
                <NavLink to="/institution/industry-demand" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Industry Demand</span>
                </NavLink>
                <NavLink to="/institution/gap-demand" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Gap × Demand Matrix</span>
                </NavLink>
                <NavLink to="/institution/departments" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Department Comparison</span>
                </NavLink>
                <NavLink to="/institution/placements" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>Placement Funnel</span>
                </NavLink>
                <NavLink to="/institution/curriculum" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1 ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-slate-200'}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curriculum Intelligence</span>
                </NavLink>
              </>
            )}

          </div>
        )}

      </div>
    </header>
  );
};
