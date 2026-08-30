import React, { useState } from 'react';
import { PlusCircle, Sparkles, CheckCircle2, ArrowRight, Code } from 'lucide-react';
import { OpportunitySkill } from '../types';
import { parseJobDescription, createOpportunity } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const IndustryPostOpportunityPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: 'Junior Java Backend Engineer',
    type: 'JOB',
    location: 'Bangalore / Remote',
    duration: 'Full-time',
    stipend: '₹12,00,000 / yr',
    minCgpa: 7.5,
    preferredDegree: 'B.Tech Computer Science',
    description: 'Looking for a Junior Java Backend Engineer to design and build Spring Boot REST APIs, microservices, and PostgreSQL database queries with Docker deployment.'
  });

  const [extractedSkills, setExtractedSkills] = useState<OpportunitySkill[]>([]);
  const [parsing, setParsing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleParseJd = async () => {
    if (!form.description) return;
    setParsing(true);
    const skills = await parseJobDescription(form.description);
    setExtractedSkills(skills);
    setParsing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await createOpportunity({ ...form, skills: extractedSkills });
    setSubmitting(false);
    navigate('/student/opportunities');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <PlusCircle className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Post Industry Opportunity</h1>
            <p className="text-xs text-slate-400 mt-0.5">Use the AI Job Description Parser to automatically extract canonical skill requirements.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Form Fields */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Opportunity Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Opportunity Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="JOB">JOB (Full-time)</option>
                <option value="INTERNSHIP">INTERNSHIP</option>
                <option value="APPRENTICESHIP">APPRENTICESHIP</option>
                <option value="LIVE_PROJECT">LIVE_PROJECT</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="MENTORSHIP">MENTORSHIP</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Location / Remote</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Stipend / Salary Package</label>
              <input
                type="text"
                value={form.stipend}
                onChange={(e) => setForm({ ...form, stipend: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Minimum CGPA Benchmark</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={form.minCgpa}
                onChange={(e) => setForm({ ...form, minCgpa: parseFloat(e.target.value) || 6.0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Preferred Degree</label>
              <input
                type="text"
                value={form.preferredDegree}
                onChange={(e) => setForm({ ...form, preferredDegree: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Job Description Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">Raw Job Description (AI Extractor)</label>
              <button
                type="button"
                onClick={handleParseJd}
                disabled={parsing}
                className="flex items-center space-x-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-500/20 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{parsing ? 'Extracting Skills...' : 'Extract Skills via AI'}</span>
              </button>
            </div>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Extracted Skills List */}
          {extractedSkills.length > 0 && (
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI Normalized Canonical Skills</span>
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {extractedSkills.map((sk) => (
                  <span key={sk.skillId} className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {sk.skillName} (Imp: {sk.importance}%, Min: {sk.minimumScore})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white shadow-lg shadow-emerald-500/20 hover:opacity-90 transition disabled:opacity-50 text-xs"
          >
            <span>{submitting ? 'Publishing Opportunity...' : 'Publish Industry Opportunity'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
