import React, { useEffect, useState } from 'react';
import { BookOpen, Building2, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { Collaboration } from '../types';
import { fetchCollaborations, expressCollaborationInterest } from '../services/api';

export const StudentCollaborationsPage: React.FC = () => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [interestedIds, setInterestedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborations().then(list => {
      setCollaborations(list);
      setLoading(false);
    });
  }, []);

  const handleApply = async (id: number) => {
    await expressCollaborationInterest(id);
    setInterestedIds(prev => [...prev, id]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Live Industry Projects & Research Collaborations</h1>
            <p className="text-xs text-slate-400 mt-0.5">Participate in live industry projects, innovation challenges, and joint research.</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {collaborations.map((col) => {
          const isInterested = interestedIds.includes(col.id);

          return (
            <div key={col.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    {col.type}
                  </span>
                  <h2 className="text-lg font-bold text-white mt-1.5">{col.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center space-x-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <strong className="text-slate-200">{col.companyName}</strong>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{col.startDate} to {col.endDate}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleApply(col.id)}
                  disabled={isInterested}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center space-x-2 shrink-0 ${
                    isInterested ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {isInterested ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Application Submitted</span>
                    </>
                  ) : (
                    <>
                      <span>Apply for Collaboration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-300">{col.description}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
