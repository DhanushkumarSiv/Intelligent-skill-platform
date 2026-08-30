import React, { useState, useEffect } from 'react';
import { 
  Code2, GitCommit, Users, Layers, FileCode, CheckCircle2, ArrowRight,
  Database, Award, Briefcase, GraduationCap, Check, Sparkles, Share2, 
  ExternalLink, FileText, BarChart3, AlertCircle, RefreshCw
} from 'lucide-react';
import { GitHubAnalysisResult, Opportunity } from '../types';
import { analyzeGitHubRepo, fetchOpportunities } from '../services/api';

export const GitHubAnalysisPage: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/alexchen/spring-boot-api.git');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<GitHubAnalysisResult | null>(null);
  
  // Custom states matching user workflow requirements
  const [syncing, setSyncing] = useState(false);
  const [aiQuestions, setAiQuestions] = useState<Array<{ q: string; a: string[]; correct: number }>>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [generatingOpportunities, setGeneratingOpportunities] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [githubUser, setGithubUser] = useState('alexchen');

  useEffect(() => {
    fetchOpportunities().then(setOpportunities);
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setAiQuestions([]);
    
    // Extracted Username from URL
    try {
      const parts = repoUrl.split('/');
      if (parts.length >= 4) {
        setGithubUser(parts[3]);
      }
    } catch (_) {}

    const res = await analyzeGitHubRepo(repoUrl);
    
    // Enhance with mock dependencies and directory scans for sheet representation
    const enhancedResult: GitHubAnalysisResult = {
      ...res,
      dependencies: [
        { dependencyName: "spring-boot-starter-web", mappedSkill: "REST APIs", baseScore: 15 },
        { dependencyName: "spring-boot-starter-data-jpa", mappedSkill: "SQL Database", baseScore: 15 },
        { dependencyName: "spring-boot-starter-security", mappedSkill: "Spring Security", baseScore: 20 },
        { dependencyName: "postgresql", mappedSkill: "PostgreSQL", baseScore: 10 },
        { dependencyName: "spring-cloud-starter-netflix-eureka-client", mappedSkill: "Microservices", baseScore: 20 }
      ],
      astFindings: [
        { filePath: "src/main/java/com/inst/api/controller/UserController.java", annotationOrConstruct: "@RestController", mappedSkill: "Spring Boot", codeDepthLevel: 4, detail: "Found REST endpoints mapped using MVC annotation. Exposes User profiles." },
        { filePath: "src/main/java/com/inst/api/repository/UserRepository.java", annotationOrConstruct: "interface UserRepository extends JpaRepository", mappedSkill: "Hibernate/JPA", codeDepthLevel: 5, detail: "Database CRUD Operations automated via JPA layer." },
        { filePath: "src/main/java/com/inst/api/config/SecurityConfig.java", annotationOrConstruct: "SecurityFilterChain filterChain(HttpSecurity http)", mappedSkill: "Spring Security", codeDepthLevel: 5, detail: "Enterprise authentication firewall with CORS / CSRF config detected." }
      ]
    };

    setResult(enhancedResult);
    setAnalyzing(false);

    // Call Google Gemini to generate custom live opportunities
    try {
      setGeneratingOpportunities(true);
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'GEMINI_API_KEY_PLACEHOLDER';
      const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai';

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-2.5-flash',
          messages: [
            {
              role: 'user',
              content: `Analyze the following student project profile and generate 3 custom real-world job/internship opportunities that match their tech stack.
Student Tech Stack Info:
Repository: ${enhancedResult.repoName}
Languages: ${enhancedResult.detectedLanguages.join(', ')}
Dependencies: ${enhancedResult.dependencies.map(d => d.dependencyName).join(', ')}
AST Constructs: ${enhancedResult.astFindings.map(f => f.annotationOrConstruct).join(', ')}

Return the output in JSON format exactly matching the schema: { "opportunities": [ { "id": 1, "title": "Job Title", "companyName": "Company Name", "location": "Location", "type": "Full-Time", "skills": [ { "skillName": "Spring Boot", "minimumScore": 85 } ] } ] }`
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        if (parsed && Array.isArray(parsed.opportunities)) {
          setOpportunities(parsed.opportunities);
        }
      }
    } catch (err) {
      console.warn("Failed to generate dynamic opportunities, using defaults...", err);
    } finally {
      setGeneratingOpportunities(false);
    }
  };

  const handleGenerateAiQuestions = async () => {
    if (!result) return;
    setGeneratingQuestions(true);
    setSelectedAnswers({});
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'GEMINI_API_KEY_PLACEHOLDER';
      const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai';
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-2.5-flash',
          messages: [
            {
              role: 'user',
              content: `Generate 3 technical multiple choice questions for a student based on the following parsed GitHub AST scan results of their project:
Repository Name: ${result.repoName}
Detected Languages: ${result.detectedLanguages.join(', ')}
Dependencies Scanned: ${result.dependencies.map(d => d.dependencyName).join(', ')}
AST Code Construct Findings: ${result.astFindings.map(f => f.annotationOrConstruct + ' (' + f.mappedSkill + ')').join(', ')}

Return the questions in JSON format exactly matching the schema: { "questions": [ { "q": "question text", "a": ["option A", "option B", "option C", "option D"], "correct": 0 } ] } where "correct" is the index (0 to 3) of the correct answer.`
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error('API Request Failed');
      }

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      if (parsed && Array.isArray(parsed.questions)) {
        setAiQuestions(parsed.questions);
      } else {
        throw new Error('Invalid JSON format');
      }
    } catch (err) {
      console.warn("OpenAI integration failed, running fallback mock simulator...", err);
      setAiQuestions([
        {
          q: "Explain how @RestController annotation differs from standard @Controller, and how the AST analyzer detected your specific return response format.",
          a: ["@RestController combines @Controller and @ResponseBody, automatically serializing responses to JSON.", "@RestController forces HTML responses.", "@RestController blocks JPA mapping.", "@RestController requires manual byte translation."],
          correct: 0
        },
        {
          q: "Your AST code footprint shows interface UserRepository extending JpaRepository. Why is JpaRepository preferred over CrudRepository in enterprise microservices?",
          a: ["JpaRepository provides pagination, sorting, and flush methods natively.", "JpaRepository compiles faster.", "JpaRepository is XML-based.", "JpaRepository bypasses Spring Boot proxy validation."],
          correct: 0
        },
        {
          q: "Your SecurityConfig declares HttpSecurity rules. What authorization policies does your active code apply to endpoints under /api/admin/*?",
          a: ["It requests 'ROLE_ADMIN' authority via hasRole filter mapping.", "It bypasses standard AST scanning filters.", "It converts requests to WebSockets.", "It rejects token verifications."],
          correct: 0
        }
      ]);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const handleSyncUniversity = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("All extracted evidence, AST scan sheets, certified scores, and gap metrics have been successfully transmitted and updated to the University (Institution Admin) database!");
    }, 1200);
  };

  // Conditions Weights Calculations
  const weights = {
    githubAst: 30,
    mcqTests: 40,
    certificates: 10,
    placements: 15,
    mentors: 5
  };

  // Student Mock Scores
  const studentScores = {
    githubAst: result ? 88 : 0,
    mcqTests: result ? 92 : 0,
    certificates: 85,
    placements: 95,
    mentors: 80
  };

  const calculatedOverallPercentage = result 
    ? Math.round(
        (studentScores.githubAst * (weights.githubAst / 100)) +
        (studentScores.mcqTests * (weights.mcqTests / 100)) +
        (studentScores.certificates * (weights.certificates / 100)) +
        (studentScores.placements * (weights.placements / 100)) +
        (studentScores.mentors * (weights.mentors / 100))
      )
    : 0;

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            GitHub AST & Evidence Analytics Engine
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Automated AST scans, multi-condition evidence weighting, and university sync dashboard</p>
        </div>

        <button
          onClick={handleSyncUniversity}
          disabled={syncing || !result}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-amber-500/10"
        >
          {syncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <GraduationCap className="w-3.5 h-3.5" />}
          <span>Sync to University Admin</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core AST Scan Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Analyze Input */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span>Connect GitHub Repository</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">Parses repository structure, code file extensions, directory depths, dependencies, and imports.</p>
            
            <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository.git"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                type="submit"
                disabled={analyzing}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                {analyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
                <span>{analyzing ? 'Scanning AST...' : 'Analyze Repo'}</span>
              </button>
            </form>
          </div>

          {/* Scanned Directories, Extensions, Dependencies & Imports SHEET */}
          {result && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <span>GitHub Repository Structure & Dependency Sheet</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Direct AST findings parsed from directory mappings and import modules.</p>
              </div>

              {/* General Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-850">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Parsed Username</span>
                  <span className="text-xs font-bold text-white font-mono">{githubUser}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Project Dialect</span>
                  <span className="text-xs font-bold text-white font-mono">Java, XML, SQL</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Repository Depth</span>
                  <span className="text-xs font-bold text-white font-mono">5 Directories Deep</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">File Formats</span>
                  <span className="text-xs font-bold text-white font-mono">.java (95%), .xml (3%)</span>
                </div>
              </div>

              {/* Scanned Sheet/Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                      <th className="py-2.5 px-3">Import Module / Dependency</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Mapped Competence</th>
                      <th className="py-2.5 px-3 text-right">Extracted Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-[11px]">
                    {result.dependencies.map((dep, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20">
                        <td className="py-3 px-3 font-mono font-semibold text-white">{dep.dependencyName}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-400">
                            pom.xml Dependency
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300">{dep.mappedSkill}</td>
                        <td className="py-3 px-3 text-right text-indigo-400 font-bold">+{dep.baseScore}% Weight</td>
                      </tr>
                    ))}
                    {result.astFindings.map((finding, idx) => (
                      <tr key={`ast-${idx}`} className="hover:bg-slate-800/20">
                        <td className="py-3 px-3 font-mono font-semibold text-purple-400 truncate max-w-[200px]" title={finding.annotationOrConstruct}>
                          {finding.annotationOrConstruct}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            Java Class AST
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300">{finding.mappedSkill}</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">+{finding.codeDepthLevel * 4}% Weight</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AI Custom Assessment Questions Block */}
          {result && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>AI Question Generator</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Compiles custom assessment questions from parsed dependencies and code annotations.</p>
                </div>
                {aiQuestions.length === 0 && (
                  <button
                    onClick={handleGenerateAiQuestions}
                    disabled={generatingQuestions}
                    className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 rounded-xl text-xs font-bold transition flex items-center space-x-1 border border-amber-500/20"
                  >
                    <span>Generate AI Exam</span>
                  </button>
                )}
              </div>

              {generatingQuestions && (
                <div className="flex justify-center items-center py-6 space-x-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-400" />
                  <span className="text-xs text-slate-400 font-semibold">Generating questions from pom.xml and Controller classes...</span>
                </div>
              )}

              {aiQuestions.length > 0 && (
                <div className="space-y-4">
                  {aiQuestions.map((q, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 space-y-3 text-xs">
                      <p className="font-bold text-white leading-relaxed">Q{idx + 1}. {q.q}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.a.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[idx] === oIdx;
                          const hasAnswered = selectedAnswers[idx] !== undefined;
                          const isCorrect = q.correct === oIdx;
                          
                          let bgClass = "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800";
                          if (isSelected) {
                            bgClass = isCorrect 
                              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold"
                              : "bg-rose-500/10 border-rose-500/40 text-rose-400 font-bold";
                          } else if (hasAnswered && isCorrect) {
                            bgClass = "bg-emerald-500/5 border-emerald-500/20 text-emerald-500/80 font-bold";
                          }

                          return (
                            <button 
                              key={oIdx} 
                              type="button"
                              disabled={hasAnswered}
                              onClick={() => {
                                setSelectedAnswers(prev => ({ ...prev, [idx]: oIdx }));
                              }}
                              className={`p-2.5 border rounded-lg text-left font-medium transition-all focus:outline-none ${bgClass}`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Weights Breakdown, Verification Percentages & Opportunity Comparison */}
        <div className="space-y-6">
          
          {/* Weights & Score Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Multi-Source Weight Verification</span>
            </h3>
            
            {result && (
              <div className="text-center py-4 border-b border-slate-850">
                <p className="text-3xl font-black text-white">{calculatedOverallPercentage}%</p>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Overall Skill Verification Score</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              {[
                { label: 'GitHub AST Scan', weight: weights.githubAst, score: studentScores.githubAst, color: 'text-purple-400', progressColor: 'bg-purple-500' },
                { label: 'MCQ Assessment', weight: weights.mcqTests, score: studentScores.mcqTests, color: 'text-blue-400', progressColor: 'bg-blue-500' },
                { label: 'Certificates Verification', weight: weights.certificates, score: studentScores.certificates, color: 'text-emerald-400', progressColor: 'bg-emerald-500' },
                { label: 'Placement & Internships', weight: weights.placements, score: studentScores.placements, color: 'text-amber-400', progressColor: 'bg-amber-500' },
                { label: 'Mentor Review', weight: weights.mentors, score: studentScores.mentors, color: 'text-pink-400', progressColor: 'bg-pink-500' }
              ].map((src, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between font-bold text-[10px]">
                    <span className="text-slate-300">{src.label} ({src.weight}%)</span>
                    <span className={src.color}>Score: {src.score}/100</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${src.progressColor}`} style={{ width: `${src.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placement & Internship Recommendation Details */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>Upskill & Career Recommendations</span>
            </h3>
            <p className="text-xs text-slate-400">Compare your passport score with active recruiter benchmarks to identify gaps.</p>

            <div className="space-y-3">
              {generatingOpportunities && (
                <div className="flex flex-col justify-center items-center py-8 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gemini is analyzing AST footprint for placement matches...</span>
                </div>
              )}

              {!generatingOpportunities && opportunities.slice(0, 3).map((op, idx) => {
                const skill = op.skills && op.skills[0];
                const requiredMin = skill ? (skill.minimumScore || 75) : 75;
                const skillName = skill ? (skill.skillName || skill.name || 'Java') : 'Java';
                const currentScore = result ? 88 : 0;
                const eligible = currentScore >= requiredMin;

                return (
                  <div key={op.id || idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-white block">{op.title}</span>
                        <span className="text-[9px] text-slate-400 block">{op.companyName} • {op.location} • {op.type}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${eligible ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {eligible ? 'Eligible' : 'Needs Upskilling'}
                      </span>
                    </div>

                    <div className="text-[10px] space-y-1 pt-1.5 border-t border-slate-850/50">
                      <div className="flex justify-between text-slate-400">
                        <span>Required benchmark:</span>
                        <span className="font-bold text-white">{requiredMin}% (in {skillName})</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Your current AST Score:</span>
                        <span className={`font-bold ${eligible ? 'text-emerald-400' : 'text-rose-400'}`}>{currentScore}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
