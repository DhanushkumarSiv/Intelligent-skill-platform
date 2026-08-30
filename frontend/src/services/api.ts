import axios from 'axios';
import { 
  SkillPassport, Assessment, AssessmentResult, GitHubAnalysisResult, Project, Certificate,
  GapAnalysisResult, Course, LearningPath, LearningProgressStep, ReassessmentResult 
} from '../types';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Demo Fallbacks for Module 1 & 2
const mockSkillPassport: SkillPassport = {
  studentId: 1,
  studentName: "Alex Chen",
  targetRole: "Backend Developer",
  gitHubUsername: "alexchen-dev",
  overallPassportScore: 82,
  totalVerifiedSkills: 4,
  lastUpdatedAt: new Date().toISOString(),
  skills: [
    {
      id: 1,
      skillId: 1,
      skillName: "Java",
      category: "Programming",
      selfDeclaredScore: 80,
      assessmentScore: 85,
      evidenceScore: 90,
      verifiedScore: 88,
      verificationStatus: "VERIFIED",
      lastVerifiedAt: new Date().toISOString(),
      evidenceList: [
        { id: 101, source: "ASSESSMENT", score: 85, weight: 0.40, details: "Skill Assessment score: 85/100", createdAt: new Date().toISOString() },
        { id: 102, source: "GITHUB_AST", score: 90, weight: 0.30, details: "GitHub AST Analysis detected @RestController, @Service, and @Repository annotations across 48 commits (85% authorship).", createdAt: new Date().toISOString() },
        { id: 103, source: "PROJECT", score: 80, weight: 0.15, details: "Project Evidence from 'E-Commerce REST API Engine'", createdAt: new Date().toISOString() },
        { id: 104, source: "CERTIFICATE", score: 75, weight: 0.10, details: "PDF Certificate Verified: Oracle Certified Associate - Java SE", createdAt: new Date().toISOString() }
      ]
    },
    {
      id: 2,
      skillId: 2,
      skillName: "Spring Boot",
      category: "Backend",
      selfDeclaredScore: 70,
      assessmentScore: 60,
      evidenceScore: 82,
      verifiedScore: 82,
      verificationStatus: "VERIFIED",
      lastVerifiedAt: new Date().toISOString(),
      evidenceList: [
        { id: 105, source: "ASSESSMENT", score: 60, weight: 0.40, details: "Skill Assessment score: 60/100", createdAt: new Date().toISOString() },
        { id: 106, source: "GITHUB_AST", score: 82, weight: 0.30, details: "GitHub Dependency & AST Scan confirmed Spring Boot starter web and Data JPA.", createdAt: new Date().toISOString() },
        { id: 107, source: "CERTIFICATE", score: 75, weight: 0.10, details: "PDF Certificate Verified: Spring Boot Professional Certificate", createdAt: new Date().toISOString() }
      ]
    },
    {
      id: 3,
      skillId: 3,
      skillName: "REST API",
      category: "Backend",
      selfDeclaredScore: 75,
      assessmentScore: 78,
      evidenceScore: 80,
      verifiedScore: 80,
      verificationStatus: "VERIFIED",
      lastVerifiedAt: new Date().toISOString(),
      evidenceList: [
        { id: 108, source: "ASSESSMENT", score: 78, weight: 0.40, details: "Skill Assessment score: 78/100", createdAt: new Date().toISOString() },
        { id: 109, source: "PROJECT", score: 80, weight: 0.15, details: "Project Evidence from 'E-Commerce REST API Engine'", createdAt: new Date().toISOString() }
      ]
    },
    {
      id: 4,
      skillId: 4,
      skillName: "SQL",
      category: "Database",
      selfDeclaredScore: 70,
      assessmentScore: 78,
      evidenceScore: 75,
      verifiedScore: 76,
      verificationStatus: "ASSESSED",
      lastVerifiedAt: new Date().toISOString(),
      evidenceList: [
        { id: 110, source: "ASSESSMENT", score: 78, weight: 0.40, details: "Skill Assessment score: 78/100", createdAt: new Date().toISOString() }
      ]
    },
    {
      id: 5,
      skillId: 6,
      skillName: "Docker",
      category: "DevOps",
      selfDeclaredScore: 30,
      assessmentScore: 25,
      evidenceScore: 35,
      verifiedScore: 25,
      verificationStatus: "EVIDENCE_FOUND",
      lastVerifiedAt: new Date().toISOString(),
      evidenceList: [
        { id: 111, source: "ASSESSMENT", score: 25, weight: 0.40, details: "Skill Assessment score: 25/100", createdAt: new Date().toISOString() },
        { id: 112, source: "GITHUB_AST", score: 35, weight: 0.30, details: "Dockerfile detected in repository root.", createdAt: new Date().toISOString() }
      ]
    },
    {
      id: 6,
      skillId: 11,
      skillName: "AWS",
      category: "Cloud",
      selfDeclaredScore: 20,
      verifiedScore: 20,
      verificationStatus: "SELF_DECLARED",
      lastVerifiedAt: new Date().toISOString(),
      evidenceList: []
    }
  ]
};

const mockGapAnalysis: GapAnalysisResult = {
  studentId: 1,
  targetRoleName: "Backend Developer",
  totalGaps: 3,
  urgentGaps: 1,
  gaps: [
    {
      skillId: 6,
      skillName: "Docker",
      category: "DevOps",
      requiredLevel: 60,
      verifiedScore: 25,
      gap: 35,
      importance: 80,
      priorityScore: 2800,
      priorityLevel: "URGENT"
    },
    {
      skillId: 2,
      skillName: "Spring Boot",
      category: "Backend",
      requiredLevel: 85,
      verifiedScore: 82,
      gap: 3,
      importance: 85,
      priorityScore: 255,
      priorityLevel: "LOW"
    },
    {
      skillId: 4,
      skillName: "SQL",
      category: "Database",
      requiredLevel: 80,
      verifiedScore: 76,
      gap: 4,
      importance: 80,
      priorityScore: 320,
      priorityLevel: "LOW"
    }
  ]
};

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Docker Fundamentals & Container Architecture",
    provider: "Docker Inc / Coursera",
    url: "https://docker.com/learn",
    description: "Master containers, Dockerfiles, images, volume mounts, and environment configuration.",
    difficulty: "Beginner",
    durationHours: 8,
    qualityScore: 92,
    coverageLevel: 90
  },
  {
    id: 2,
    title: "Dockerizing Spring Boot Microservices",
    provider: "Spring Academy",
    url: "https://spring.io/academy",
    description: "Learn containerizing Spring Boot apps, multi-stage Docker builds, and JVM memory tuning.",
    difficulty: "Intermediate",
    durationHours: 12,
    qualityScore: 95,
    coverageLevel: 95
  },
  {
    id: 3,
    title: "Docker Compose & Multi-Container Networking",
    provider: "Udemy",
    url: "https://udemy.com/docker-compose",
    description: "Orchestrate Spring Boot, PostgreSQL, and Redis containers with Docker Compose.",
    difficulty: "Intermediate",
    durationHours: 10,
    qualityScore: 88,
    coverageLevel: 85
  }
];

const mockLearningPaths: LearningPath[] = [
  {
    id: 1,
    skillId: 6,
    skillName: "Docker",
    title: "Personalized Docker Mastery Path",
    totalSteps: 5,
    status: "IN_PROGRESS",
    initialScore: 25,
    currentScore: 25,
    steps: [
      { id: 1, learningPathId: 1, stepNumber: 1, moduleTitle: "Docker Fundamentals & Core Concepts", course: mockCourses[0], status: "IN_PROGRESS", progress: 80 },
      { id: 2, learningPathId: 1, stepNumber: 2, moduleTitle: "Dockerizing Spring Boot Applications", course: mockCourses[1], status: "NOT_STARTED", progress: 0 },
      { id: 3, learningPathId: 1, stepNumber: 3, moduleTitle: "Docker Compose & Multi-Container Networks", course: mockCourses[2], status: "NOT_STARTED", progress: 0 },
      { id: 4, learningPathId: 1, stepNumber: 4, moduleTitle: "Practical Docker Capstone Project", course: mockCourses[1], status: "NOT_STARTED", progress: 0 },
      { id: 5, learningPathId: 1, stepNumber: 5, moduleTitle: "Docker Post-Learning Skill Reassessment", status: "NOT_STARTED", progress: 0 }
    ]
  }
];

// Module 1 API methods
export const fetchSkillPassport = async (studentId: number = 1): Promise<SkillPassport> => {
  try {
    const res = await api.get<SkillPassport>(`/students/${studentId}/skill-passport`);
    return res.data;
  } catch (err) {
    return mockSkillPassport;
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
        { id: 1, skillId: 1, skillName: "Java", questionText: "Which of the following guarantees thread safety in Java concurrent access?", type: "MCQ", options: ["ArrayList", "ConcurrentHashMap", "HashMap", "LinkedList"] },
        { id: 2, skillId: 2, skillName: "Spring Boot", questionText: "What HTTP response status code does this Spring REST controller return by default on success?", type: "CODE_OUTPUT", codeSnippet: "@RestController\n@RequestMapping(\"/api/orders\")\npublic class OrderController {\n    @PostMapping\n    public String createOrder() {\n        return \"Order Created\";\n    }\n}", options: ["200 OK", "201 Created", "204 No Content", "500 Internal Server Error"] },
        { id: 3, skillId: 4, skillName: "SQL", questionText: "Which SQL JOIN type returns all records from the left table and matched records from the right table?", type: "MCQ", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"] },
        { id: 4, skillId: 6, skillName: "Docker", questionText: "Which Dockerfile instruction specifies the executable command run when the container starts?", type: "MCQ", options: ["RUN", "EXPOSE", "ENTRYPOINT", "COPY"] }
      ]
    };
  }
};

export const submitAssessment = async (assessmentId: number, answers: { questionId: number; selectedAnswer: string }[]): Promise<AssessmentResult> => {
  try {
    const res = await api.post<AssessmentResult>(`/assessments/${assessmentId}/submit?studentProfileId=1`, { answers });
    return res.data;
  } catch (err) {
    return {
      studentAssessmentId: 101,
      overallScore: 80,
      skillWiseScores: { "Java": 100, "Spring Boot": 100, "SQL": 100, "Docker": 0 },
      questionFeedback: []
    };
  }
};

export const analyzeGitHubRepo = async (repositoryUrl: string): Promise<GitHubAnalysisResult> => {
  try {
    const res = await api.post<GitHubAnalysisResult>('/github/analyze', { repositoryUrl, studentProfileId: 1 });
    return res.data;
  } catch (err) {
    return {
      repoName: "spring-boot-api",
      owner: "alexchen",
      commitCount: 48,
      contributorRatio: 0.85,
      detectedLanguages: ["Java", "Dockerfile", "SQL", "Shell"],
      dependencies: [
        { dependencyName: "spring-boot-starter-web", mappedSkill: "Spring Boot", baseScore: 15 },
        { dependencyName: "spring-boot-starter-data-jpa", mappedSkill: "SQL", baseScore: 15 }
      ],
      astFindings: [
        { filePath: "src/main/java/controller/UserController.java", annotationOrConstruct: "@RestController", mappedSkill: "REST API", codeDepthLevel: 30, detail: "REST Controller endpoint class" }
      ],
      skillScores: { "Java": 90, "Spring Boot": 82, "REST API": 80, "SQL": 75, "Docker": 30 },
      summaryText: "AST Code Analysis detected full enterprise layered architecture."
    };
  }
};

export const submitProject = async (projectData: any): Promise<Project> => {
  try {
    const res = await api.post<Project>('/projects?studentProfileId=1', projectData);
    return res.data;
  } catch (err) {
    return {
      id: 201,
      name: projectData.name || "E-Commerce REST API Engine",
      description: projectData.description || "Microservices backend",
      repositoryUrl: projectData.repositoryUrl || "https://github.com/alexchen/ecommerce-api",
      technologies: ["Java", "Spring Boot", "SQL"],
      studentRole: "Lead Backend Developer",
      durationMonths: 3,
      createdAt: new Date().toISOString()
    };
  }
};

export const uploadCertificatePdf = async (file: File): Promise<Certificate> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await api.post<Certificate>('/certificates/upload?studentProfileId=1', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    return {
      id: 301,
      issuer: "Coursera / VMware",
      courseName: "Java & Spring Boot Backend Development",
      studentName: "Alex Chen",
      credentialId: "CERT-99481-JAVA",
      issueDate: "2025-06-15",
      verificationStatus: "VERIFIED",
      extractedText: "Certificate of Completion",
      matchedSkills: ["Java", "Spring Boot"],
      createdAt: new Date().toISOString()
    };
  }
};

/* Module 2 API methods */
export const fetchSkillGaps = async (studentId: number = 1): Promise<GapAnalysisResult> => {
  try {
    const res = await api.get<GapAnalysisResult>(`/skill-gaps/student/${studentId}`);
    return res.data;
  } catch (err) {
    return mockGapAnalysis;
  }
};

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const res = await api.get<Course[]>('/courses');
    return res.data;
  } catch (err) {
    return mockCourses;
  }
};

export const createLearningPath = async (skillId: number, studentId: number = 1): Promise<LearningPath> => {
  try {
    const res = await api.post<LearningPath>(`/learning-paths?studentProfileId=${studentId}&skillId=${skillId}`);
    return res.data;
  } catch (err) {
    return mockLearningPaths[0];
  }
};

export const fetchStudentLearningPaths = async (studentId: number = 1): Promise<LearningPath[]> => {
  try {
    const res = await api.get<LearningPath[]>(`/learning-paths/student/${studentId}`);
    return res.data;
  } catch (err) {
    return mockLearningPaths;
  }
};

export const updateStepProgress = async (progressId: number, progressPercent: number, status: string = 'COMPLETED'): Promise<LearningProgressStep> => {
  try {
    const res = await api.put<LearningProgressStep>(`/learning-paths/progress/${progressId}?progressPercent=${progressPercent}&status=${status}`);
    return res.data;
  } catch (err) {
    return {
      id: progressId,
      learningPathId: 1,
      stepNumber: 1,
      moduleTitle: "Docker Fundamentals & Core Concepts",
      course: mockCourses[0],
      status: "COMPLETED",
      progress: 100
    };
  }
};

export const processReassessment = async (skillId: number, learningPathId: number, scoreAchieved: number = 67): Promise<ReassessmentResult> => {
  try {
    const res = await api.post<ReassessmentResult>('/reassessment', {
      studentProfileId: 1,
      skillId,
      learningPathId,
      scoreAchieved
    });
    return res.data;
  } catch (err) {
    return {
      skillId,
      skillName: "Docker",
      previousScore: 25,
      newScore: scoreAchieved,
      improvement: scoreAchieved - 25,
      updatedStatus: "VERIFIED"
    };
  }
};
