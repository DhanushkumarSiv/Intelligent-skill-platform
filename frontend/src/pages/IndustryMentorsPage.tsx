import React, { useEffect, useState } from 'react';
import { Users, Building2, Star, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { Mentor, MentorFeedback } from '../types';
import { fetchMentors, submitMentorFeedback, fetchStudentMentorFeedback } from '../services/api';

export const IndustryMentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [feedbackList, setFeedbackList] = useState<MentorFeedback[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal Form State
  const [form, setForm] = useState({
    studentProfileId: 1,
    mentorId: 1,
    skillId: 1, // Java
    score: 88,
    comments: 'Demonstrated solid understanding of Spring Boot Dependency Injection and concurrency.',
    technicalEvaluation: 'Clean architectural patterns and excellent unit test coverage.',
    softSkillEvaluation: 'Proactive in sprint reviews and effective technical communication.'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    Promise.all([fetchMentors(), fetchStudentMentorFeedback(1)]).then(([mRes, fRes]) => {
      setMentors(mRes);
      setFeedbackList(fRes);
      setLoading(false);
    });
  }, []);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const newFb = await submitMentorFeedback(
      form.studentProfileId,
      form.mentorId,
      form.skillId,
      form.score,
      form.comments,
      form.technicalEvaluation,
      form.softSkillEvaluation
    );
    setFeedbackList(prev => [newFb, ...prev]);
    setSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowModal(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Industry Mentors & Feedback Evidence Engine</h1>
            <p className="text-xs text-slate-400 mt-0.5">Submit structured mentor ratings that flow directly into Module 1's Evidence Engine to verify student skills.</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Submit Student Mentor Evaluation</span>
        </button>
      </div>

      {/* Mentors Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mentors.map((m) => (
          <div key={m.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-lg">
                {m.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{m.name}</h2>
                <p className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <strong className="text-slate-200">{m.companyName}</strong>
                  <span>•</span>
                  <span>{m.title}</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <p className="text-slate-300"><strong>Expertise:</strong> {m.expertise}</p>
              <p className="text-slate-400"><strong>Availability:</strong> {m.availability} • {m.yearsExperience} yrs exp</p>
            </div>
          </div>
        ))}
      </div>

      {/* Submitted Feedback History */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Star className="w-5 h-5 text-emerald-400" />
          <span>Mentor Feedback Evidence Audit Log (Flows to Skill Passport)</span>
        </h2>

        {feedbackList.map((fb) => (
          <div key={fb.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">Student: {fb.studentName} — Skill: {fb.skillName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Evaluated by Mentor {fb.mentorName} on {fb.createdAt}</p>
              </div>

              <div className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">
                MENTOR RATING: {fb.score}/100
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <p className="text-slate-200"><strong>Overall Comments:</strong> {fb.comments}</p>
              {fb.technicalEvaluation && <p className="text-blue-300"><strong>Technical Evaluation:</strong> {fb.technicalEvaluation}</p>}
              {fb.softSkillEvaluation && <p className="text-emerald-300"><strong>Soft Skill & Communication:</strong> {fb.softSkillEvaluation}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Mentor Evaluation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 max-w-xl w-full border border-slate-700 space-y-4 animate-scale-in">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Submit Student Mentor Feedback (Module 1 Flow-Back)</span>
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            {submittedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Feedback Submitted! New evidence recorded in Module 1 Evidence Engine!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Target Skill Evaluation Score (1 - 100)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={form.score}
                    onChange={(e) => setForm({ ...form, score: parseInt(e.target.value) || 85 })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">General Mentor Notes / Overall Feedback</label>
                  <textarea
                    rows={2}
                    required
                    value={form.comments}
                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Technical Architecture Evaluation</label>
                  <input
                    type="text"
                    value={form.technicalEvaluation}
                    onChange={(e) => setForm({ ...form, technicalEvaluation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Soft Skills & Communication Evaluation</label>
                  <input
                    type="text"
                    value={form.softSkillEvaluation}
                    onChange={(e) => setForm({ ...form, softSkillEvaluation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white">
                    {submitting ? 'Submitting Evidence...' : 'Submit Evidence to Passport'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
