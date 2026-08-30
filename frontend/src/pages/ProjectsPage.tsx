import React, { useState } from 'react';
import { FolderGit2, Plus, CheckCircle2, Code } from 'lucide-react';
import { Project } from '../types';
import { submitProject } from '../services/api';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 101,
      name: "E-Commerce REST API Engine",
      description: "Scalable microservice backend built with Spring Boot, PostgreSQL, and Redis caching.",
      repositoryUrl: "https://github.com/alexchen/ecommerce-api",
      technologies: ["Java", "Spring Boot", "SQL", "REST API"],
      studentRole: "Lead Backend Developer",
      durationMonths: 3,
      createdAt: new Date().toISOString()
    }
  ]);

  const [form, setForm] = useState({
    name: '',
    description: '',
    repositoryUrl: '',
    technologies: '',
    studentRole: '',
    durationMonths: 3
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const newProj = await submitProject(form);
    setProjects(prev => [newProj, ...prev]);
    setForm({ name: '', description: '', repositoryUrl: '', technologies: '', studentRole: '', durationMonths: 3 });
    setSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FolderGit2 className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Project Evidence Submission</h1>
            <p className="text-xs text-slate-400 mt-0.5">Projects are mapped to canonical skills to provide 15% weight to your Verified Skill Passport.</p>
          </div>
        </div>
      </div>

      {/* Form + Existing List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Form */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 h-fit">
          <h2 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add New Project</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Project Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Microservices Order System"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief summary of architecture & features..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Repository URL</label>
              <input
                type="url"
                value={form.repositoryUrl}
                onChange={(e) => setForm({ ...form, repositoryUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Technologies (Comma separated)</label>
              <input
                type="text"
                required
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                placeholder="Java, Spring Boot, PostgreSQL, Docker"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Role</label>
                <input
                  type="text"
                  value={form.studentRole}
                  onChange={(e) => setForm({ ...form, studentRole: e.target.value })}
                  placeholder="Backend Developer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Duration (Months)</label>
                <input
                  type="number"
                  min="1"
                  value={form.durationMonths}
                  onChange={(e) => setForm({ ...form, durationMonths: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs transition disabled:opacity-50"
            >
              {submitting ? 'Saving Project...' : 'Add Project Evidence'}
            </button>
          </form>
        </div>

        {/* Project List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-white">Verified Project Portfolio</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{proj.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{proj.studentRole} • {proj.durationMonths} mos</span>
              </div>

              <p className="text-xs text-slate-300">{proj.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.technologies.map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
