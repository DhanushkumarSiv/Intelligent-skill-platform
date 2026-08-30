import React, { useEffect, useState } from 'react';
import { Building2, Award, CheckCircle2, AlertTriangle, Users } from 'lucide-react';
import { DepartmentComparison } from '../types';
import { fetchInstitutionDepartments } from '../services/api';

export const InstitutionDepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentComparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutionDepartments(1).then(res => {
      setDepartments(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-purple-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Department Benchmark Comparison</h1>
            <p className="text-xs text-slate-400 mt-0.5">Comparative analytics across Computer Science, IT, and Electronics departments.</p>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.departmentName} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">DEPARTMENT</span>
              <h2 className="text-base font-bold text-white mt-1.5">{dept.departmentName}</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-400">Average Verified Skill Score</span>
                  <span className="text-emerald-400 font-bold">{dept.avgSkillScore}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${dept.avgSkillScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-400">Placement Readiness</span>
                  <span className="text-blue-400 font-bold">{dept.placementReadinessPercentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${dept.placementReadinessPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-400">Assessment Participation</span>
                  <span className="text-amber-400 font-bold">{dept.assessmentParticipationPercentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${dept.assessmentParticipationPercentage}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-400">Internship Participation</span>
                  <span className="text-purple-400 font-bold">{dept.internshipParticipationPercentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${dept.internshipParticipationPercentage}%` }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="text-red-400 font-bold block mb-0.5">Top Skill Gap:</span>
              <p className="text-slate-300">{dept.topSkillGap}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
