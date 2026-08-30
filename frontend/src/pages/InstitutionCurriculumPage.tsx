import React, { useEffect, useState } from 'react';
import { Sparkles, AlertTriangle, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { CurriculumInsight } from '../types';
import { fetchInstitutionCurriculum } from '../services/api';

export const InstitutionCurriculumPage: React.FC = () => {
  const [insights, setInsights] = useState<CurriculumInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutionCurriculum(1).then(res => {
      setInsights(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const getActionTypeBadge = (type: string) => {
    switch (type) {
      case 'WORKSHOP':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">WORKSHOP INTERVENTION</span>;
      case 'ELECTIVE':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">NEW OPEN ELECTIVE</span>;
      case 'FDP':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">FACULTY FDP</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{type}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Curriculum Intelligence & Strategic Interventions</h1>
            <p className="text-xs text-slate-400 mt-0.5">Automated curriculum recommendations synthesized from Industry Demand + Student Proficiency Gaps.</p>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {insights.map((item, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 text-sm">
                  #{idx + 1}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{item.skillName}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Industry Demand: <strong className="text-amber-400">{item.demandLevel}</strong> • Student Proficiency: <strong className="text-slate-200">{item.studentProficiency}</strong></p>
                </div>
              </div>

              {getActionTypeBadge(item.actionType)}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-semibold">
              {item.recommendation}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
