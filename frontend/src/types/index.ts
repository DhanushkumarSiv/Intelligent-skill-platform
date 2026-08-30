export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'ACADEMICIAN' | 'INDUSTRY' | 'INSTITUTION_ADMIN';
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  description: string;
  parentSkillId?: number;
  aliases?: string;
}

export interface StudentSkill {
  skillId: number;
  skillName: string;
  category: string;
  verifiedScore: number;
  confidenceScore: number;
  status: 'VERIFIED' | 'SELF_DECLARED' | 'ASSESSED';
  evidenceCount: number;
  lastVerifiedAt: string;
}

export interface EvidenceRecord {
  id: number;
  skillName: string;
  source: 'GITHUB' | 'ASSESSMENT' | 'CERTIFICATE' | 'MENTOR' | 'PROJECT';
  title: string;
  weight: number;
  score: number;
  verifiedAt: string;
  metadata: string;
}

export interface DigitalSkillPassport {
  studentId: number;
  studentName: string;
  email: string;
  gitHubUsername: string;
  overallScore: number;
  skills: StudentSkill[];
  evidences: EvidenceRecord[];
}

export interface SkillGapDetail {
  skillId: number;
  skillName: string;
  category: string;
  requiredScore: number;
  currentScore: number;
  gap: number;
  importance: number;
  priorityScore: number;
  priorityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface SkillGapAnalysis {
  roleId: number;
  roleName: string;
  overallReadinessScore: number;
  gaps: SkillGapDetail[];
}

export interface Course {
  id: number;
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
  skillsTaught: string[];
}

export interface LearningPathNode {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  skillName: string;
  targetScore: number;
  courses: Course[];
  completed: boolean;
}

export interface LearningPath {
  id: number;
  targetRoleName: string;
  targetSkillName: string;
  nodes: LearningPathNode[];
  progressPercentage: number;
}

export interface ReassessmentResult {
  skillId: number;
  skillName: string;
  previousScore: number;
  newScore: number;
  improvement: number;
  passed: boolean;
  notes: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  verified: boolean;
}

export interface OpportunitySkill {
  opportunityId?: number;
  skillId: number;
  skillName: string;
  importance: number;
  minimumScore: number;
}

export interface Opportunity {
  id: number;
  companyId: number;
  company?: Company;
  title: string;
  type: 'INTERNSHIP' | 'JOB' | 'APPRENTICESHIP' | 'LIVE_PROJECT' | 'WORKSHOP' | 'MENTORSHIP';
  description: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  status: string;
  minCgpa: number;
  preferredDegree: string;
  skills: OpportunitySkill[];
}

export interface SkillMatchDetail {
  skillId: number;
  skillName: string;
  requiredScore: number;
  studentVerifiedScore: number;
  status: 'STRONG' | 'MODERATE' | 'WEAK';
  importance: number;
}

export interface MatchScoreBreakdown {
  opportunityId: number;
  studentProfileId: number;
  overallMatchScore: number;
  skillMatchScore: number;
  eligibilityScore: number;
  interestMatchScore: number;
  locationMatchScore: number;
  isEligible: boolean;
  eligibilityReasons: string[];
  skillBreakdown: SkillMatchDetail[];
  biggestGapSkillName?: string;
  biggestGapSkillId?: number;
}

export interface Application {
  id: number;
  opportunityId: number;
  opportunityTitle: string;
  companyName: string;
  studentProfileId: number;
  studentName: string;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';
  appliedAt: string;
  coverNote?: string;
}

export interface CandidateSearchResult {
  studentId: number;
  studentName: string;
  gitHubUsername: string;
  overallMatchScore: number;
  topSkills: string[];
  cgpa: number;
  targetRole: string;
}

// Module 4 Types
export interface Academician {
  id: number;
  name: string;
  email: string;
  institutionName: string;
  department: string;
  expertise: string;
  researchAreas: string;
  publications: string;
  projects: string;
  yearsExperience: number;
}

export interface Collaboration {
  id: number;
  companyName: string;
  title: string;
  description: string;
  type: 'GUEST_LECTURE' | 'WORKSHOP' | 'MENTORSHIP' | 'LIVE_PROJECT' | 'RESEARCH' | 'FDP' | 'INDUSTRIAL_TRAINING' | 'CONSULTANCY' | 'INNOVATION_CHALLENGE';
  requirements: string;
  startDate: string;
  endDate: string;
  status: string;
  skills: string[];
}

export interface FacultyMatchResult {
  academicianId: number;
  facultyName: string;
  department: string;
  expertise: string;
  researchAreas: string;
  matchScore: number;
  matchedSkills: string[];
  reasoning: string;
}

export interface Mentor {
  id: number;
  name: string;
  companyName: string;
  title: string;
  expertise: string;
  availability: string;
  yearsExperience: number;
}

export interface Mentorship {
  id: number;
  mentorName: string;
  companyName: string;
  studentName: string;
  skillName: string;
  status: string;
  startedAt: string;
}

export interface MentorFeedback {
  id: number;
  studentProfileId: number;
  studentName: string;
  mentorId: number;
  mentorName: string;
  skillId: number;
  skillName: string;
  score: number;
  comments: string;
  technicalEvaluation: string;
  softSkillEvaluation: string;
  createdAt: string;
}

export interface Internship {
  id: number;
  studentProfileId: number;
  studentName: string;
  companyName: string;
  opportunityTitle: string;
  mentorName: string;
  startDate: string;
  endDate: string;
  status: 'ONGOING' | 'COMPLETED' | 'TERMINATED';
  completionStatus?: string;
}

// Module 5 Institutional Intelligence Types
export interface InstitutionDashboard {
  institutionId: number;
  institutionName: string;
  totalStudents: number;
  assessedStudents: number;
  placementReadyStudents: number;
  internshipStudents: number;
  placedStudents: number;
}

export interface SkillGapAnalyticsItem {
  skillName: string;
  category: string;
  gapPercentage: number;
  avgStudentScore: number;
  requiredBenchmark: number;
}

export interface IndustryDemandItem {
  skillName: string;
  category: string;
  demandCount: number;
  demandPercentage: number;
  trendIndicator: 'UP' | 'STABLE' | 'DOWN';
}

export interface GapDemandMatrixItem {
  skillName: string;
  industryDemandLevel: 'VERY_HIGH' | 'HIGH' | 'MEDIUM';
  studentProficiencyLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  gapLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: 'URGENT' | 'IMPROVE' | 'MAINTAIN';
}

export interface DepartmentComparison {
  departmentName: string;
  avgSkillScore: number;
  placementReadinessPercentage: number;
  assessmentParticipationPercentage: number;
  internshipParticipationPercentage: number;
  topSkillGap: string;
}

export interface PlacementFunnelAnalytics {
  eligibleCount: number;
  appliedCount: number;
  shortlistedCount: number;
  interviewedCount: number;
  selectedCount: number;
  applicationRate: number;
  shortlistRate: number;
  selectionRate: number;
  placementReadinessRate: number;
}

export interface CurriculumInsight {
  skillName: string;
  demandLevel: string;
  studentProficiency: string;
  actionType: 'WORKSHOP' | 'ELECTIVE' | 'FDP' | 'CERTIFICATION';
  recommendation: string;
}

