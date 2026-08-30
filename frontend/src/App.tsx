import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SkillPassportPage } from './pages/SkillPassportPage';
import { SkillsPage } from './pages/SkillsPage';
import { SkillGapsPage } from './pages/SkillGapsPage';
import { LearningPage } from './pages/LearningPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { GitHubAnalysisPage } from './pages/GitHubAnalysisPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificatesPage } from './pages/CertificatesPage';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<string>('STUDENT');

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <Navbar currentRole={currentRole} onRoleChange={setCurrentRole} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/student/skill-passport" replace />} />
            <Route path="/student/skill-passport" element={<SkillPassportPage />} />
            <Route path="/student/skills" element={<SkillsPage />} />
            <Route path="/student/skill-gaps" element={<SkillGapsPage />} />
            <Route path="/student/learning" element={<LearningPage />} />
            <Route path="/student/learning/:id" element={<LearningPage />} />
            <Route path="/student/assessment" element={<AssessmentPage />} />
            <Route path="/student/github" element={<GitHubAnalysisPage />} />
            <Route path="/student/projects" element={<ProjectsPage />} />
            <Route path="/student/certificates" element={<CertificatesPage />} />
            <Route path="*" element={<Navigate to="/student/skill-passport" replace />} />
          </Routes>
        </main>

        <footer className="bg-slate-950 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>SkillIntel Platform — AI-Powered Academia–Industry Skill Intelligence & Collaboration Platform</p>
            <p className="font-mono text-emerald-500">Modules 1 & 2 Active</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};
