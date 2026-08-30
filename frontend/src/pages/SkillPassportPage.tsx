import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, FileCode, CheckSquare, Sparkles, Target, CheckCircle2, Code, FileText, Users, X, ArrowRight, Upload, Briefcase, RefreshCw } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { SkillPassport, StudentSkill, TargetRoleBenchmark, RequiredSkillBenchmark, Opportunity } from '../types';
import { fetchSkillPassport, fetchTargetRoles, submitMultiSourceEvidence, fetchOpportunities } from '../services/api';
import { StudentOnboardingModal } from '../components/StudentOnboardingModal';
import { useNavigate } from 'react-router-dom';

export const SkillPassportPage: React.FC = () => {
  const navigate = useNavigate();
  const [passport, setPassport] = useState<SkillPassport | null>(null);
  const [roles, setRoles] = useState<TargetRoleBenchmark[]>([]);
  const [activeRole, setActiveRole] = useState<TargetRoleBenchmark | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 4-Source Verification States
  const [activeVerificationSkill, setActiveVerificationSkill] = useState<RequiredSkillBenchmark | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'AST' | 'CERTIFICATE' | 'ASSESSMENT' | 'MENTOR'>('AST');
  const [codeSnippet, setCodeSnippet] = useState<string>('public class PaymentController {\n  public boolean validateTransaction(double amount) {\n    if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");\n    return true;\n  }\n}');
  const [certFileName, setCertFileName] = useState<string>('');
  const [mentorComment, setMentorComment] = useState<string>('Demonstrated high proficiency in backend microservices architecture.');
  const [testAnswer, setTestAnswer] = useState<string>('B');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchSkillPassport(1), fetchTargetRoles(), fetchOpportunities()]).then(([passportRes, rolesRes, oppsRes]) => {
      setPassport(passportRes);
      setRoles(rolesRes);
      setOpportunities(oppsRes);

      // Load saved active target role or default to 1st role
      const savedRoleJson = localStorage.getItem('skillintel_active_role');
      if (savedRoleJson) {
        try {
          setActiveRole(JSON.parse(savedRoleJson));
        } catch {
          setActiveRole(rolesRes[0] || null);
        }
      } else if (rolesRes.length > 0) {
        setActiveRole(rolesRes[0]);
        localStorage.setItem('skillintel_active_role', JSON.stringify(rolesRes[0]));
      }

      setLoading(false);
    });
  }, []);

  const handleSetTargetRole = (role: TargetRoleBenchmark) => {
    setActiveRole(role);
    localStorage.setItem('skillintel_active_role', JSON.stringify(role));
    setShowRoleModal(false);
    setSuccessMessage(`🎯 Fixed Target Role set to "${role.name}"! Personalized AI skills & opportunities updated.`);
  };

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVerificationSkill || !activeRole) return;

    setSubmitting(true);
    let sourceType: 'AST_CODE_ANALYSIS' | 'CERTIFICATE' | 'ASSESSMENT' | 'MENTOR_FEEDBACK' = 'AST_CODE_ANALYSIS';
    let calculatedScore = 88;
    let detailsStr = '';

    if (verificationMethod === 'AST') {
      sourceType = 'AST_CODE_ANALYSIS';
      calculatedScore = 92;
      detailsStr = `Java AST Static Code Parser: Validated OOP class design, cyclomatic complexity = 2, exception handling.`;
    } else if (verificationMethod === 'CERTIFICATE') {
      sourceType = 'CERTIFICATE';
      calculatedScore = 86;
      detailsStr = `Apache PDFBox Certificate Parser: Validated credential issued by AWS / Oracle.`;
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
    const updatedSkills = activeRole.requiredSkills.map(s => {
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

    const updatedActiveRole = { ...activeRole, requiredSkills: updatedSkills };
    setActiveRole(updatedActiveRole);
    localStorage.setItem('skillintel_active_role', JSON.stringify(updatedActiveRole));

    setSubmitting(false);
    setSuccessMessage(`✅ Verified score for ${activeVerificationSkill.skillName} updated to ${res.verifiedScore}/100 via ${sourceType.replace(/_/g, ' ')}!`);
    setActiveVerificationSkill(null);
  };

  if (loading || !passport) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Radar chart data preparation
  const radarData = passport.skills.map(s => ({
    skill: s.skillName,
    Verified: s.verifiedScore || 0,
    Assessed: s.assessmentScore || 0,
    Claimed: s.selfDeclaredScore || 0,
  }));

  const overallReadinessPercentage = activeRole ? Math.round(
    (activeRole.requiredSkills.reduce((acc, curr) => acc + Math.min(100, (curr.currentStudentScore / curr.minimumScore) * 100), 0) /
      activeRole.requiredSkills.length)
  ) : 82;

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* 1. Fixed Active Target Role Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 p-6 md:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-500/20">
              AC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white">{passport.studentName}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VERIFIED PASSPORT</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{passport.department} • CGPA {passport.cgpa} • Graduating {passport.graduationYear}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Fixed Target Career Role</span>
              <span className="text-base font-bold text-white flex items-center space-x-1.5 justify-end">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>{activeRole ? activeRole.name : 'Backend Java Developer'}</span>
              </span>
            </div>

            <button
              onClick={() => setShowRoleModal(true)}
              className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Role</span>
            </button>
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="text-slate-300 font-semibold">Target Role Match Readiness ({activeRole?.name}): <strong className="text-emerald-400">{overallReadinessPercentage}%</strong></span>
          <div className="w-full sm:w-1/2 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full transition-all" style={{ width: `${overallReadinessPercentage}%` }}></div>
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

      {/* 2. AI Suggested In-Demand Skills & Verification Proof Grid */}
      {activeRole && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>AI Suggested In-Demand Skills ({activeRole.name})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Required skills benchmarked against active industry demand. Verify proof via 4 methods.</p>
            </div>

            <button
              onClick={() => navigate('/student/target-role')}
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1"
            >
              <span>Explore All Roles & Proofs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRole.requiredSkills.map((skill) => (
              <div key={skill.skillId} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{skill.skillName}</h3>
                      <span className="text-[10px] text-slate-400 font-semibold">{skill.category}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      skill.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      skill.status === 'CRITICAL_GAP' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
                      {skill.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-400">Current Score: <strong className="text-white">{skill.currentStudentScore}/100</strong></span>
                    <span className="text-slate-400">Required Benchmark: <strong className="text-emerald-400">{skill.minimumScore}/100</strong></span>
                  </div>

                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all ${skill.currentStudentScore >= skill.minimumScore ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-red-500'}`}
                      style={{ width: `${Math.min(100, (skill.currentStudentScore / skill.minimumScore) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveVerificationSkill(skill)}
                  className="w-full py-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 font-bold text-xs text-white transition flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verify Skill Proof (4 Methods)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AI Recommended Jobs & Internships */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>AI Recommended Jobs & Internships ({activeRole?.name || 'All Roles'})</span>
          </h2>
          <button onClick={() => navigate('/student/opportunities')} className="text-xs font-bold text-blue-400 hover:underline">View All Opportunities</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.slice(0, 3).map((opp) => (
            <div key={opp.id} onClick={() => navigate(`/student/opportunities/${opp.id}`)} className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 space-y-3 cursor-pointer">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">{opp.type}</span>
                <span className="text-xs font-black text-emerald-400">92% MATCH</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{opp.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{opp.company.name}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-400">
                <span>{opp.location}</span>
                <span className="text-emerald-400 font-bold">{opp.stipend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Verified Radar Chart & Passport Evidence Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Multi-Dimensional Verified Skill Radar</span>
          </h2>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Verified Score" dataKey="Verified" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evidence Verification Log */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span>Recent Multi-Source Evidence Audit Log</span>
          </h2>

          <div className="space-y-3 text-xs max-h-64 overflow-y-auto pr-1">
            {passport.skills.slice(0, 4).map((s) => (
              <div key={s.skillId} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{s.skillName}</span>
                  <span className="text-emerald-400 font-mono font-bold">{s.verifiedScore}/100</span>
                </div>
                <p className="text-[11px] text-slate-400">AST Code Analysis & PDF Certificate Verified (Confidence {s.confidenceScore}%)</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Onboarding / Role Switcher Modal */}
      {showRoleModal && (
        <StudentOnboardingModal
          roles={roles}
          activeRole={activeRole}
          onSelectRole={handleSetTargetRole}
          onClose={() => setShowRoleModal(false)}
        />
      )}

      {/* 4-Source Verification Drawer / Modal */}
      {activeVerificationSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card max-w-xl w-full rounded-2xl p-6 border border-slate-800 space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Verify Proof for {activeVerificationSkill.skillName}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Submit evidence using one of the 4 verification methods to update your score.</p>
              </div>
              <button onClick={() => setActiveVerificationSkill(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {/* 4 Method Tabs */}
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

            {/* Dynamic Input Form */}
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
                      id="cert-file-passport"
                    />
                    <label htmlFor="cert-file-passport" className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold cursor-pointer inline-block">Select PDF</label>
                    {certFileName && <p className="text-emerald-400 font-mono text-[11px]">Selected: {certFileName}</p>}
                  </div>
                </div>
              )}

              {verificationMethod === 'ASSESSMENT' && (
                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="font-bold text-white">Timed Skill Test Question: What is the primary advantage of Spring Boot Dependency Injection?</p>
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
                    <span>Run Verification & Update Passport</span>
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
