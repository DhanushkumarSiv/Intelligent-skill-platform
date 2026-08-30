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

      {/* Interactive Skills Management & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Declared Skills & Add Skill */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 md:col-span-1">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
            <span>My Verified Skills</span>
          </h2>
          
          {/* Add skill interactive UI */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input 
                id="new-skill-input"
                type="text" 
                placeholder="e.g. Kotlin, Docker"
                className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('new-skill-input') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    alert(`Skill "${input.value}" added successfully to your portfolio database!`);
                    input.value = '';
                  }
                }}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {['Java', 'Spring Boot', 'REST APIs', 'SQL', 'Git', 'Cloud Computing'].map(sk => (
                <span key={sk} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Institution Skill Updates & Department Recommendations */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 md:col-span-1">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Department Recommendations</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl">
              <span className="font-bold block">Curriculum Update Notice</span>
              <p className="mt-1 text-[11px]">The university recommends upgrading knowledge in **Spring Security** and **Kubernetes** to match recent IT placements.</p>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-850 text-slate-400 rounded-xl">
              <span className="font-bold text-slate-300 block">Department of {faculty.department}</span>
              <p className="mt-1 text-[11px]">Minimum target: 5 verified skills to retain department certification status.</p>
            </div>
          </div>
        </div>

        {/* Institution Assignment Exams */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 md:col-span-1">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>Assigned Exams</span>
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-white block">Java & Spring Boot AI Exam</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Assigned by: University Admin</span>
              </div>
              <a 
                href="/faculty/assessment" 
                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition"
              >
                Take Exam
              </a>
            </div>
            
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center opacity-65">
              <div>
                <span className="text-xs font-bold text-slate-400 block">Cloud Architecture Mock</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Status: Completed (90%)</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[9px] font-bold">Passed</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
