import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, Building2, MapPin, DollarSign, Calendar, CheckCircle2, XCircle, AlertTriangle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Opportunity, MatchScoreBreakdown } from '../types';
import { fetchOpportunityById, fetchOpportunityMatch, applyForOpportunity, createLearningPath } from '../services/api';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [match, setMatch] = useState<MatchScoreBreakdown | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const oppId = parseInt(id);
    Promise.all([fetchOpportunityById(oppId), fetchOpportunityMatch(oppId, 1)]).then(([oData, mData]) => {
      setOpp(oData);
      setMatch(mData);
      setLoading(false);
    });
  }, [id]);

  const handleApply = async () => {
    if (!opp) return;
    setApplying(true);
    await applyForOpportunity(opp.id, coverNote, 1);
    setApplied(true);
    setApplying(false);
  };

  const handleBridgeGap = async (skillId: number) => {
    await createLearningPath(skillId, 1);
    navigate('/student/learning');
  };

  if (loading || !opp || !match) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{opp.type}</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">{opp.title}</h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <strong className="text-slate-200">{opp.company?.name}</strong>
              <span>•</span>
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{opp.location}</span>
            </p>
          </div>

          {/* Match Score Badge */}
          <div className="bg-gradient-to-tr from-slate-900 to-emerald-950/40 p-4 rounded-2xl border border-emerald-500/30 text-center min-w-[140px]">
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Match Score</p>
            <p className="text-3xl font-black text-emerald-400 mt-0.5">{match.overallMatchScore}%</p>
            <span className="text-[10px] font-bold text-emerald-300">EXPLAINABLE FIT</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-300">
          <span>Stipend/Salary: <strong className="text-emerald-400">{opp.stipend}</strong></span>
          <span>Duration: <strong className="text-slate-200">{opp.duration}</strong></span>
          <span>Min CGPA: <strong className="text-amber-400">{opp.minCgpa}</strong></span>
          <span>Deadline: <strong className="text-slate-200">{opp.deadline}</strong></span>
        </div>
      </div>

      {/* Explainable Match Breakdown Section */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Explainable Skill Match Breakdown</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Calculated using 70% Verified Skills + 15% Eligibility + 10% Interest + 5% Location</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {match.isEligible ? '🟢 ACADEMICALLY ELIGIBLE' : '🔴 INELIGIBLE'}
          </span>
        </div>

        {/* Skill Breakdown List */}
        <div className="space-y-3">
          {match.skillBreakdown.map((item) => (
            <div key={item.skillId} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {item.status === 'STRONG' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : item.status === 'MODERATE' ? (
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-white">{item.skillName}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'STRONG' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : item.status === 'MODERATE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {item.status} ({item.studentVerifiedScore}/100)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Required Minimum Benchmark: {item.requiredScore}/100</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-44 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.status === 'STRONG' ? 'bg-emerald-500' : item.status === 'MODERATE' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${item.studentVerifiedScore}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge Gap Action Banner */}
        {match.biggestGapSkillName && match.biggestGapSkillId && (
          <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Skill Gap Detected: {match.biggestGapSkillName}</h4>
                <p className="text-xs text-slate-300 mt-0.5">Bridge this gap by generating an AI Learning Path in Module 2 before interviewing!</p>
              </div>
            </div>

            <button
              onClick={() => handleBridgeGap(match.biggestGapSkillId!)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 font-bold text-xs transition flex items-center justify-center space-x-2 shrink-0"
            >
              <span>Bridge Gap via Learning Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Description & Application Box */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Job Description & Responsibilities</h2>
        <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{opp.description}</p>

        {/* Application Trigger */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          {applied ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Application Submitted Successfully! Track status in My Applications.</span>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">Cover Note / Why you're a great fit (Optional)</label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Highlight your verified AST Java projects and assessment scores..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{applying ? 'Submitting Application...' : 'Apply for Opportunity with Verified Passport'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
