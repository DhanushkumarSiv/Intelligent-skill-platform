import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Award, Briefcase, BookOpen, Sparkles, CheckCircle2, UserCheck, ShieldCheck, GraduationCap, Building2, Users, FileText, Layers } from 'lucide-react';

interface NavbarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    onRoleChange(role);
    if (role === 'ACADEMICIAN') {
      navigate('/faculty/profile');
    } else if (role === 'INDUSTRY') {
      navigate('/industry/dashboard');
    } else {
      navigate('/student/skill-passport');
    }
  };

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleRoleSelect(currentRole)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight text-white">SkillIntel</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">MODULE 4</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Academia ↔ Industry Skill Intelligence Platform</p>
            </div>
          </div>

          {/* Persona Switcher Buttons */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => handleRoleSelect('STUDENT')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition ${currentRole === 'STUDENT' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>STUDENT</span>
            </button>

            <button
              onClick={() => handleRoleSelect('ACADEMICIAN')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition ${currentRole === 'ACADEMICIAN' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>FACULTY</span>
            </button>

            <button
              onClick={() => handleRoleSelect('INDUSTRY')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition ${currentRole === 'INDUSTRY' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>INDUSTRY</span>
            </button>
          </div>

        </div>

        {/* Dynamic Navigation Links per Persona */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-900 text-xs scrollbar-none">
          {currentRole === 'STUDENT' && (
            <>
              <NavLink to="/student/skill-passport" className={({ isActive }) => `px-3 py-1.5 rounded-lg font-semibold transition flex items-center space-x-1.5 ${isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}>
                <Award className="w-3.5 h-3.5" />
                <span>Skill Passport</span>
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

          {currentRole === 'ACADEMICIAN' && (
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

          {currentRole === 'INDUSTRY' && (
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
        </div>

      </div>
    </header>
  );
};
