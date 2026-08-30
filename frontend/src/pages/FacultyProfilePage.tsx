import React, { useEffect, useState } from 'react';
import { BookOpen, Building2, Award, FileText, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { Academician } from '../types';
import { fetchFaculty } from '../services/api';

export const FacultyProfilePage: React.FC = () => {
  const [faculty, setFaculty] = useState<Academician | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty().then(list => {
      if (list.length > 0) setFaculty(list[0]);
      setLoading(false);
    });
  }, []);

  if (loading || !faculty) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
              {faculty.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-white">{faculty.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">VERIFIED FACULTY</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>{faculty.department} • {faculty.institutionName}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center min-w-[130px]">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Experience</p>
            <p className="text-2xl font-black text-purple-400 mt-0.5">{faculty.yearsExperience}+ Years</p>
            <span className="text-[10px] text-slate-400">Academic & Research</span>
          </div>
        </div>
      </div>

      {/* Expertise & Research Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Domain Expertise */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Core Research & Domain Expertise</span>
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">Primary Expertise:</span>
              <p>{faculty.expertise}</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">Active Research Focus:</span>
              <p>{faculty.researchAreas}</p>
            </div>
          </div>
        </div>

        {/* Publications & Projects */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Publications & Industry Projects</span>
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">IEEE & Journal Publications:</span>
              <p>{faculty.publications}</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-blue-400 font-bold block mb-1">Consultancy & Industry Projects:</span>
              <p>{faculty.projects}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
