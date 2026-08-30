export type VerificationStatus = 'VERIFIED' | 'ASSESSED' | 'EVIDENCE_FOUND' | 'SELF_DECLARED' | 'REJECTED';
export type EvidenceSource = 'ASSESSMENT' | 'GITHUB_AST' | 'GITHUB_DEPENDENCY' | 'GITHUB_GIT' | 'PROJECT' | 'CERTIFICATE' | 'MENTOR' | 'INSTITUTION';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type LearningStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

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
  selfDeclaredScore: number;
  assessmentScore?: number;
  evidenceScore?: number;
  verifiedScore: number;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
  evidenceList: SkillEvidence[];
}

export interface SkillPassport {
  studentId: number;
  studentName: string;
  targetRole: string;
  gitHubUsername: string;
  overallPassportScore: number;
  totalVerifiedSkills: number;
  skills: StudentSkill[];
  lastUpdatedAt: string;
}

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
  questions: Question[];
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

export interface AstEvidence {
  filePath: string;
  annotationOrConstruct: string;
  mappedSkill: string;
  codeDepthLevel: number;
  detail: string;
}

export interface DependencyEvidence {
  dependencyName: string;
  mappedSkill: string;
  baseScore: number;
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

export interface Project {
  id: number;
  name: string;
  description: string;
  repositoryUrl: string;
  technologies: string[];
  studentRole: string;
  durationMonths: number;
  createdAt: string;
}

export interface Certificate {
  id: number;
  issuer: string;
  courseName: string;
  studentName: string;
  credentialId: string;
  issueDate: string;
  verificationStatus: VerificationStatus;
  extractedText: string;
  matchedSkills?: string[];
  createdAt: string;
}

/* Module 2 Learning & Development Types */
export interface SkillGap {
  skillId: number;
  skillName: string;
  category: string;
  requiredLevel: number;
  verifiedScore: number;
  gap: number;
  importance: number;
  priorityScore: number;
  priorityLevel: PriorityLevel;
}

export interface GapAnalysisResult {
  studentId: number;
  targetRoleName: string;
  totalGaps: number;
  urgentGaps: number;
  gaps: SkillGap[];
}

export interface Course {
  id: number;
  title: string;
  provider: string;
  url: string;
  description: string;
  difficulty: string;
  durationHours: number;
  qualityScore: number;
  coverageLevel?: number;
}

export interface LearningProgressStep {
  id: number;
  learningPathId: number;
  stepNumber: number;
  moduleTitle: string;
  course?: Course;
  status: LearningStatus;
  progress: number;
}

export interface LearningPath {
  id: number;
  skillId: number;
  skillName: string;
  title: string;
  totalSteps: number;
  status: LearningStatus;
  initialScore: number;
  currentScore: number;
  steps: LearningProgressStep[];
}

export interface ReassessmentResult {
  skillId: number;
  skillName: string;
  previousScore: number;
  newScore: number;
  improvement: number;
  updatedStatus: VerificationStatus;
}
