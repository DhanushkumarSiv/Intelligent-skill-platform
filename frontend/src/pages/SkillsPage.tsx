import React, { useState } from 'react';
import { Target, CheckCircle, Code, Server, Database, Cloud, Shield, Cpu } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('Backend Developer');

  const roleSkills = [
    { name: 'Java', category: 'Programming', importance: 90, minLevel: 80, currentScore: 88, status: 'VERIFIED' },
    { name: 'Spring Boot', category: 'Backend', importance: 85, minLevel: 75, currentScore: 82, status: 'VERIFIED' },
    { name: 'SQL', category: 'Database', importance: 80, minLevel: 70, currentScore: 76, status: 'ASSESSED' },
    { name: 'REST API', category: 'Backend', importance: 80, minLevel: 75, currentScore: 80, status: 'VERIFIED' },
    { name: 'Git', category: 'DevOps', importance: 60, minLevel: 50, currentScore: 75, status: 'EVIDENCE_FOUND' },
    { name: 'Docker', category: 'DevOps', importance: 50, minLevel: 50, currentScore: 35, status: 'EVIDENCE_FOUND' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Target Role & Skill Master</h1>
          <p className="text-xs text-slate-400 mt-1">Select target engineering role to load required skill importance weights & minimum benchmarks.</p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <Target className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-400">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="Backend Developer" className="bg-slate-900">Backend Developer</option>
            <option value="Frontend Developer" className="bg-slate-900">Frontend Developer</option>
            <option value="Data Analyst" className="bg-slate-900">Data Analyst</option>
            <option value="ML Engineer" className="bg-slate-900">ML Engineer</option>
            <option value="Cloud Engineer" className="bg-slate-900">Cloud Engineer</option>
            <option value="DevOps Engineer" className="bg-slate-900">DevOps Engineer</option>
          </select>
        </div>
      </div>

      {/* Role Skill Requirements Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-4">Required Skills for {selectedRole}</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Skill Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Importance Weight</th>
                <th className="py-3 px-4">Min. Required Level</th>
                <th className="py-3 px-4">Your Verified Score</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {roleSkills.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-400">{item.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold text-amber-400">{item.importance}%</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold text-slate-300">{item.minLevel}/100</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-bold ${item.currentScore >= item.minLevel ? 'text-emerald-400' : 'text-red-400'}`}>
                      {item.currentScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
