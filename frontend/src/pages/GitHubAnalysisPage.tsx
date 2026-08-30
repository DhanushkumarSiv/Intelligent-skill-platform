import React, { useState } from 'react';
import { Code2, GitCommit, Users, Layers, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';
import { GitHubAnalysisResult } from '../types';
import { analyzeGitHubRepo } from '../services/api';

export const GitHubAnalysisPage: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/alexchen/spring-boot-api.git');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<GitHubAnalysisResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    const res = await analyzeGitHubRepo(repoUrl);
    setResult(res);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">GitHub AST Code Analyzer</h1>
            <p className="text-xs text-slate-400 mt-0.5">Parses Java code AST constructs with JavaParser (@RestController, JpaRepository, SecurityFilterChain) & git commit contribution ratios.</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository.git"
            required
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
          />
          <button
            type="submit"
            disabled={analyzing}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center space-x-2 text-xs"
          >
            <span>{analyzing ? 'Parsing Code AST...' : 'Analyze Repository'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Analysis Output Results */}
      {result && (
        <div className="space-y-6">
          
          {/* Summary Banner */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/90">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-bold text-white">{result.owner}/{result.repoName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    AST ANALYZED
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{result.summaryText}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 bg-slate-800/60 px-4 py-2.5 rounded-xl border border-slate-700">
                <div className="text-center px-2">
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Commits</p>
                  <p className="text-base font-bold text-blue-400 flex items-center justify-center space-x-1">
                    <GitCommit className="w-3.5 h-3.5" />
                    <span>{result.commitCount}</span>
                  </p>
                </div>
                <div className="h-6 w-px bg-slate-700"></div>
                <div className="text-center px-2">
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Authorship</p>
                  <p className="text-base font-bold text-emerald-400 flex items-center justify-center space-x-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{(result.contributorRatio * 100).toFixed(0)}%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Calculated Verified Scores Grid */}
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Extracted GitHub Skill Scores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.entries(result.skillScores).map(([skill, score]) => (
                <div key={skill} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center">
                  <p className="text-xs text-slate-400 font-medium">{skill}</p>
                  <p className="text-xl font-bold text-emerald-400 mt-0.5">{score}/100</p>
                </div>
              ))}
            </div>
          </div>

          {/* AST Findings Table */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-purple-400" />
              <span>JavaParser AST Code Construct Detections</span>
            </h3>

            <div className="space-y-3">
              {result.astFindings.map((finding, idx) => (
                <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                        {finding.annotationOrConstruct}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">{finding.mappedSkill}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1.5">{finding.filePath}</p>
                    <p className="text-xs text-slate-300 mt-1">{finding.detail}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Code Depth Level</span>
                    <span className="text-sm font-bold text-emerald-400">+{finding.codeDepthLevel} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
