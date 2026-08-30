import React, { useEffect, useState } from 'react';
import { BarChart3, Users, Award, Briefcase, CheckCircle2, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { InstitutionDashboard } from '../types';
import { fetchInstitutionDashboard } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const InstitutionDashboardPage: React.FC = () => {
  const [data, setData] = useState<InstitutionDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutionDashboard(1).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950/40 p-6 md:p-8 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{data.institutionName}</h1>
              <p className="text-xs text-slate-400 mt-0.5">Institutional Skill Intelligence, Placement Funnel, & Curriculum Decision Support</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 w-fit">
            EXECUTIVE DASHBOARD
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-semibold uppercase">Total Students</p>
          <p className="text-3xl font-black text-white mt-1">{data.totalStudents.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Enrolled Across All Depts</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-semibold uppercase">Assessed</p>
          <p className="text-3xl font-black text-blue-400 mt-1">{data.assessedStudents.toLocaleString()}</p>
          <span className="text-[10px] text-blue-400 font-semibold mt-1 block">83% Participation</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-semibold uppercase">Placement Ready</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">{data.placementReadyStudents.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">58% Benchmark Score</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-semibold uppercase">Active Internships</p>
          <p className="text-3xl font-black text-purple-400 mt-1">{data.internshipStudents.toLocaleString()}</p>
          <span className="text-[10px] text-purple-400 font-semibold mt-1 block">30% Industry Active</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-semibold uppercase">Placed Candidates</p>
          <p className="text-3xl font-black text-amber-400 mt-1">{data.placedStudents.toLocaleString()}</p>
          <span className="text-[10px] text-amber-400 font-semibold mt-1 block">51% Offers Secured</span>
        </div>

      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div onClick={() => navigate('/institution/gap-demand')} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 cursor-pointer space-y-2">
          <div className="flex items-center space-x-3 text-amber-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">Gap × Demand Matrix</h2>
          </div>
          <p className="text-xs text-slate-400">Identify high-demand skills with low student proficiency to trigger urgent interventions.</p>
        </div>

        <div onClick={() => navigate('/institution/departments')} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 cursor-pointer space-y-2">
          <div className="flex items-center space-x-3 text-purple-400">
            <Building2 className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">Department Comparisons</h2>
          </div>
          <p className="text-xs text-slate-400">Compare CSE (82%), IT (77%), and ECE (68%) on readiness scores and top gaps.</p>
        </div>

        <div onClick={() => navigate('/institution/curriculum')} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 cursor-pointer space-y-2">
          <div className="flex items-center space-x-3 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">Curriculum Intelligence</h2>
          </div>
          <p className="text-xs text-slate-400">View automated academic recommendations (Workshops, Electives, FDPs).</p>
        </div>
      </div>

    </div>
  );
};
