import React, { useEffect, useState } from 'react';
import { BookOpen, Building2, Search, Sparkles, CheckCircle2, UserCheck, PlusCircle, ArrowRight } from 'lucide-react';
import { FacultyMatchResult, Collaboration } from '../types';
import { matchFaculty, fetchCollaborations, createCollaboration } from '../services/api';

export const IndustryCollaborationsPage: React.FC = () => {
  const [facultyMatches, setFacultyMatches] = useState<FacultyMatchResult[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [searchQuery, setSearchQuery] = useState('Healthcare AI Machine Learning');
  const [loading, setLoading] = useState(true);

  // Form for posting collaboration
  const [showForm, setShowForm] = useState(false);
  const [colForm, setColForm] = useState({
    title: 'Healthcare Edge AI Joint Research Call',
    type: 'RESEARCH',
    description: 'Co-develop lightweight edge computer vision models for real-time medical imaging analysis with university labs.',
    requirements: 'Looking for AI/ML faculty and postgraduate researchers with PyTorch/TensorFlow expertise.',
    startDate: '2026-09-01',
    endDate: '2027-03-31'
  });

  useEffect(() => {
    Promise.all([matchFaculty(searchQuery), fetchCollaborations()]).then(([fRes, cRes]) => {
      setFacultyMatches(fRes);
      setCollaborations(cRes);
      setLoading(false);
    });
  }, []);

  const handleFacultySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await matchFaculty(searchQuery);
    setFacultyMatches(res);
    setLoading(false);
  };

  const handlePostCollaboration = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createCollaboration({
      ...colForm,
      type: colForm.type as any
    });
    setCollaborations(prev => [created, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-7 h-7 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Academia-Industry Collaboration & Faculty Matching</h1>
              <p className="text-xs text-slate-400 mt-0.5">Search academic researchers by domain expertise and publish joint collaboration calls.</p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white text-xs shadow-lg shadow-blue-500/20 hover:opacity-90 transition shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showForm ? 'Close Post Form' : 'Post Joint Collaboration Call'}</span>
          </button>
        </div>

        {/* Faculty Search Form */}
        <form onSubmit={handleFacultySearch} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Healthcare AI, Distributed Systems, Cloud Security"
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs border border-slate-700 transition flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Faculty</span>
          </button>
        </form>
      </div>

      {/* Form Modal / Inline Section */}
      {showForm && (
        <form onSubmit={handlePostCollaboration} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Create Industry-Academia Collaboration Offering</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Collaboration Title</label>
              <input
                type="text"
                required
                value={colForm.title}
                onChange={(e) => setColForm({ ...colForm, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Offering Type</label>
              <select
                value={colForm.type}
                onChange={(e) => setColForm({ ...colForm, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="RESEARCH">RESEARCH Joint Project</option>
                <option value="FDP">FDP (Faculty Development)</option>
                <option value="GUEST_LECTURE">GUEST LECTURE</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="CONSULTANCY">CONSULTANCY</option>
                <option value="LIVE_PROJECT">LIVE PROJECT</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="font-semibold text-slate-300 block mb-1">Description & Scope</label>
            <textarea
              rows={3}
              required
              value={colForm.description}
              onChange={(e) => setColForm({ ...colForm, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-xs">
            <label className="font-semibold text-slate-300 block mb-1">Faculty / Institution Requirements</label>
            <input
              type="text"
              value={colForm.requirements}
              onChange={(e) => setColForm({ ...colForm, requirements: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 transition"
          >
            Publish Offering
          </button>
        </form>
      )}

      {/* Matched Faculty Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span>Explainable Faculty Research Matches</span>
        </h2>

        {facultyMatches.map((fac) => (
          <div key={fac.academicianId} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base">
                  {fac.facultyName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{fac.facultyName}</h3>
                  <p className="text-xs text-slate-400">{fac.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 w-fit">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Match Score</p>
                  <p className="text-xl font-black text-purple-400">{fac.matchScore}% MATCH</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <p className="text-slate-300"><strong className="text-purple-400">Match Reason:</strong> {fac.reasoning}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {fac.matchedSkills.map((sk, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
