import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, TrendingUp, Filter, Users, ArrowRight } from 'lucide-react';
import { PlacementFunnelAnalytics } from '../types';
import { fetchInstitutionPlacements } from '../services/api';

export const InstitutionPlacementsPage: React.FC = () => {
  const [data, setData] = useState<PlacementFunnelAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutionPlacements(1).then(res => {
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

  const funnelSteps = [
    { title: 'Academic Eligible', count: data.eligibleCount, rate: '100%', color: 'from-blue-600 to-indigo-600' },
    { title: 'Applied Opportunities', count: data.appliedCount, rate: `${data.applicationRate}% Application Rate`, color: 'from-indigo-600 to-purple-600' },
    { title: 'Recruiter Shortlisted', count: data.shortlistedCount, rate: `${data.shortlistRate}% Shortlist Rate`, color: 'from-purple-600 to-pink-600' },
    { title: 'Interview Rounds', count: data.interviewedCount, rate: '78% Conversion', color: 'from-pink-600 to-amber-600' },
    { title: 'Selected & Placed', count: data.selectedCount, rate: `${data.selectionRate}% Selection Rate`, color: 'from-amber-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Placement Funnel Analytics & Conversion Rates</h1>
            <p className="text-xs text-slate-400 mt-0.5">End-to-end recruitment funnel tracking eligible students through applications, shortlists, and final selections.</p>
          </div>
        </div>
      </div>

      {/* Funnel Steps */}
      <div className="space-y-4">
        {funnelSteps.map((step, idx) => (
          <div key={step.title} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">STEP {idx + 1}</span>
                <h2 className="text-base font-bold text-white">{step.title}</h2>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-2xl font-black text-white">{step.count.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Students</span></span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
                  {step.rate}
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div className={`bg-gradient-to-r ${step.color} h-full rounded-full transition-all`} style={{ width: `${(step.count / data.eligibleCount) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Insight Box */}
      <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-1 text-slate-300">
        <strong className="text-blue-400 font-bold flex items-center space-x-1">
          <TrendingUp className="w-4 h-4" />
          <span>Skill → Placement Observed Insight:</span>
        </strong>
        <p>Students with verified Cloud + Java skills show higher selection rates in this demo dataset (76% selection rate vs 52% average).</p>
      </div>

    </div>
  );
};
