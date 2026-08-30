import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
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
import { StudentRoleSelectionPage } from './pages/StudentRoleSelectionPage';
import { InstitutionDashboardPage } from './pages/InstitutionDashboardPage';
import { InstitutionSkillGapsPage } from './pages/InstitutionSkillGapsPage';
import { InstitutionDemandPage } from './pages/InstitutionDemandPage';
import { InstitutionGapDemandPage } from './pages/InstitutionGapDemandPage';
import { InstitutionDepartmentsPage } from './pages/InstitutionDepartmentsPage';
import { InstitutionPlacementsPage } from './pages/InstitutionPlacementsPage';
import { InstitutionCurriculumPage } from './pages/InstitutionCurriculumPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
          <Navbar />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/student/skill-passport" replace />} />
              
              {/* Student Persona Routes - Protected for STUDENT */}
              <Route path="/student/skill-passport" element={<ProtectedRoute allowedRoles={['STUDENT']}><SkillPassportPage /></ProtectedRoute>} />
              <Route path="/student/target-role" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentRoleSelectionPage /></ProtectedRoute>} />
              <Route path="/student/skills" element={<ProtectedRoute allowedRoles={['STUDENT']}><SkillsPage /></ProtectedRoute>} />
              <Route path="/student/skill-gaps" element={<ProtectedRoute allowedRoles={['STUDENT']}><SkillGapsPage /></ProtectedRoute>} />
              <Route path="/student/learning" element={<ProtectedRoute allowedRoles={['STUDENT']}><LearningPage /></ProtectedRoute>} />
              <Route path="/student/learning/:id" element={<ProtectedRoute allowedRoles={['STUDENT']}><LearningPage /></ProtectedRoute>} />
              <Route path="/student/opportunities" element={<ProtectedRoute allowedRoles={['STUDENT']}><OpportunitiesPage /></ProtectedRoute>} />
              <Route path="/student/opportunities/:id" element={<ProtectedRoute allowedRoles={['STUDENT']}><OpportunityDetailPage /></ProtectedRoute>} />
              <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentApplicationsPage /></ProtectedRoute>} />
              <Route path="/student/mentorship" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentMentorshipPage /></ProtectedRoute>} />
              <Route path="/student/collaborations" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentCollaborationsPage /></ProtectedRoute>} />
              <Route path="/student/internships" element={<ProtectedRoute allowedRoles={['STUDENT']}><StudentInternshipsPage /></ProtectedRoute>} />
              <Route path="/student/assessment" element={<ProtectedRoute allowedRoles={['STUDENT']}><AssessmentPage /></ProtectedRoute>} />
              <Route path="/student/github" element={<ProtectedRoute allowedRoles={['STUDENT']}><GitHubAnalysisPage /></ProtectedRoute>} />
              <Route path="/student/projects" element={<ProtectedRoute allowedRoles={['STUDENT']}><ProjectsPage /></ProtectedRoute>} />
              <Route path="/student/certificates" element={<ProtectedRoute allowedRoles={['STUDENT']}><CertificatesPage /></ProtectedRoute>} />

              {/* Academician (Faculty) Persona Routes - Protected for ACADEMICIAN */}
              <Route path="/faculty/profile" element={<ProtectedRoute allowedRoles={['ACADEMICIAN']}><FacultyProfilePage /></ProtectedRoute>} />
              <Route path="/faculty/collaborations" element={<ProtectedRoute allowedRoles={['ACADEMICIAN']}><FacultyCollaborationsPage /></ProtectedRoute>} />
              <Route path="/faculty/students" element={<ProtectedRoute allowedRoles={['ACADEMICIAN']}><FacultyStudentsPage /></ProtectedRoute>} />

              {/* Industry Persona Routes - Protected for INDUSTRY */}
              <Route path="/industry/dashboard" element={<ProtectedRoute allowedRoles={['INDUSTRY']}><IndustryDashboardPage /></ProtectedRoute>} />
              <Route path="/industry/opportunities/create" element={<ProtectedRoute allowedRoles={['INDUSTRY']}><IndustryPostOpportunityPage /></ProtectedRoute>} />
              <Route path="/industry/candidates" element={<ProtectedRoute allowedRoles={['INDUSTRY']}><IndustryCandidateSearchPage /></ProtectedRoute>} />
              <Route path="/industry/collaborations" element={<ProtectedRoute allowedRoles={['INDUSTRY']}><IndustryCollaborationsPage /></ProtectedRoute>} />
              <Route path="/industry/mentors" element={<ProtectedRoute allowedRoles={['INDUSTRY']}><IndustryMentorsPage /></ProtectedRoute>} />

              {/* Institution Admin / Analytics Routes - Protected for INSTITUTION_ADMIN */}
              <Route path="/institution/dashboard" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionDashboardPage /></ProtectedRoute>} />
              <Route path="/institution/skill-gaps" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionSkillGapsPage /></ProtectedRoute>} />
              <Route path="/institution/industry-demand" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionDemandPage /></ProtectedRoute>} />
              <Route path="/institution/gap-demand" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionGapDemandPage /></ProtectedRoute>} />
              <Route path="/institution/departments" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionDepartmentsPage /></ProtectedRoute>} />
              <Route path="/institution/placements" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionPlacementsPage /></ProtectedRoute>} />
              <Route path="/institution/curriculum" element={<ProtectedRoute allowedRoles={['INSTITUTION_ADMIN']}><InstitutionCurriculumPage /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>

          <footer className="bg-slate-950 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>SkillIntel SaaS Platform — Role-Based Access Control (RBAC) & Authentication Active</p>
              <p className="font-mono text-emerald-500">JWT Security & Protected Routes Enabled</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};
