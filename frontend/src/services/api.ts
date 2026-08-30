import axios from 'axios';
import { 
  SkillPassport, Assessment, AssessmentResult, GitHubAnalysisResult, Project, Certificate,
  GapAnalysisResult, Course, LearningPath, LearningProgressStep, ReassessmentResult,
  Opportunity, Company, MatchScoreBreakdown, Application, CandidateSearchResult, OpportunitySkill
} from '../types';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillintel_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Demo Fallbacks for Module 1, 2, 3
const mockCompanies: Company[] = [
  { id: 1, name: "VMware / Broadcom", industry: "Enterprise Cloud & Virtualization", description: "Multi-cloud software company powering global enterprise digital infrastructure.", website: "https://vmware.com", location: "Bangalore, India", verified: true },
  { id: 2, name: "Google Cloud", industry: "AI & Cloud Infrastructure", description: "Global cloud computing suite by Google.", website: "https://cloud.google.com", location: "Hyderabad / Remote", verified: true },
  { id: 3, name: "Razorpay", industry: "Fintech & Payments Infrastructure", description: "India's premier payment gateway and fintech platform.", website: "https://razorpay.com", location: "Bangalore, India", verified: true }
];

const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    company: mockCompanies[0],
    title: "Junior Java Backend Engineer",
    type: "JOB",
    description: "Build scalable Spring Boot microservices, REST APIs, and database persistence layers for VMware Cloud Console.",
    location: "Bangalore / Remote",
    duration: "Full-time",
    stipend: "₹12,00,000 / yr",
    minCgpa: 7.5,
    preferredDegree: "B.Tech Computer Science / IT",
    deadline: "2026-10-31",
    status: "OPEN",
    skills: [
      { skillId: 1, skillName: "Java", category: "Programming", importance: 90, minimumScore: 80 },
      { skillId: 2, skillName: "Spring Boot", category: "Backend", importance: 85, minimumScore: 75 },
      { skillId: 4, skillName: "SQL", category: "Database", importance: 80, minimumScore: 70 },
      { skillId: 6, skillName: "Docker", category: "DevOps", importance: 60, minimumScore: 50 }
    ]
  },
  {
    id: 2,
    company: mockCompanies[1],
    title: "Cloud Infrastructure & DevOps Intern",
    type: "INTERNSHIP",
    description: "Gain hands-on experience containerizing cloud services with Docker, Kubernetes, CI/CD pipelines, and GCP infrastructure.",
    location: "Remote",
    duration: "6 Months",
    stipend: "₹45,000 / mo",
    minCgpa: 7.0,
    preferredDegree: "B.Tech / M.Tech CSE",
    deadline: "2026-09-30",
    status: "OPEN",
    skills: [
      { skillId: 6, skillName: "Docker", category: "DevOps", importance: 90, minimumScore: 60 },
      { skillId: 11, skillName: "AWS", category: "Cloud", importance: 85, minimumScore: 50 },
      { skillId: 5, skillName: "Git", category: "DevOps", importance: 75, minimumScore: 60 }
    ]
  },
  {
    id: 3,
    company: mockCompanies[2],
    title: "Microservices & API Engineering Fellow",
    type: "APPRENTICESHIP",
    description: "Design high-throughput payment APIs, caching mechanisms, and ACID compliant PostgreSQL transaction engines.",
    location: "Bangalore, India",
    duration: "12 Months",
    stipend: "₹35,000 / mo",
    minCgpa: 6.5,
    preferredDegree: "B.Tech",
    deadline: "2026-11-15",
    status: "OPEN",
    skills: [
      { skillId: 3, skillName: "REST API", category: "Backend", importance: 95, minimumScore: 75 },
      { skillId: 2, skillName: "Spring Boot", category: "Backend", importance: 90, minimumScore: 75 },
      { skillId: 4, skillName: "SQL", category: "Database", importance: 85, minimumScore: 70 }
    ]
  }
];

const mockMatchBreakdowns: Record<number, MatchScoreBreakdown> = {
  1: {
    studentId: 1,
    opportunityId: 1,
    opportunityTitle: "Junior Java Backend Engineer",
    companyName: "VMware / Broadcom",
    overallMatchScore: 89,
    skillMatchScore: 88,
    eligibilityScore: 100,
    locationScore: 100,
    isEligible: true,
    eligibilityReason: "Candidate satisfies all mandatory academic, CGPA (8.5 vs 7.5 min), and degree eligibility criteria.",
    skillBreakdown: [
      { skillId: 1, skillName: "Java", requiredScore: 80, studentVerifiedScore: 88, status: "STRONG", gap: 0 },
      { skillId: 2, skillName: "Spring Boot", requiredScore: 75, studentVerifiedScore: 82, status: "STRONG", gap: 0 },
      { skillId: 4, skillName: "SQL", requiredScore: 70, studentVerifiedScore: 76, status: "STRONG", gap: 0 },
      { skillId: 6, skillName: "Docker", requiredScore: 50, studentVerifiedScore: 25, status: "WEAK", gap: 25 }
    ],
    biggestGapSkillName: "Docker",
    biggestGapSkillId: 6
  },
  2: {
    studentId: 1,
    opportunityId: 2,
    opportunityTitle: "Cloud Infrastructure & DevOps Intern",
    companyName: "Google Cloud",
    overallMatchScore: 74,
    skillMatchScore: 68,
    eligibilityScore: 100,
    locationScore: 100,
    isEligible: true,
    eligibilityReason: "Candidate satisfies all mandatory academic & CGPA eligibility criteria.",
    skillBreakdown: [
      { skillId: 6, skillName: "Docker", requiredScore: 60, studentVerifiedScore: 25, status: "WEAK", gap: 35 },
      { skillId: 11, skillName: "AWS", requiredScore: 50, studentVerifiedScore: 20, status: "WEAK", gap: 30 },
      { skillId: 5, skillName: "Git", requiredScore: 60, studentVerifiedScore: 75, status: "STRONG", gap: 0 }
    ],
    biggestGapSkillName: "Docker",
    biggestGapSkillId: 6
  }
};

const mockApplications: Application[] = [
  {
    id: 101,
    opportunityId: 1,
    opportunityTitle: "Junior Java Backend Engineer",
    companyName: "VMware / Broadcom",
    studentProfileId: 1,
    studentName: "Alex Chen",
    status: "SHORTLISTED",
    appliedAt: "2026-08-28 14:30",
    coverNote: "Strong background in Java AST code verification, Spring Boot microservices, and database design."
  }
];

const mockCandidates: CandidateSearchResult[] = [
  {
    studentId: 1,
    studentName: "Alex Chen",
    targetRole: "Backend Developer",
    gitHubUsername: "alexchen-dev",
    overallMatchScore: 92,
    verifiedSkillCount: 4,
    topSkills: ["Java (88)", "Spring Boot (82)", "REST API (80)", "SQL (76)"],
    isEligible: true
  },
  {
    studentId: 2,
    studentName: "Priya Sharma",
    targetRole: "Full Stack Engineer",
    gitHubUsername: "priyasharma-dev",
    overallMatchScore: 87,
    verifiedSkillCount: 5,
    topSkills: ["Java (85)", "React (88)", "Spring Boot (78)", "SQL (82)"],
    isEligible: true
  },
  {
    studentId: 3,
    studentName: "Rahul Verma",
    targetRole: "DevOps Engineer",
    gitHubUsername: "rahulv-ops",
    overallMatchScore: 81,
    verifiedSkillCount: 3,
    topSkills: ["Docker (85)", "AWS (80)", "Git (90)"],
    isEligible: true
  }
];

// Module 1 API methods
export const fetchSkillPassport = async (studentId: number = 1): Promise<SkillPassport> => {
  try {
    const res = await api.get<SkillPassport>(`/students/${studentId}/skill-passport`);
    return res.data;
  } catch (err) {
    return {
      studentId: 1,
      studentName: "Alex Chen",
      targetRole: "Backend Developer",
      gitHubUsername: "alexchen-dev",
      overallPassportScore: 82,
      totalVerifiedSkills: 4,
      lastUpdatedAt: new Date().toISOString(),
      skills: [
        {
          id: 1, skillId: 1, skillName: "Java", category: "Programming", selfDeclaredScore: 80, assessmentScore: 85, evidenceScore: 90, verifiedScore: 88, verificationStatus: "VERIFIED", lastVerifiedAt: new Date().toISOString(),
          evidenceList: [{ id: 101, source: "ASSESSMENT", score: 85, weight: 0.40, details: "Skill Assessment score: 85/100", createdAt: new Date().toISOString() }]
        },
        {
          id: 2, skillId: 2, skillName: "Spring Boot", category: "Backend", selfDeclaredScore: 70, assessmentScore: 60, evidenceScore: 82, verifiedScore: 82, verificationStatus: "VERIFIED", lastVerifiedAt: new Date().toISOString(),
          evidenceList: [{ id: 105, source: "ASSESSMENT", score: 60, weight: 0.40, details: "Skill Assessment score: 60/100", createdAt: new Date().toISOString() }]
        }
      ]
    };
  }
};

export const fetchAssessmentByRole = async (roleId: number = 1): Promise<Assessment> => {
  try {
    const res = await api.get<Assessment>(`/assessments/role/${roleId}`);
    return res.data;
  } catch (err) {
    return {
      id: 1,
      title: "Backend Developer Core Skill Assessment",
      targetRoleId: 1,
      targetRoleName: "Backend Developer",
      durationMinutes: 20,
      totalQuestions: 4,
      questions: [
        { id: 1, skillId: 1, skillName: "Java", questionText: "Which of the following guarantees thread safety in Java concurrent access?", type: "MCQ", options: ["ArrayList", "ConcurrentHashMap", "HashMap", "LinkedList"] }
      ]
    };
  }
};

export const submitAssessment = async (assessmentId: number, answers: { questionId: number; selectedAnswer: string }[]): Promise<AssessmentResult> => {
  try {
    const res = await api.post<AssessmentResult>(`/assessments/${assessmentId}/submit?studentProfileId=1`, { answers });
    return res.data;
  } catch (err) {
    return { studentAssessmentId: 101, overallScore: 80, skillWiseScores: { "Java": 100, "Spring Boot": 100 }, questionFeedback: [] };
  }
};

export const analyzeGitHubRepo = async (repositoryUrl: string): Promise<GitHubAnalysisResult> => {
  try {
    const res = await api.post<GitHubAnalysisResult>('/github/analyze', { repositoryUrl, studentProfileId: 1 });
    return res.data;
  } catch (err) {
    return {
      repoName: "spring-boot-api", owner: "alexchen", commitCount: 48, contributorRatio: 0.85, detectedLanguages: ["Java"], dependencies: [], astFindings: [], skillScores: { "Java": 90 }, summaryText: "AST Code Analysis parsed Java Annotations."
    };
  }
};

export const submitProject = async (projectData: any): Promise<Project> => {
  try {
    const res = await api.post<Project>('/projects?studentProfileId=1', projectData);
    return res.data;
  } catch (err) {
    return { id: 201, name: projectData.name || "E-Commerce REST API Engine", description: "", repositoryUrl: "", technologies: ["Java"], studentRole: "Backend Dev", durationMonths: 3, createdAt: new Date().toISOString() };
  }
};

export const uploadCertificatePdf = async (file: File): Promise<Certificate> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await api.post<Certificate>('/certificates/upload?studentProfileId=1', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  } catch (err) {
    return { id: 301, issuer: "Coursera", courseName: "Java & Spring Boot", studentName: "Alex Chen", credentialId: "CERT-101", issueDate: "2025-06-15", verificationStatus: "VERIFIED", extractedText: "Certificate of Completion", createdAt: new Date().toISOString() };
  }
};

/* Module 2 API methods */
export const fetchSkillGaps = async (studentId: number = 1): Promise<GapAnalysisResult> => {
  try {
    const res = await api.get<GapAnalysisResult>(`/skill-gaps/student/${studentId}`);
    return res.data;
  } catch (err) {
    return {
      studentId: 1, targetRoleName: "Backend Developer", totalGaps: 3, urgentGaps: 1,
      gaps: [{ skillId: 6, skillName: "Docker", category: "DevOps", requiredLevel: 60, verifiedScore: 25, gap: 35, importance: 80, priorityScore: 2800, priorityLevel: "URGENT" }]
    };
  }
};

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const res = await api.get<Course[]>('/courses');
    return res.data;
  } catch (err) {
    return [
      { id: 1, title: "Docker Fundamentals & Container Architecture", provider: "Docker Inc", url: "https://docker.com/learn", description: "Master Docker containers", difficulty: "Beginner", durationHours: 8, qualityScore: 92, coverageLevel: 90 }
    ];
  }
};

export const createLearningPath = async (skillId: number, studentId: number = 1): Promise<LearningPath> => {
  try {
    const res = await api.post<LearningPath>(`/learning-paths?studentProfileId=${studentId}&skillId=${skillId}`);
    return res.data;
  } catch (err) {
    return {
      id: 1, skillId: 6, skillName: "Docker", title: "Personalized Docker Mastery Path", totalSteps: 5, status: "IN_PROGRESS", initialScore: 25, currentScore: 25,
      steps: [{ id: 1, learningPathId: 1, stepNumber: 1, moduleTitle: "Docker Fundamentals", status: "IN_PROGRESS", progress: 80 }]
    };
  }
};

export const fetchStudentLearningPaths = async (studentId: number = 1): Promise<LearningPath[]> => {
  try {
    const res = await api.get<LearningPath[]>(`/learning-paths/student/${studentId}`);
    return res.data;
  } catch (err) {
    return [
      { id: 1, skillId: 6, skillName: "Docker", title: "Personalized Docker Mastery Path", totalSteps: 5, status: "IN_PROGRESS", initialScore: 25, currentScore: 25, steps: [{ id: 1, learningPathId: 1, stepNumber: 1, moduleTitle: "Docker Fundamentals", status: "IN_PROGRESS", progress: 80 }] }
    ];
  }
};

export const updateStepProgress = async (progressId: number, progressPercent: number, status: string = 'COMPLETED'): Promise<LearningProgressStep> => {
  try {
    const res = await api.put<LearningProgressStep>(`/learning-paths/progress/${progressId}?progressPercent=${progressPercent}&status=${status}`);
    return res.data;
  } catch (err) {
    return { id: progressId, learningPathId: 1, stepNumber: 1, moduleTitle: "Docker Fundamentals", status: "COMPLETED", progress: 100 };
  }
};

export const processReassessment = async (skillId: number, learningPathId: number, scoreAchieved: number = 67): Promise<ReassessmentResult> => {
  try {
    const res = await api.post<ReassessmentResult>('/reassessment', { studentProfileId: 1, skillId, learningPathId, scoreAchieved });
    return res.data;
  } catch (err) {
    return { skillId, skillName: "Docker", previousScore: 25, newScore: scoreAchieved, improvement: scoreAchieved - 25, updatedStatus: "VERIFIED" };
  }
};

/* Module 3 API methods */
export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  try {
    const res = await api.get<Opportunity[]>('/opportunities');
    return res.data;
  } catch (err) {
    return mockOpportunities;
  }
};

export const fetchOpportunityById = async (id: number): Promise<Opportunity> => {
  try {
    const res = await api.get<Opportunity>(`/opportunities/${id}`);
    return res.data;
  } catch (err) {
    return mockOpportunities.find(o => o.id === id) || mockOpportunities[0];
  }
};

export const fetchOpportunityMatch = async (opportunityId: number, studentId: number = 1): Promise<MatchScoreBreakdown> => {
  try {
    const res = await api.post<MatchScoreBreakdown>(`/opportunities/${opportunityId}/match?studentProfileId=${studentId}`);
    return res.data;
  } catch (err) {
    return mockMatchBreakdowns[opportunityId] || mockMatchBreakdowns[1];
  }
};

export const fetchRecommendedOpportunities = async (studentId: number = 1): Promise<MatchScoreBreakdown[]> => {
  try {
    const res = await api.get<MatchScoreBreakdown[]>(`/opportunities/student/${studentId}`);
    return res.data;
  } catch (err) {
    return Object.values(mockMatchBreakdowns);
  }
};

export const parseJobDescription = async (rawJobDescription: string): Promise<OpportunitySkill[]> => {
  try {
    const res = await api.post<OpportunitySkill[]>('/opportunities/parse-jd', { rawJobDescription });
    return res.data;
  } catch (err) {
    return [
      { skillId: 1, skillName: "Java", category: "Programming", importance: 90, minimumScore: 80 },
      { skillId: 2, skillName: "Spring Boot", category: "Backend", importance: 85, minimumScore: 75 },
      { skillId: 4, skillName: "SQL", category: "Database", importance: 80, minimumScore: 70 },
      { skillId: 6, skillName: "Docker", category: "DevOps", importance: 60, minimumScore: 50 }
    ];
  }
};

export const createOpportunity = async (oppData: any): Promise<Opportunity> => {
  try {
    const res = await api.post<Opportunity>('/opportunities', oppData);
    return res.data;
  } catch (err) {
    return {
      id: 101,
      company: mockCompanies[0],
      title: oppData.title || "Junior Java Engineer",
      type: oppData.type || "JOB",
      description: oppData.description || "",
      location: oppData.location || "Remote",
      duration: oppData.duration || "Full-time",
      stipend: oppData.stipend || "₹10,00,000 / yr",
      minCgpa: oppData.minCgpa || 7.0,
      preferredDegree: oppData.preferredDegree || "B.Tech",
      deadline: "2026-12-31",
      status: "OPEN",
      skills: []
    };
  }
};

export const applyForOpportunity = async (opportunityId: number, coverNote: string = '', studentId: number = 1): Promise<Application> => {
  try {
    const res = await api.post<Application>(`/applications?studentProfileId=${studentId}&opportunityId=${opportunityId}&coverNote=${encodeURIComponent(coverNote)}`);
    return res.data;
  } catch (err) {
    return {
      id: 201,
      opportunityId,
      opportunityTitle: "Junior Java Backend Engineer",
      companyName: "VMware / Broadcom",
      studentProfileId: studentId,
      studentName: "Alex Chen",
      status: "APPLIED",
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      coverNote
    };
  }
};

export const fetchStudentApplications = async (studentId: number = 1): Promise<Application[]> => {
  try {
    const res = await api.get<Application[]>(`/applications/student/${studentId}`);
    return res.data;
  } catch (err) {
    return mockApplications;
  }
};

export const searchIndustryCandidates = async (skills?: string[]): Promise<CandidateSearchResult[]> => {
  try {
    const params = skills && skills.length > 0 ? { skills: skills.join(',') } : {};
    const res = await api.get<CandidateSearchResult[]>('/industry/candidates', { params });
    return res.data;
  } catch (e) {
    return [
      { studentId: 1, studentName: 'Alex Chen', gitHubUsername: 'alexchen-dev', overallMatchScore: 92, topSkills: ['Java', 'Spring Boot', 'SQL', 'Docker'], cgpa: 8.8, targetRole: 'Backend Developer' },
      { studentId: 2, studentName: 'Priya Sharma', gitHubUsername: 'priyasharma-code', overallMatchScore: 87, topSkills: ['Java', 'REST API', 'PostgreSQL'], cgpa: 8.5, targetRole: 'Backend Developer' },
      { studentId: 3, studentName: 'Rohan Mehta', gitHubUsername: 'rohan-m', overallMatchScore: 81, topSkills: ['Java', 'Spring Boot', 'AWS'], cgpa: 7.9, targetRole: 'Backend Developer' }
    ];
  }
};

export const fetchCandidateEvidence = async (candidateId: number): Promise<DigitalSkillPassport> => {
  try {
    const res = await api.get<DigitalSkillPassport>(`/industry/candidates/${candidateId}/evidence`);
    return res.data;
  } catch (e) {
    return fetchDigitalSkillPassport(candidateId);
  }
};

// Module 4 API Calls
export const fetchCollaborations = async (): Promise<Collaboration[]> => {
  try {
    const res = await api.get<Collaboration[]>('/collaborations');
    return res.data;
  } catch (e) {
    return [
      {
        id: 1,
        companyName: 'VMware / Broadcom',
        title: 'Healthcare AI & Edge Computer Vision Joint Research',
        description: 'Co-develop lightweight edge computer vision models for real-time medical imaging analysis.',
        type: 'RESEARCH',
        requirements: 'Looking for AI/ML faculty and postgraduate researchers.',
        startDate: '2026-09-01',
        endDate: '2027-03-31',
        status: 'OPEN',
        skills: ['Java', 'Machine Learning', 'Computer Vision']
      },
      {
        id: 2,
        companyName: 'Google Cloud',
        title: 'Cloud Native Microservices Architecture Workshop & FDP',
        description: '3-day Faculty Development Program on Kubernetes, Distributed Tracing, and Service Mesh.',
        type: 'FDP',
        requirements: 'Open to Computer Science & IT faculty members.',
        startDate: '2026-10-10',
        endDate: '2026-10-12',
        status: 'OPEN',
        skills: ['Spring Boot', 'Docker', 'Kubernetes']
      }
    ];
  }
};

export const createCollaboration = async (col: Partial<Collaboration>): Promise<Collaboration> => {
  try {
    const res = await api.post<Collaboration>('/collaborations', col);
    return res.data;
  } catch (e) {
    return {
      id: Date.now(),
      companyName: col.companyName || 'VMware',
      title: col.title || 'Live Industry Project',
      description: col.description || '',
      type: col.type || 'LIVE_PROJECT',
      requirements: col.requirements || '',
      startDate: col.startDate || '2026-09-15',
      endDate: col.endDate || '2026-12-15',
      status: 'OPEN',
      skills: ['Java', 'Spring Boot']
    };
  }
};

export const expressCollaborationInterest = async (id: number): Promise<string> => {
  try {
    const res = await api.post<string>(`/collaborations/${id}/interest`);
    return res.data;
  } catch (e) {
    return 'Interest expressed successfully!';
  }
};

export const fetchFaculty = async (): Promise<Academician[]> => {
  try {
    const res = await api.get<Academician[]>('/faculty');
    return res.data;
  } catch (e) {
    return [
      {
        id: 1,
        name: 'Dr. Sarah Jenkins',
        email: 'sarah.jenkins@nit.edu',
        institutionName: 'National Institute of Technology',
        department: 'Computer Science & Engineering',
        expertise: 'Machine Learning, Computer Vision, Healthcare Analytics',
        researchAreas: 'Healthcare AI, Distributed ML',
        publications: '15+ High-Impact IEEE Papers',
        projects: 'AI Disease Diagnostics Engine',
        yearsExperience: 14
      }
    ];
  }
};

export const matchFaculty = async (query?: string): Promise<FacultyMatchResult[]> => {
  try {
    const res = await api.get<FacultyMatchResult[]>('/faculty/match', { params: { query } });
    return res.data;
  } catch (e) {
    return [
      {
        academicianId: 1,
        facultyName: 'Dr. Sarah Jenkins',
        department: 'Computer Science & Engineering',
        expertise: 'Machine Learning, Computer Vision, Healthcare Analytics',
        researchAreas: 'Healthcare AI, Distributed ML',
        matchScore: 91,
        matchedSkills: ['Machine Learning', 'Computer Vision', 'Healthcare Analytics'],
        reasoning: 'High research alignment in Machine Learning, Computer Vision with 14+ years academic experience.'
      }
    ];
  }
};

export const fetchMentors = async (): Promise<Mentor[]> => {
  try {
    const res = await api.get<Mentor[]>('/mentors');
    return res.data;
  } catch (e) {
    return [
      {
        id: 1,
        name: 'Marcus Vance',
        companyName: 'VMware / Broadcom',
        title: 'Senior Staff Cloud Architect',
        expertise: 'Java, Spring Boot, Microservices, Cloud Native',
        availability: 'Available 4 hrs/wk',
        yearsExperience: 12
      }
    ];
  }
};

export const fetchStudentMentorships = async (studentProfileId: number = 1): Promise<Mentorship[]> => {
  try {
    const res = await api.get<Mentorship[]>(`/mentorships/student/${studentProfileId}`);
    return res.data;
  } catch (e) {
    return [
      {
        id: 1,
        mentorName: 'Marcus Vance',
        companyName: 'VMware',
        studentName: 'Alex Chen',
        skillName: 'Java & Microservices',
        status: 'ACTIVE',
        startedAt: '2026-06-01'
      }
    ];
  }
};

export const submitMentorFeedback = async (
  studentProfileId: number = 1,
  mentorId: number = 1,
  skillId: number = 1,
  score: number = 88,
  comments: string = 'Exceptional OOP design and API architecture.',
  techEval?: string,
  softEval?: string
): Promise<MentorFeedback> => {
  try {
    const res = await api.post<MentorFeedback>('/mentor-feedback', null, {
      params: { studentProfileId, mentorId, skillId, score, comments, technicalEvaluation: techEval, softSkillEvaluation: softEval }
    });
    return res.data;
  } catch (e) {
    return {
      id: Date.now(),
      studentProfileId,
      studentName: 'Alex Chen',
      mentorId,
      mentorName: 'Marcus Vance',
      skillId,
      skillName: 'Java',
      score,
      comments,
      technicalEvaluation: techEval || 'Strong REST API design and clean code pattern',
      softSkillEvaluation: softEval || 'Clear communication and proactive problem solving',
      createdAt: new Date().toISOString().substring(0, 10)
    };
  }
};

export const fetchStudentMentorFeedback = async (studentProfileId: number = 1): Promise<MentorFeedback[]> => {
  try {
    const res = await api.get<MentorFeedback[]>(`/students/${studentProfileId}/mentor-feedback`);
    return res.data;
  } catch (e) {
    return [
      {
        id: 1,
        studentProfileId: 1,
        studentName: 'Alex Chen',
        mentorId: 1,
        mentorName: 'Marcus Vance',
        skillId: 1,
        skillName: 'Java',
        score: 88,
        comments: 'Demonstrated solid understanding of Spring Boot Dependency Injection and concurrency.',
        technicalEvaluation: 'Clean architectural patterns and excellent unit test coverage.',
        softSkillEvaluation: 'Proactive in sprint reviews and effective technical communication.',
        createdAt: '2026-08-20'
      }
    ];
  }
};

export const fetchStudentInternships = async (studentProfileId: number = 1): Promise<Internship[]> => {
  try {
    const res = await api.get<Internship[]>(`/internships/student/${studentProfileId}`);
    return res.data;
  } catch (e) {
    return [
      {
        id: 1,
        studentProfileId: 1,
        studentName: 'Alex Chen',
        companyName: 'VMware / Broadcom',
        opportunityTitle: 'Backend Engineering Intern',
        mentorName: 'Marcus Vance',
        startDate: '2026-06-01',
        endDate: '2026-11-30',
        status: 'ONGOING',
        completionStatus: 'In Progress'
      }
    ];
  }
};

export const completeInternship = async (id: number, completionStatus: string = 'Completed with Distinction'): Promise<Internship> => {
  try {
    const res = await api.put<Internship>(`/internships/${id}/complete`, null, { params: { completionStatus } });
    return res.data;
  } catch (e) {
    return {
      id,
      studentProfileId: 1,
      studentName: 'Alex Chen',
      companyName: 'VMware / Broadcom',
      opportunityTitle: 'Backend Engineering Intern',
      mentorName: 'Marcus Vance',
      startDate: '2026-06-01',
      endDate: '2026-11-30',
      status: 'COMPLETED',
      completionStatus
    };
  }
};

// Module 5 API Calls
export const fetchInstitutionDashboard = async (id: number = 1): Promise<InstitutionDashboard> => {
  try {
    const res = await api.get<InstitutionDashboard>(`/institutions/${id}/dashboard`);
    return res.data;
  } catch (e) {
    return {
      institutionId: 1,
      institutionName: 'National Institute of Technology',
      totalStudents: 1250,
      assessedStudents: 1040,
      placementReadyStudents: 720,
      internshipStudents: 380,
      placedStudents: 640
    };
  }
};

export const fetchInstitutionSkillGaps = async (id: number = 1, department?: string, year?: number): Promise<SkillGapAnalyticsItem[]> => {
  try {
    const res = await api.get<SkillGapAnalyticsItem[]>(`/institutions/${id}/skill-gaps`, { params: { department, year } });
    return res.data;
  } catch (e) {
    return [
      { skillName: 'Cloud Architecture', category: 'Cloud', gapPercentage: 48, avgStudentScore: 42, requiredBenchmark: 90 },
      { skillName: 'Docker & Containers', category: 'DevOps', gapPercentage: 44, avgStudentScore: 36, requiredBenchmark: 80 },
      { skillName: 'AI/ML & Vision', category: 'AI/ML', gapPercentage: 39, avgStudentScore: 51, requiredBenchmark: 90 },
      { skillName: 'Cybersecurity', category: 'Security', gapPercentage: 35, avgStudentScore: 45, requiredBenchmark: 80 },
      { skillName: 'Technical Communication', category: 'Soft Skills', gapPercentage: 31, avgStudentScore: 64, requiredBenchmark: 95 }
    ];
  }
};

export const fetchInstitutionDemand = async (id: number = 1): Promise<IndustryDemandItem[]> => {
  try {
    const res = await api.get<IndustryDemandItem[]>(`/institutions/${id}/industry-demand`);
    return res.data;
  } catch (e) {
    return [
      { skillName: 'Java', category: 'Programming', demandCount: 420, demandPercentage: 85, trendIndicator: 'UP' },
      { skillName: 'Spring Boot', category: 'Backend', demandCount: 380, demandPercentage: 78, trendIndicator: 'UP' },
      { skillName: 'Cloud Architecture', category: 'Cloud', demandCount: 350, demandPercentage: 72, trendIndicator: 'UP' },
      { skillName: 'SQL / PostgreSQL', category: 'Database', demandCount: 310, demandPercentage: 64, trendIndicator: 'STABLE' },
      { skillName: 'Docker', category: 'DevOps', demandCount: 290, demandPercentage: 60, trendIndicator: 'UP' }
    ];
  }
};

export const fetchInstitutionGapDemand = async (id: number = 1): Promise<GapDemandMatrixItem[]> => {
  try {
    const res = await api.get<GapDemandMatrixItem[]>(`/institutions/${id}/gap-demand-matrix`);
    return res.data;
  } catch (e) {
    return [
      { skillName: 'Java', industryDemandLevel: 'HIGH', studentProficiencyLevel: 'HIGH', gapLevel: 'LOW', recommendedAction: 'MAINTAIN' },
      { skillName: 'Cloud Architecture', industryDemandLevel: 'VERY_HIGH', studentProficiencyLevel: 'LOW', gapLevel: 'HIGH', recommendedAction: 'URGENT' },
      { skillName: 'AI/ML', industryDemandLevel: 'HIGH', studentProficiencyLevel: 'MEDIUM', gapLevel: 'MEDIUM', recommendedAction: 'IMPROVE' },
      { skillName: 'Docker & Containers', industryDemandLevel: 'HIGH', studentProficiencyLevel: 'LOW', gapLevel: 'HIGH', recommendedAction: 'URGENT' },
      { skillName: 'SQL Database', industryDemandLevel: 'MEDIUM', studentProficiencyLevel: 'HIGH', gapLevel: 'LOW', recommendedAction: 'MAINTAIN' }
    ];
  }
};

export const fetchInstitutionDepartments = async (id: number = 1): Promise<DepartmentComparison[]> => {
  try {
    const res = await api.get<DepartmentComparison[]>(`/institutions/${id}/departments`);
    return res.data;
  } catch (e) {
    return [
      { departmentName: 'Computer Science & Engineering (CSE)', avgSkillScore: 82, placementReadinessPercentage: 76, assessmentParticipationPercentage: 92, internshipParticipationPercentage: 48, topSkillGap: 'Cloud Architecture' },
      { departmentName: 'Information Technology (IT)', avgSkillScore: 77, placementReadinessPercentage: 70, assessmentParticipationPercentage: 88, internshipParticipationPercentage: 42, topSkillGap: 'Docker & Containers' },
      { departmentName: 'Electronics & Communication (ECE)', avgSkillScore: 68, placementReadinessPercentage: 58, assessmentParticipationPercentage: 79, internshipParticipationPercentage: 32, topSkillGap: 'Java & Microservices' }
    ];
  }
};

export const fetchInstitutionPlacements = async (id: number = 1): Promise<PlacementFunnelAnalytics> => {
  try {
    const res = await api.get<PlacementFunnelAnalytics>(`/institutions/${id}/placement-analytics`);
    return res.data;
  } catch (e) {
    return {
      eligibleCount: 950,
      appliedCount: 880,
      shortlistedCount: 540,
      interviewedCount: 420,
      selectedCount: 320,
      applicationRate: 92,
      shortlistRate: 61,
      selectionRate: 76,
      placementReadinessRate: 72
    };
  }
};

export const fetchInstitutionCurriculum = async (id: number = 1): Promise<CurriculumInsight[]> => {
  try {
    const res = await api.get<CurriculumInsight[]>(`/institutions/${id}/curriculum-insights`);
    return res.data;
  } catch (e) {
    return [
      {
        skillName: 'Cloud Architecture',
        demandLevel: 'VERY_HIGH',
        studentProficiency: 'LOW',
        actionType: 'WORKSHOP',
        recommendation: '⚠️ Introduce AWS/GCP Cloud Architecture Workshop for 3rd Year CSE/IT students immediately.'
      },
      {
        skillName: 'Docker & Kubernetes',
        demandLevel: 'HIGH',
        studentProficiency: 'LOW',
        actionType: 'ELECTIVE',
        recommendation: '⚠️ Add "Containerization & DevOps Engineering" as an open elective for Semester 6.'
      },
      {
        skillName: 'AI/ML Healthcare',
        demandLevel: 'HIGH',
        studentProficiency: 'MEDIUM',
        actionType: 'FDP',
        recommendation: 'Organize Faculty Development Program (FDP) on Applied Deep Learning in Healthcare.'
      }
    ];
  }
};

