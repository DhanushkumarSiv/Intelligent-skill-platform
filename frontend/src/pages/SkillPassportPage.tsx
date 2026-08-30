import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, FileCode, CheckSquare, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { SkillPassport, StudentSkill } from '../types';
import { fetchSkillPassport } from '../services/api';
import { EvidenceModal } from '../components/EvidenceModal';

export const SkillPassportPage: React.FC = () => {
  const [passport, setPassport] = useState<SkillPassport | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<StudentSkill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSkillPassport(1).then((data) => {
      setPassport(data);
      setLoading(false);
    });
  }, []);

  if (loading || !passport) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Radar chart data preparation
  const radarData = passport.skills.map(s => ({
    skill: s.skillName,
    Verified: s.verifiedScore || 0,
    Assessed: s.assessmentScore || 0,
    Claimed: s.selfDeclaredScore || 0,
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">🟢 VERIFIED</span>;
      case 'ASSESSED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">🔵 ASSESSED</span>;
      case 'EVIDENCE_FOUND':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">🟡 EVIDENCE FOUND</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">⚪ SELF DECLARED</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-500/20">
              AC
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">{passport.studentName}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  VERIFIED PASSPORT
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Target Role: <strong className="text-slate-200">{passport.targetRole}</strong> | GitHub: <code className="text-blue-400 font-mono">@{passport.gitHubUsername}</code>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
            <div className="text-center px-3">
              <p className="text-xs text-slate-400 font-medium">Passport Score</p>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">{passport.overallPassportScore}</p>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-center px-3">
              <p className="text-xs text-slate-400 font-medium">Verified Skills</p>
              <p className="text-2xl font-black text-blue-400 mt-0.5">{passport.totalVerifiedSkills}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Radar Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Verified Skill Radar</span>
            </h2>
            <span className="text-xs text-slate-400">Deterministic Multi-Source Vector</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Verified Score" dataKey="Verified" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name="Assessed" dataKey="Assessed" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Breakdown */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>Skill Level Comparison</span>
            </h2>
            <span className="text-xs text-slate-400">Score / 100</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={radarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="skill" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="Verified" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Assessed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Skill Passport Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Digital Skill Passport Entries</h2>
            <p className="text-xs text-slate-400">Evidence-backed skill scores verified by AST code parsing, assessments, and certificate checks.</p>
          </div>

          {/* Status Indicators Legend */}
          <div className="hidden sm:flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Verified</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Assessed</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Evidence</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
              <span>Claimed</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {passport.skills.map((skill) => (
            <div key={skill.id} className="glass-card glass-card-hover rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{skill.skillName}</h3>
                    <span className="text-[11px] text-slate-400">{skill.category}</span>
                  </div>
                  {getStatusBadge(skill.verificationStatus)}
                </div>

                {/* Score Bar */}
                <div className="space-y-1.5 my-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Verified Score</span>
                    <span className="text-emerald-400 font-bold">{skill.verifiedScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.verifiedScore >= 75 ? 'bg-emerald-500' : skill.verifiedScore >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.verifiedScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Evidence Pill Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {skill.evidenceList.map((ev) => (
                    <span key={ev.id} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {ev.source.replace('_', ' ')}: {ev.score}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Evidence Action */}
              <button
                onClick={() => setSelectedSkill(skill)}
                className="mt-5 w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition"
              >
                <Eye className="w-4 h-4" />
                <span>View Evidence Drilldown</span>
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Evidence Drilldown Modal */}
      {selectedSkill && (
        <EvidenceModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}

    </div>
  );
};
