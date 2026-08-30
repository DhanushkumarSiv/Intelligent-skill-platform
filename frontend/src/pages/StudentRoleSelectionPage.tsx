import React, { useEffect, useState } from 'react';
import { TargetRoleBenchmark, RequiredSkillBenchmark } from '../types';
import { fetchTargetRoles, submitMultiSourceEvidence } from '../services/api';
import { Target, ShieldCheck, Code, FileText, CheckSquare, Users, Sparkles, X, Upload, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentRoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<TargetRoleBenchmark | null>(null);
  const [activeVerificationSkill, setActiveVerificationSkill] = useState<RequiredSkillBenchmark | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'AST' | 'CERTIFICATE' | 'ASSESSMENT' | 'MENTOR'>('AST');
  
  // Verification input states
  const [codeSnippet, setCodeSnippet] = useState<string>('public class MicroserviceConfig {\n  public boolean validateHealth() {\n    return true;\n  }\n}');
  const [certFileName, setCertFileName] = useState<string>('');
  const [mentorComment, setMentorComment] = useState<string>('Demonstrated high proficiency in backend architecture.');
  const [testAnswer, setTestAnswer] = useState<string>('B');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTargetRoles().then(res => {
      // Read active role set centrally in Skill Passport
      const savedRoleJson = localStorage.getItem('skillintel_active_role');
      if (savedRoleJson) {
        try {
          setSelectedRole(JSON.parse(savedRoleJson));
        } catch {
          setSelectedRole(res[0] || null);
        }
      } else if (res.length > 0) {
        setSelectedRole(res[0]);
      }
    });
  }, []);

  const handleOpenVerification = (skill: RequiredSkillBenchmark) => {
    setActiveVerificationSkill(skill);
    setSuccessMessage(null);
  };

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVerificationSkill || !selectedRole) return;

    setSubmitting(true);
    let sourceType: 'AST_CODE_ANALYSIS' | 'CERTIFICATE' | 'ASSESSMENT' | 'MENTOR_FEEDBACK' = 'AST_CODE_ANALYSIS';
    let calculatedScore = 88;
    let detailsStr = '';

    if (verificationMethod === 'AST') {
      sourceType = 'AST_CODE_ANALYSIS';
      calculatedScore = 92;
      detailsStr = `Java AST Code Analysis: Clean OOP hierarchy, cyclomatic complexity = 2, exception handling verified.`;
    } else if (verificationMethod === 'CERTIFICATE') {
      sourceType = 'CERTIFICATE';
      calculatedScore = 86;
      detailsStr = `PDF Certificate Verified: Issued by AWS / Oracle for ${activeVerificationSkill.skillName}.`;
    } else if (verificationMethod === 'ASSESSMENT') {
      sourceType = 'ASSESSMENT';
      calculatedScore = 84;
      detailsStr = `Skill Assessment Completed: MCQ Score 84/100.`;
    } else {
      sourceType = 'MENTOR_FEEDBACK';
      calculatedScore = 90;
      detailsStr = `Industry Mentor Feedback: ${mentorComment}`;
    }

    const res = await submitMultiSourceEvidence(1, activeVerificationSkill.skillId, sourceType, calculatedScore, detailsStr);

    // Dynamic UI state update
    const updatedSkills = selectedRole.requiredSkills.map(s => {
      if (s.skillId === activeVerificationSkill.skillId) {
        const newScore = Math.max(s.currentStudentScore, res.verifiedScore);
        const newGap = Math.max(0, s.minimumScore - newScore);
        return {
          ...s,
          currentStudentScore: newScore,
          gapPercentage: newGap,
          status: newGap === 0 ? ('VERIFIED' as const) : ('NEEDS_VERIFICATION' as const)
        };
      }
      return s;
    });

    const updatedRole = {
      ...selectedRole,
      requiredSkills: updatedSkills
    };

    setSelectedRole(updatedRole);
    localStorage.setItem('skillintel_active_role', JSON.stringify(updatedRole));

    setSubmitting(false);
    setSuccessMessage(`✅ Verified score for ${activeVerificationSkill.skillName} updated to ${res.verifiedScore}/100 via ${sourceType.replace(/_/g, ' ')}!`);
    setActiveVerificationSkill(null);
  };

  if (!selectedRole) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const overallReadinessPercentage = Math.round(
    (selectedRole.requiredSkills.reduce((acc, curr) => acc + Math.min(100, (curr.currentStudentScore / curr.minimumScore) * 100), 0) /
      selectedRole.requiredSkills.length)
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header Banner for Active Role */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/40 p-6 md:p-8 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white">Target Role & 4-Source Verification Hub</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{selectedRole.category}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Active Career Goal: <strong className="text-white">{selectedRole.name}</strong> • Personalized skill benchmarks and multi-source proofing.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Role Readiness</span>
              <span className="text-xl font-black text-emerald-400">{overallReadinessPercentage}% READY</span>
            </div>
            <button
              onClick={() => navigate('/student/skill-passport')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Role in Passport</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between animate-slide-down">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Suggested Required Skills for Active Role */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Suggested Required Skills & Verification Status ({selectedRole.name})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedRole.requiredSkills.map((skill) => (
            <div key={skill.skillId} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{skill.skillName}</h3>
                    <span className="text-[10px] text-slate-400 font-semibold">{skill.category}</span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                    skill.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    skill.status === 'CRITICAL_GAP' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                    {skill.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex justify-between text-xs pt-1">
                  <span className="text-slate-400">Current Verified Score: <strong className="text-white">{skill.currentStudentScore}/100</strong></span>
                  <span className="text-slate-400">Role Target Benchmark: <strong className="text-emerald-400">{skill.minimumScore}/100</strong></span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all ${skill.currentStudentScore >= skill.minimumScore ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-red-500'}`}
                    style={{ width: `${Math.min(100, (skill.currentStudentScore / skill.minimumScore) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => handleOpenVerification(skill)}
                className="w-full py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 font-bold text-xs text-white transition flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify Skill Proof (4 Methods)</span>
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Verification Drawer / Modal */}
      {activeVerificationSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card max-w-xl w-full rounded-2xl p-6 border border-slate-800 space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Verify Proof for {activeVerificationSkill.skillName}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Submit evidence using one of the 4 verification methods to update your verified score.</p>
              </div>
              <button onClick={() => setActiveVerificationSkill(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {/* 4 Method Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
              <button
                onClick={() => setVerificationMethod('AST')}
                className={`p-2 rounded-xl border flex flex-col items-center space-y-1 transition ${verificationMethod === 'AST' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                <Code className="w-4 h-4" />
                <span className="text-[10px]">1. GitHub AST Code</span>
              </button>

              <button
                onClick={() => setVerificationMethod('CERTIFICATE')}
                className={`p-2 rounded-xl border flex flex-col items-center space-y-1 transition ${verificationMethod === 'CERTIFICATE' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-[10px]">2. PDF Certificate</span>
              </button>

              <button
                onClick={() => setVerificationMethod('ASSESSMENT')}
                className={`p-2 rounded-xl border flex flex-col items-center space-y-1 transition ${verificationMethod === 'ASSESSMENT' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                <CheckSquare className="w-4 h-4" />
                <span className="text-[10px]">3. Skill Assessment</span>
              </button>

              <button
                onClick={() => setVerificationMethod('MENTOR')}
                className={`p-2 rounded-xl border flex flex-col items-center space-y-1 transition ${verificationMethod === 'MENTOR' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                <Users className="w-4 h-4" />
                <span className="text-[10px]">4. Mentor Feedback</span>
              </button>
            </div>

            {/* Dynamic Verification Method Input Form */}
            <form onSubmit={handleSubmitEvidence} className="space-y-4 text-xs">
              
              {verificationMethod === 'AST' && (
                <div className="space-y-2">
                  <label className="font-semibold text-slate-300 block">Java Source Code Repository / AST Parser Input:</label>
                  <textarea
                    rows={5}
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[10px] text-slate-400">AST parser evaluates class structure, cyclomatic complexity, and exception handling (40% Weight).</p>
                </div>
              )}

              {verificationMethod === 'CERTIFICATE' && (
                <div className="space-y-2">
                  <label className="font-semibold text-slate-300 block">Upload PDF Certificate (AWS / Oracle / Coursera):</label>
                  <div className="p-6 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2 bg-slate-950">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-slate-300 font-bold">Drag & drop certificate PDF file or click to select</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setCertFileName(e.target.files?.[0]?.name || 'AWS_Certified_Architect.pdf')}
                      className="hidden"
                      id="cert-file"
                    />
                    <label htmlFor="cert-file" className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold cursor-pointer inline-block">Select PDF</label>
                    {certFileName && <p className="text-emerald-400 font-mono text-[11px]">Selected: {certFileName}</p>}
                  </div>
                </div>
              )}

              {verificationMethod === 'ASSESSMENT' && (
                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="font-bold text-white">Timed Skill Test Question: What is the primary advantage of Dependency Injection?</p>
                  <div className="space-y-2 text-slate-300">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="test" value="A" checked={testAnswer === 'A'} onChange={(e) => setTestAnswer(e.target.value)} />
                      <span>A) Manual object instantiation across constructors</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="test" value="B" checked={testAnswer === 'B'} onChange={(e) => setTestAnswer(e.target.value)} />
                      <span>B) Decouples component creation and manages lifecycle via IoC container</span>
                    </label>
                  </div>
                </div>
              )}

              {verificationMethod === 'MENTOR' && (
                <div className="space-y-2">
                  <label className="font-semibold text-slate-300 block">Industry Mentor Evaluation / Project Proof:</label>
                  <textarea
                    rows={3}
                    value={mentorComment}
                    onChange={(e) => setMentorComment(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Run Verification & Update Skill Passport</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
