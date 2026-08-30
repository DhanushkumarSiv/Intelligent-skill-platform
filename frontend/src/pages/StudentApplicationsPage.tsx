import React, { useEffect, useState } from 'react';
import { FileText, Building2, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Application } from '../types';
import { fetchStudentApplications } from '../services/api';

export const StudentApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentApplications(1).then(data => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SELECTED':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🎉 SELECTED</span>;
      case 'SHORTLISTED':
      case 'INTERVIEW':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">⭐ {status}</span>;
      case 'UNDER_REVIEW':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">⏳ UNDER REVIEW</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30">📩 APPLIED</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">My Submitted Applications</h1>
            <p className="text-xs text-slate-400 mt-0.5">Track your opportunity applications submitted with your Verified Skill Passport.</p>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-white">{app.opportunityTitle}</h2>
                <p className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <strong className="text-slate-200">{app.companyName}</strong>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Applied on {app.appliedAt}</span>
                </p>
              </div>

              {getStatusBadge(app.status)}
            </div>

            {app.coverNote && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-500 font-semibold block mb-0.5">Cover Note:</span>
                <p>{app.coverNote}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
