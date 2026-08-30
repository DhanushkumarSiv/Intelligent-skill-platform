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

export type EvidenceSource = 'ASSESSMENT' | 'GITHUB_AST' | 'PROJECT' | 'CERTIFICATE' | 'MENTOR' | 'INSTITUTION' | 'MCQ_ASSESSMENT_WEBSITE';

export interface SkillEvidence {
  id: number;
  source: EvidenceSource;
  score: number;
  weight: number;
  details: string;
  createdAt: string;
}

export interface StudentSkill {
  id: number;
  skillId: number;
  skillName: string;
  category: string;
  selfDeclaredScore?: number;
  assessmentScore?: number;
  mcqAssessmentWebsiteScore?: number;
  evidenceScore?: number;
  verifiedScore: number;
  verificationStatus: 'VERIFIED' | 'SELF_DECLARED' | 'ASSESSED' | 'EVIDENCE_FOUND';
  lastVerifiedAt: string;
  evidenceList: SkillEvidence[];
}

export interface DigitalSkillPassport {
  studentId: number;
  studentName: string;
  targetRole: string;
  gitHubUsername: string;
  overallPassportScore: number;
  totalVerifiedSkills: number;
  lastUpdatedAt: string;
  skills: StudentSkill[];
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


export type SkillPassport = DigitalSkillPassport;

export interface Question {
  id: number;
  skillId: number;
  skillName: string;
  questionText: string;
  type: 'MCQ' | 'CODE_OUTPUT';
  codeSnippet?: string;
  options: string[];
}

export interface Assessment {
  id: number;
  title: string;
  targetRoleId: number;
  targetRoleName: string;
  durationMinutes: number;
  totalQuestions: number;
  questions?: Question[];
}

export interface AssessmentResult {
  studentAssessmentId: number;
  overallScore: number;
  skillWiseScores: Record<string, number>;
  questionFeedback: {
    questionId: number;
    skillName: string;
    questionText: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface DependencyEvidence {
  dependencyName: string;
  mappedSkill: string;
  baseScore: number;
}

export interface AstEvidence {
  filePath: string;
  annotationOrConstruct: string;
  mappedSkill: string;
  codeDepthLevel: number;
  detail: string;
}

export interface GitHubAnalysisResult {
  repoName: string;
  owner: string;
  commitCount: number;
  contributorRatio: number;
  detectedLanguages: string[];
  dependencies: DependencyEvidence[];
  astFindings: AstEvidence[];
  skillScores: Record<string, number>;
  summaryText: string;
}

// Student Target Role & 4-Source Evidence Types
export interface TargetRoleBenchmark {
  id: number;
  name: string;
  category: string;
  description: string;
  iconName?: string;
  requiredSkills: RequiredSkillBenchmark[];
}

export interface RequiredSkillBenchmark {
  skillId: number;
  skillName: string;
  category: string;
  minimumScore: number;
  importanceScore: number;
  currentStudentScore: number;
  gapPercentage: number;
  status: 'VERIFIED' | 'NEEDS_VERIFICATION' | 'CRITICAL_GAP';
}



