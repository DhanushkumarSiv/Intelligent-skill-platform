import React, { useEffect, useState } from 'react';
import { Users, Award, ShieldCheck, Search, Sparkles } from 'lucide-react';
import { DigitalSkillPassport } from '../types';
import { fetchSkillPassport } from '../services/api';

export const FacultyStudentsPage: React.FC = () => {
  const [passport, setPassport] = useState<DigitalSkillPassport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillPassport(1).then(data => {
      setPassport(data);
      setLoading(false);
    });
  }, []);

  if (loading || !passport) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-purple-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Institutional Student Skill Intelligence Audit</h1>
            <p className="text-xs text-slate-400 mt-0.5">Faculty dashboard monitoring student skill verification, GitHub evidence, and industry benchmarks.</p>
          </div>
        </div>
      </div>

      {/* Student Audit Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white text-lg">
              {passport.studentName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{passport.studentName}</h2>
              <p className="text-xs text-slate-400">@{passport.gitHubUsername} • {passport.email}</p>
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center min-w-[120px]">
            <p className="text-[10px] text-slate-400 uppercase">Passport Score</p>
            <p className="text-2xl font-black text-emerald-400">{passport.overallScore}/100</p>
          </div>
        </div>

        {/* Skill Evidence Table */}
        <div className="pt-2 space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase">Verified Skill Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {passport.skills.map((sk) => (
              <div key={sk.skillId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{sk.skillName}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {sk.verifiedScore}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">{sk.evidenceCount} verified evidence sources</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
