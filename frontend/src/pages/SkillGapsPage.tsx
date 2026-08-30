import React, { useEffect, useState } from 'react';
import { Target, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { GapAnalysisResult, SkillGap } from '../types';
import { fetchSkillGaps, createLearningPath } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const SkillGapsPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<GapAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkillGaps(1).then(data => {
      setAnalysis(data);
      setLoading(false);
    });
  }, []);

  const handleCreatePath = async (skillId: number) => {
    await createLearningPath(skillId, 1);
    navigate('/student/learning');
  };

  if (loading || !analysis) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const getPriorityBadge = (level: string) => {
    switch (level) {
      case 'URGENT':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">🔥 URGENT GAP</span>;
      case 'HIGH':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">⚠️ HIGH PRIORITY</span>;
      case 'MEDIUM':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">MEDIUM</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-400 border border-slate-500/30">LOW</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950 p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Verified Skill Gap Analytics</h1>
              <p className="text-xs text-slate-400 mt-1">
                Role: <strong className="text-slate-200">{analysis.targetRoleName}</strong> | Total Gaps Flagged: <strong className="text-amber-400">{analysis.totalGaps}</strong> | Urgent Actions: <strong className="text-red-400">{analysis.urgentGaps}</strong>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-right">
            <p className="text-xs text-slate-400">Priority Formula</p>
            <p className="text-sm font-bold text-amber-400 font-mono">Priority = Importance × Gap</p>
          </div>
        </div>
      </div>

      {/* Top Urgent Gap Highlight */}
      {analysis.gaps.length > 0 && (
        <div className="glass-card rounded-2xl p-6 border border-red-500/30 bg-red-950/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Top Priority Skill Gap</span>
                <h2 className="text-xl font-black text-white">{analysis.gaps[0].skillName} Gap Detected</h2>
                <p className="text-xs text-slate-400">Required Level: {analysis.gaps[0].requiredLevel}/100 | Your Verified Level: <span className="text-red-400 font-bold">{analysis.gaps[0].verifiedScore}/100</span> (Gap: {analysis.gaps[0].gap} pts)</p>
              </div>
            </div>

            <button
              onClick={() => handleCreatePath(analysis.gaps[0].skillId)}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 font-bold text-white shadow-lg shadow-red-500/20 hover:opacity-90 transition text-xs"
            >
              <span>Generate {analysis.gaps[0].skillName} Learning Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Skill Gaps Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Prioritized Skill Gap Matrix</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {analysis.gaps.map((gapItem) => (
            <div key={gapItem.skillId} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{gapItem.skillName}</h3>
                    <span className="text-xs text-slate-400">{gapItem.category}</span>
                  </div>
                  {getPriorityBadge(gapItem.priorityLevel)}
                </div>

                {/* Score Comparison Bars */}
                <div className="space-y-3 my-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-400">Required Target Level</span>
                      <span className="text-slate-200">{gapItem.requiredLevel}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-500 h-full rounded-full" style={{ width: `${gapItem.requiredLevel}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-400">Your Verified Score</span>
                      <span className={gapItem.gap > 20 ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>{gapItem.verifiedScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${gapItem.gap > 20 ? 'bg-red-500' : 'bg-amber-500'}`}
                        style={{ width: `${gapItem.verifiedScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Skill Importance: <strong className="text-slate-200">{gapItem.importance}%</strong></span>
                  <span>Priority Index: <strong className="text-amber-400 font-mono">{gapItem.priorityScore}</strong></span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleCreatePath(gapItem.skillId)}
                className="mt-6 w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 font-bold text-xs transition"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Start Learning Path ({gapItem.skillName})</span>
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
