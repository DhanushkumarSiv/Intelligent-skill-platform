import React, { useEffect, useState } from 'react';
import { Building2, PlusCircle, Search, Users, Briefcase, Award, ArrowRight, ShieldCheck, CheckCircle2, Star, Clock, Filter, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Application } from '../types';

export const IndustryDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Load student applications submitted via the platform
    const savedAppsJson = localStorage.getItem('skillintel_submitted_applications');
    if (savedAppsJson) {
      try {
        setApplications(JSON.parse(savedAppsJson));
      } catch (e) {
        setApplications(defaultApplications);
      }
    } else {
      setApplications(defaultApplications);
    }
  }, []);

  const defaultApplications: Application[] = [
    {
      id: 1,
      opportunityId: 1,
      opportunityTitle: "Junior Java Backend Microservices Engineer",
      companyName: "VMware / Broadcom",
      studentProfileId: 1,
      studentName: "Alex Chen",
      status: "APPLIED",
      appliedAt: "2026-08-30 23:50",
      coverNote: "Strong background in Spring Boot 3 microservices and verified Java AST static code analysis score of 92/100."
    },
    {
      id: 2,
      opportunityId: 2,
      opportunityTitle: "AI / ML Research Engineer",
      companyName: "Google Cloud",
      studentProfileId: 2,
      studentName: "Priya Sharma",
      status: "UNDER_REVIEW",
      appliedAt: "2026-08-29 18:30",
      coverNote: "Experienced in PyTorch deep neural networks, computer vision models, and GCP Vertex AI deployment."
    }
  ];

  const handleUpdateStatus = (appId: number, newStatus: 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED') => {
    const updated = applications.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    setApplications(updated);
    localStorage.setItem('skillintel_submitted_applications', JSON.stringify(updated));
    setActionSuccess(`✅ Status for application #${appId} updated to "${newStatus}"!`);
  };

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
              <p className="text-xs text-slate-400 mt-1">Review live student applications, verified AST code findings, test benchmarks & explainable skill matches.</p>
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
          <p className="text-3xl font-black text-white mt-1">4</p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">🟢 Accepting Live Applications</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Live Applications Received</p>
          <p className="text-3xl font-black text-blue-400 mt-1">{applications.length}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Real-time Student Submissions</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Shortlisted Candidates</p>
          <p className="text-3xl font-black text-emerald-400 mt-1">
            {applications.filter(a => a.status === 'SHORTLISTED' || a.status === 'ACCEPTED').length}
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">⭐ Interview Ready</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Top Match Candidate</p>
          <p className="text-3xl font-black text-purple-400 mt-1">92%</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Alex Chen (Java 92, Spring Boot 85)</span>
        </div>
      </div>

      {/* Action Notification */}
      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span>{actionSuccess}</span>
          <button onClick={() => setActionSuccess(null)}>✕</button>
        </div>
      )}

      {/* Applied Job Candidates Hub */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Applied Job Candidates & Student Applications</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Live applications submitted by candidates via verified digital skill passports.</p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            {applications.length} APPLICANTS ACTIVE
          </span>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-slate-700 transition">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-lg font-black text-white shadow-md">
                    {app.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-white">{app.studentName}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">CSE • CGPA 8.85</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Applied for: <strong className="text-white">{app.opportunityTitle}</strong> ({app.companyName})</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                    app.status === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                    app.status === 'SHORTLISTED' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/40'
                  }`}>
                    {app.status}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">92% MATCH</span>
                </div>
              </div>

              {/* Cover Note & Verified Skill Badges */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <p className="text-slate-300 italic">"{app.coverNote}"</p>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Skill Passport:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">Java 92/100 (AST)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">Spring Boot 85/100 (MCQ)</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20">SQL 88/100 (Cert)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">Docker 75/100 (Mentor)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                <span className="text-slate-400 text-[11px]">Applied on {app.appliedAt}</span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/student/skill-passport')}
                    className="px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold transition flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Review Passport</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(app.id, 'SHORTLISTED')}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 font-bold transition"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold transition"
                  >
                    Accept Candidate
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
