import React, { useEffect, useState } from 'react';
import { Briefcase, Building2, Calendar, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { Internship } from '../types';
import { fetchStudentInternships, completeInternship } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const StudentInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentInternships(1).then(list => {
      setInternships(list);
      setLoading(false);
    });
  }, []);

  const handleComplete = async (id: number) => {
    setCompletingId(id);
    const updated = await completeInternship(id, 'Completed with High Distinction');
    setInternships(prev => prev.map(i => i.id === id ? updated : i));
    setCompletingId(null);
  };

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
          <Briefcase className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Industrial Training & Internships Lifecycle</h1>
            <p className="text-xs text-slate-400 mt-0.5">Completing an internship automatically passes real-world project evidence to Module 1 to update your Skill Passport.</p>
          </div>
        </div>
      </div>

      {/* Internships List */}
      <div className="space-y-4">
        {internships.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white">{item.opportunityTitle}</h2>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                    item.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <strong className="text-slate-200">{item.companyName}</strong>
                  <span>•</span>
                  <span>Mentor: {item.mentorName}</span>
                </p>
              </div>

              {item.status === 'ONGOING' ? (
                <button
                  onClick={() => handleComplete(item.id)}
                  disabled={completingId === item.id}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition flex items-center justify-center space-x-2 shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>{completingId === item.id ? 'Generating Skill Evidence...' : 'Complete Internship & Update Passport'}</span>
                </button>
              ) : (
                <div className="bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{item.completionStatus}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Duration: {item.startDate} to {item.endDate}</span>
              </span>

              {item.status === 'COMPLETED' && (
                <button
                  onClick={() => navigate('/student/skill-passport')}
                  className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Updated Digital Skill Passport</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
