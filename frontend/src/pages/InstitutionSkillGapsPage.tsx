import React, { useEffect, useState } from 'react';
import { BarChart3, Filter, AlertTriangle, Sparkles } from 'lucide-react';
import { SkillGapAnalyticsItem } from '../types';
import { fetchInstitutionSkillGaps } from '../services/api';

export const InstitutionSkillGapsPage: React.FC = () => {
  const [items, setItems] = useState<SkillGapAnalyticsItem[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutionSkillGaps(1, selectedDept === 'ALL' ? undefined : selectedDept).then(res => {
      setItems(res);
      setLoading(false);
    });
  }, [selectedDept]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span>Top Student Skill Gap Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Aggregated verified skill scores across Modules 1–4 against industry benchmarks.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700 overflow-x-auto text-xs">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          {['ALL', 'CSE', 'IT', 'ECE'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedDept === d ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Gaps Analytics List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.skillName} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-white">{item.skillName}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Average Student Score: {item.avgStudentScore}/100 • Industry Benchmark: {item.requiredBenchmark}/100</p>
              </div>

              <div className="flex items-center space-x-2 bg-amber-950/40 px-3.5 py-1.5 rounded-xl border border-amber-500/30 w-fit">
                <span className="text-xs font-black text-amber-400">{item.gapPercentage}% GAP</span>
              </div>
            </div>

            {/* Gap Visual Progress Bar */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all" style={{ width: `${item.gapPercentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
