import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, Play, Sparkles, TrendingUp, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { LearningPath, Course, ReassessmentResult } from '../types';
import { fetchStudentLearningPaths, fetchCourses, updateStepProgress, processReassessment } from '../services/api';

export const LearningPage: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [reassessmentRes, setReassessmentRes] = useState<ReassessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchStudentLearningPaths(1), fetchCourses()]).then(([pData, cData]) => {
      setPaths(pData);
      setCourses(cData);
      setLoading(false);
    });
  }, []);

  const handleStepComplete = async (stepId: number) => {
    await updateStepProgress(stepId, 100, 'COMPLETED');
    const updated = await fetchStudentLearningPaths(1);
    setPaths(updated);
  };

  const handleTriggerReassessment = async (skillId: number, pathId: number) => {
    const res = await processReassessment(skillId, pathId, 67);
    setReassessmentRes(res);
    const updated = await fetchStudentLearningPaths(1);
    setPaths(updated);
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
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Personalized Learning & Upskilling</h1>
            <p className="text-xs text-slate-400 mt-1">Ordered learning sequences mapped to your highest priority skill gaps with post-learning reassessment.</p>
          </div>
        </div>
      </div>

      {/* Before -> After Improvement Visualization Card */}
      {reassessmentRes && (
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/40 bg-emerald-950/20 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Skill Improvement Achieved</span>
                <h2 className="text-xl font-black text-white">{reassessmentRes.skillName} Score Boosted</h2>
                <p className="text-xs text-slate-300 mt-0.5">Post-learning reassessment completed and evidence score updated in Module 1 Evidence Engine.</p>
              </div>
            </div>

            {/* Before vs After Visualization */}
            <div className="flex items-center space-x-4 bg-slate-900/90 px-5 py-3 rounded-xl border border-slate-800">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Before</p>
                <p className="text-lg font-bold text-red-400">{reassessmentRes.previousScore}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-medium">After</p>
                <p className="text-lg font-bold text-emerald-400">{reassessmentRes.newScore}</p>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Gain</p>
                <p className="text-lg font-black text-emerald-300">+{reassessmentRes.improvement}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Learning Paths */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white">Active Personalized Learning Sequences</h2>

        {paths.map((path) => (
          <div key={path.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-extrabold text-white">{path.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${path.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                    {path.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Target Skill: <strong className="text-slate-200">{path.skillName}</strong> | Total Sequence Steps: {path.totalSteps}</p>
              </div>

              {/* Action */}
              <button
                onClick={() => handleTriggerReassessment(path.skillId, path.id)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Post-Learning Reassessment</span>
              </button>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              {path.steps.map((step) => (
                <div key={step.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                      {step.status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.stepNumber}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{step.moduleTitle}</h4>
                      {step.course && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          Recommended Resource: <a href={step.course.url} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">{step.course.title}</a> ({step.course.provider})
                        </p>
                      )}

                      {/* Step Progress Bar */}
                      <div className="w-48 bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full rounded-full ${step.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${step.progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold text-slate-400">{step.progress}%</span>
                    {step.status !== 'COMPLETED' && (
                      <button
                        onClick={() => handleStepComplete(step.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 font-bold text-xs transition"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Recommended Courses Catalog */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Curated Course Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div key={course.id} className="glass-card glass-card-hover rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{course.provider}</span>
                  <span className="text-xs font-bold text-amber-400">★ {course.qualityScore}/100</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{course.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3">{course.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{course.difficulty} • {course.durationHours}h</span>
                <a href={course.url} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-blue-400 hover:underline font-semibold">
                  <span>View Course</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
