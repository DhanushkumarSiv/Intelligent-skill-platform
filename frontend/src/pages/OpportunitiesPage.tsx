import React, { useEffect, useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Calendar, Sparkles, ArrowRight, Filter } from 'lucide-react';
import { Opportunity, MatchScoreBreakdown } from '../types';
import { fetchOpportunities, fetchRecommendedOpportunities } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const OpportunitiesPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [matches, setMatches] = useState<Record<number, MatchScoreBreakdown>>({});
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchOpportunities(), fetchRecommendedOpportunities(1)]).then(([opps, recs]) => {
      setOpportunities(opps);
      const matchMap: Record<number, MatchScoreBreakdown> = {};
      recs.forEach(r => { matchMap[r.opportunityId] = r; });
      setMatches(matchMap);
      setLoading(false);
    });
  }, []);

  const filtered = selectedType === 'ALL'
    ? opportunities
    : opportunities.filter(o => o.type === selectedType);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'JOB':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FULL-TIME JOB</span>;
      case 'INTERNSHIP':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">INTERNSHIP</span>;
      case 'APPRENTICESHIP':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">APPRENTICESHIP</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">{type}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-emerald-400" />
            <span>Recommended Industry Opportunities</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Matched against your Module 1 verified skills and academic eligibility benchmarks.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700 overflow-x-auto text-xs">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          {['ALL', 'JOB', 'INTERNSHIP', 'APPRENTICESHIP'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedType === t ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filtered.map((opp) => {
          const match = matches[opp.id];
          const score = match ? match.overallMatchScore : 85;

          return (
            <div
              key={opp.id}
              onClick={() => navigate(`/student/opportunities/${opp.id}`)}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 cursor-pointer space-y-4 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-emerald-400 shadow">
                    {opp.company?.name ? opp.company.name.substring(0, 2).toUpperCase() : 'CO'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-bold text-white">{opp.title}</h2>
                      {getTypeBadge(opp.type)}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center space-x-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <strong className="text-slate-300">{opp.company?.name}</strong>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{opp.location}</span>
                    </p>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex items-center space-x-3 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 w-fit">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-medium">Match Fit</p>
                    <p className={`text-xl font-black ${score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-blue-400' : 'text-amber-400'}`}>
                      {score}% MATCH
                    </p>
                  </div>
                  <Sparkles className={`w-5 h-5 ${score >= 85 ? 'text-emerald-400' : 'text-blue-400'}`} />
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">{opp.description}</p>

              {/* Required Skills & Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {opp.skills.map((sk) => (
                    <span key={sk.skillId} className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {sk.skillName} (Req: {sk.minimumScore})
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-slate-400">
                  <span className="flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-200 font-semibold">{opp.stipend}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Apply by {opp.deadline}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-400 ml-2" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
