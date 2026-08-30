import React, { useEffect, useState } from 'react';
import { Users, Building2, Star, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { Mentorship, MentorFeedback } from '../types';
import { fetchStudentMentorships, fetchStudentMentorFeedback } from '../services/api';

export const StudentMentorshipPage: React.FC = () => {
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [feedbackList, setFeedbackList] = useState<MentorFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchStudentMentorships(1), fetchStudentMentorFeedback(1)]).then(([mRes, fRes]) => {
      setMentorships(mRes);
      setFeedbackList(fRes);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">My Industry Mentors & Mentorship</h1>
            <p className="text-xs text-slate-400 mt-0.5">Connect with industry senior engineers and view real-world feedback evidence added to your passport.</p>
          </div>
        </div>
      </div>

      {/* Active Mentorships */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Active Mentorship Relationships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mentorships.map((m) => (
            <div key={m.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                    {m.mentorName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{m.mentorName}</h3>
                    <p className="text-xs text-slate-400">{m.companyName}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {m.status}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-300">Mentorship Skill Domain: <strong className="text-emerald-400">{m.skillName}</strong></p>
              <p className="text-[11px] text-slate-400">Started on {m.startedAt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Feedback Evidence Log */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Star className="w-5 h-5 text-emerald-400" />
          <span>Received Mentor Evaluations (Module 1 Skill Evidence)</span>
        </h2>

        {feedbackList.map((fb) => (
          <div key={fb.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">Mentor Rating for {fb.skillName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">By {fb.mentorName} on {fb.createdAt}</p>
              </div>

              <div className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">
                SCORE: {fb.score}/100 VERIFIED
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <p className="text-slate-200"><strong>Mentor Notes:</strong> {fb.comments}</p>
              {fb.technicalEvaluation && <p className="text-blue-300"><strong>Technical Evaluation:</strong> {fb.technicalEvaluation}</p>}
              {fb.softSkillEvaluation && <p className="text-emerald-300"><strong>Soft Skill & Communication:</strong> {fb.softSkillEvaluation}</p>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
