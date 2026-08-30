import React, { useEffect, useState } from 'react';
import { Search, ShieldCheck, Eye, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { CandidateSearchResult, StudentSkill } from '../types';
import { searchIndustryCandidates, fetchCandidateEvidence } from '../services/api';
import { EvidenceModal } from '../components/EvidenceModal';

export const IndustryCandidateSearchPage: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateSearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<StudentSkill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchIndustryCandidates().then(data => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const skills = searchTerm.split(',').map(s => s.trim()).filter(Boolean);
    const res = await searchIndustryCandidates(skills);
    setCandidates(res);
    setLoading(false);
  };

  const handleViewEvidence = async (candidateId: number) => {
    const passport = await fetchCandidateEvidence(candidateId);
    if (passport.skills && passport.skills.length > 0) {
      setSelectedSkill(passport.skills[0]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header & Search Bar */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3">
          <Search className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Verified Candidate Search Engine</h1>
            <p className="text-xs text-slate-400 mt-0.5">Search candidates by required canonical skills and inspect AST code verification evidence.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Java, Spring Boot, SQL, Docker"
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition text-xs flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Candidates</span>
          </button>
        </form>
      </div>

      {/* Candidate Results */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Ranked Verified Candidates</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {candidates.map((cand) => (
              <div key={cand.studentId} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-sm text-white">
                        {cand.studentName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{cand.studentName}</h3>
                        <p className="text-[11px] text-slate-400">@{cand.gitHubUsername}</p>
                      </div>
                    </div>

                    <span className="px-2 py-1 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {cand.overallMatchScore}% MATCH
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-300 mb-3">Target Role: <strong className="text-slate-100">{cand.targetRole}</strong></p>

                  <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 mb-4">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Verified Top Skills:</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cand.topSkills.map((sk, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Evidence & Passport Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleViewEvidence(cand.studentId)}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs transition"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Inspect Verified Skill Evidence</span>
                  </button>

                  <a
                    href="/student/skill-passport"
                    className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 font-bold text-xs transition"
                  >
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>View Full Skill Passport</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Audit Drilldown Modal */}
      {selectedSkill && (
        <EvidenceModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}

    </div>
  );
};
