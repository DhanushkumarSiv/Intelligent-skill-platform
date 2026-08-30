import React from 'react';
import { Building2, PlusCircle, Search, Users, Briefcase, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IndustryDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Industry Recruiter & Talent Portal</h1>
              <p className="text-xs text-slate-400 mt-1">Hire verified talent using AST code parser findings, test benchmarks, and explainable skill matching.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/industry/opportunities/create')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Opportunity</span>
            </button>
            <button
              onClick={() => navigate('/industry/candidates')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
            >
              <Search className="w-4 h-4" />
              <span>Search Candidates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Active Postings</p>
          <p className="text-3xl font-black text-white mt-1">3</p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">🟢 Accepting Applications</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Total Applicants</p>
          <p className="text-3xl font-black text-blue-400 mt-1">14</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Verified Skill Passports</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Shortlisted Candidates</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">5</p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">⭐ Interview Ready</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Top Match Candidate</p>
          <p className="text-3xl font-black text-purple-400 mt-1">92%</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Alex Chen (Java, Spring Boot)</span>
        </div>
      </div>

    </div>
  );
};
