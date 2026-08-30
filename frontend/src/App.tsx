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
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { OpportunityDetailPage } from './pages/OpportunityDetailPage';
import { StudentApplicationsPage } from './pages/StudentApplicationsPage';
import { IndustryDashboardPage } from './pages/IndustryDashboardPage';
import { IndustryPostOpportunityPage } from './pages/IndustryPostOpportunityPage';
import { IndustryCandidateSearchPage } from './pages/IndustryCandidateSearchPage';
import { FacultyProfilePage } from './pages/FacultyProfilePage';
import { FacultyCollaborationsPage } from './pages/FacultyCollaborationsPage';
import { FacultyStudentsPage } from './pages/FacultyStudentsPage';
import { IndustryCollaborationsPage } from './pages/IndustryCollaborationsPage';
import { IndustryMentorsPage } from './pages/IndustryMentorsPage';
import { StudentMentorshipPage } from './pages/StudentMentorshipPage';
import { StudentCollaborationsPage } from './pages/StudentCollaborationsPage';
import { StudentInternshipsPage } from './pages/StudentInternshipsPage';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<string>('STUDENT');

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <Navbar currentRole={currentRole} onRoleChange={setCurrentRole} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/student/skill-passport" replace />} />
            
            {/* Student Persona Routes */}
            <Route path="/student/skill-passport" element={<SkillPassportPage />} />
            <Route path="/student/skills" element={<SkillsPage />} />
            <Route path="/student/skill-gaps" element={<SkillGapsPage />} />
            <Route path="/student/learning" element={<LearningPage />} />
            <Route path="/student/learning/:id" element={<LearningPage />} />
            <Route path="/student/opportunities" element={<OpportunitiesPage />} />
            <Route path="/student/opportunities/:id" element={<OpportunityDetailPage />} />
            <Route path="/student/applications" element={<StudentApplicationsPage />} />
            <Route path="/student/mentorship" element={<StudentMentorshipPage />} />
            <Route path="/student/collaborations" element={<StudentCollaborationsPage />} />
            <Route path="/student/internships" element={<StudentInternshipsPage />} />
            <Route path="/student/assessment" element={<AssessmentPage />} />
            <Route path="/student/github" element={<GitHubAnalysisPage />} />
            <Route path="/student/projects" element={<ProjectsPage />} />
            <Route path="/student/certificates" element={<CertificatesPage />} />

            {/* Academician (Faculty) Persona Routes */}
            <Route path="/faculty/profile" element={<FacultyProfilePage />} />
            <Route path="/faculty/collaborations" element={<FacultyCollaborationsPage />} />
            <Route path="/faculty/students" element={<FacultyStudentsPage />} />

            {/* Industry Persona Routes */}
            <Route path="/industry/dashboard" element={<IndustryDashboardPage />} />
            <Route path="/industry/opportunities/create" element={<IndustryPostOpportunityPage />} />
            <Route path="/industry/candidates" element={<IndustryCandidateSearchPage />} />
            <Route path="/industry/collaborations" element={<IndustryCollaborationsPage />} />
            <Route path="/industry/mentors" element={<IndustryMentorsPage />} />

            <Route path="*" element={<Navigate to="/student/skill-passport" replace />} />
          </Routes>
        </main>

        <footer className="bg-slate-950 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>SkillIntel Platform — AI-Powered Academia–Industry Skill Intelligence & Collaboration Platform</p>
            <p className="font-mono text-emerald-500">Modules 1, 2, 3 & 4 Active</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};
