import React from 'react';
import { X, CheckCircle2, ShieldAlert, Award, FileCode, CheckSquare, FileText, UserCheck } from 'lucide-react';
import { StudentSkill, EvidenceSource } from '../types';

interface EvidenceModalProps {
  skill: StudentSkill | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  const getSourceIcon = (source: EvidenceSource) => {
    switch (source) {
      case 'ASSESSMENT': return <CheckSquare className="w-4 h-4 text-blue-400" />;
      case 'GITHUB_AST': return <FileCode className="w-4 h-4 text-purple-400" />;
      case 'PROJECT': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'CERTIFICATE': return <Award className="w-4 h-4 text-amber-400" />;
      case 'MENTOR': return <UserCheck className="w-4 h-4 text-cyan-400" />;
      default: return <CheckCircle2 className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">🟢 VERIFIED</span>;
      case 'ASSESSED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">🔵 ASSESSED</span>;
      case 'EVIDENCE_FOUND':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">🟡 EVIDENCE FOUND</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">⚪ SELF DECLARED</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
              {skill.verifiedScore}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{skill.skillName}</h3>
                {getStatusBadge(skill.verificationStatus)}
              </div>
              <p className="text-xs text-slate-400">Category: {skill.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Score Breakdown Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Self-Declared</p>
              <p className="text-lg font-bold text-slate-300 mt-1">{skill.selfDeclaredScore || '--'}</p>
            </div>
            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Assessment</p>
              <p className="text-lg font-bold text-blue-400 mt-1">{skill.assessmentScore || '--'}</p>
            </div>
            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Verified Score</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">{skill.verifiedScore}/100</p>
            </div>
          </div>

          {/* Evidence Transparency Audit Log */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center justify-between">
              <span>Evidence Audit Trail</span>
              <span className="text-xs text-slate-400 font-normal">Deterministic Weighted Score</span>
            </h4>

            {skill.evidenceList.length === 0 ? (
              <div className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-800">
                <ShieldAlert className="w-6 h-6 text-slate-500 mx-auto mb-1.5" />
                <p className="text-xs text-slate-400">No verified evidence uploaded yet. Submit assessments or GitHub repositories to verify this skill.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {skill.evidenceList.map((ev) => (
                  <div key={ev.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getSourceIcon(ev.source)}
                        <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                          {ev.source.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-slate-400">Weight: {(ev.weight * 100).toFixed(0)}%</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {ev.score}/100
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 font-mono">
                      {ev.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-850 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            Close Drilldown
          </button>
        </div>

      </div>
    </div>
  );
};
