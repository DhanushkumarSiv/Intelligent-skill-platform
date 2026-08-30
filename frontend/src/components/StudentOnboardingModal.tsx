import React from 'react';
import { TargetRoleBenchmark } from '../types';
import { Target, CheckCircle2, Sparkles, X, ArrowRight } from 'lucide-react';

interface StudentOnboardingModalProps {
  roles: TargetRoleBenchmark[];
  activeRole: TargetRoleBenchmark | null;
  onSelectRole: (role: TargetRoleBenchmark) => void;
  onClose?: () => void;
}

export const StudentOnboardingModal: React.FC<StudentOnboardingModalProps> = ({
  roles,
  activeRole,
  onSelectRole,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-2xl w-full rounded-2xl p-6 md:p-8 border border-slate-800 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Select Primary Target Career Role</h2>
              <p className="text-xs text-slate-400 mt-0.5">Fix your primary target role to personalize AI suggested skills, job recommendations & verification proof.</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => {
            const isSelected = activeRole?.id === r.id;
            return (
              <div
                key={r.id}
                onClick={() => onSelectRole(r)}
                className={`glass-card rounded-2xl p-5 border cursor-pointer transition space-y-3 flex flex-col justify-between ${
                  isSelected ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {r.category}
                    </span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  </div>

                  <h3 className="text-base font-bold text-white">{r.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{r.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{r.requiredSkills?.length || 4} Benchmark Skills</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <span>Set Active Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Footer */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>You can change or switch your fixed target role anytime from your Skill Passport header.</span>
        </div>

      </div>
    </div>
  );
};
