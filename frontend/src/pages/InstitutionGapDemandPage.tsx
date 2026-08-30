import React, { useEffect, useState } from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GapDemandMatrixItem } from '../types';
import { fetchInstitutionGapDemand } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const InstitutionGapDemandPage: React.FC = () => {
  const [matrix, setMatrix] = useState<GapDemandMatrixItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutionGapDemand(1).then(res => {
      setMatrix(res);
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

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'URGENT':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-red-500/20 text-red-400 border border-red-500/30">🔴 URGENT ACTION</span>;
      case 'IMPROVE':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">🟡 IMPROVE</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🟢 MAINTAIN</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Gap × Demand Decision Matrix</h1>
            <p className="text-xs text-slate-400 mt-0.5">High-impact visualization classifying skills by Industry Demand vs Student Proficiency.</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/institution/curriculum')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-slate-950 text-xs shadow-lg transition"
        >
          View Curriculum Recommendations
        </button>
      </div>

      {/* Matrix Visualization Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Target Skill</th>
                <th className="px-6 py-4">Industry Demand</th>
                <th className="px-6 py-4">Student Proficiency</th>
                <th className="px-6 py-4">Gap Level</th>
                <th className="px-6 py-4">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {matrix.map((row) => (
                <tr key={row.skillName} className="hover:bg-slate-900/40 transition">
                  <td className="px-6 py-4 font-bold text-white text-sm">{row.skillName}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${row.industryDemandLevel === 'VERY_HIGH' ? 'text-amber-400' : 'text-slate-200'}`}>
                      {row.industryDemandLevel.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${row.studentProficiencyLevel === 'LOW' ? 'text-red-400' : row.studentProficiencyLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {row.studentProficiencyLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-200">{row.gapLevel}</td>
                  <td className="px-6 py-4">{getActionBadge(row.recommendedAction)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
