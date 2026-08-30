import React, { useEffect, useState } from 'react';
import { TrendingUp, Building2, Sparkles, ArrowUpRight, Minus } from 'lucide-react';
import { IndustryDemandItem } from '../types';
import { fetchInstitutionDemand } from '../services/api';

export const InstitutionDemandPage: React.FC = () => {
  const [items, setItems] = useState<IndustryDemandItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutionDemand(1).then(res => {
      setItems(res);
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

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Real-Time Industry Skill Demand Frequency</h1>
            <p className="text-xs text-slate-400 mt-0.5">Calculated from recruiter postings and JD parsing in Module 3.</p>
          </div>
        </div>
      </div>

      {/* Demand Cards List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.skillName} className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-lg">
                {item.trendIndicator === 'UP' ? <ArrowUpRight className="w-6 h-6" /> : <Minus className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-white">{item.skillName}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{item.category}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.demandCount} Active Recruiter Job Postings Requiring Skill</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 w-fit">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Demand Share</p>
                <p className="text-xl font-black text-emerald-400">{item.demandPercentage}% DEMAND</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
