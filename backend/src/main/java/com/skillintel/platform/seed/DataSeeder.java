package com.skillintel.platform.seed;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.CollaborationType;
import com.skillintel.platform.domain.enums.InternshipStatus;
import com.skillintel.platform.domain.enums.OpportunityType;
import com.skillintel.platform.domain.enums.QuestionType;
import com.skillintel.platform.domain.enums.RoleEnum;
import com.skillintel.platform.repository.*;
import com.skillintel.platform.service.EvidenceEngineService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SkillRepository skillRepository;
    private final TargetRoleRepository roleRepository;
    private final RoleSkillRepository roleSkillRepository;
    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final AssessmentRepository assessmentRepository;
    private final AssessmentQuestionRepository questionRepository;
    private final EvidenceEngineService evidenceEngineService;
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;
    private final CourseSkillMapRepository courseSkillMapRepository;
    private final CompanyRepository companyRepository;
    private final OpportunityRepository opportunityRepository;
    private final OpportunitySkillRepository opportunitySkillRepository;
    private final AcademicianRepository academicianRepository;
    private final CollaborationRepository collaborationRepository;
    private final CollaborationSkillRepository collaborationSkillRepository;
    private final MentorRepository mentorRepository;
    private final MentorshipRepository mentorshipRepository;
    private final InternshipRepository internshipRepository;

    public DataSeeder(SkillRepository skillRepository,
                      TargetRoleRepository roleRepository,
                      RoleSkillRepository roleSkillRepository,
                      UserRepository userRepository,
                      StudentProfileRepository studentProfileRepository,
                      AssessmentRepository assessmentRepository,
                      AssessmentQuestionRepository questionRepository,
                      EvidenceEngineService evidenceEngineService,
                      PasswordEncoder passwordEncoder,
                      CourseRepository courseRepository,
                      CourseSkillMapRepository courseSkillMapRepository,
                      CompanyRepository companyRepository,
                      OpportunityRepository opportunityRepository,
                      OpportunitySkillRepository opportunitySkillRepository,
                      AcademicianRepository academicianRepository,
                      CollaborationRepository collaborationRepository,
                      CollaborationSkillRepository collaborationSkillRepository,
                      MentorRepository mentorRepository,
                      MentorshipRepository mentorshipRepository,
                      InternshipRepository internshipRepository) {
        this.skillRepository = skillRepository;
        this.roleRepository = roleRepository;
        this.roleSkillRepository = roleSkillRepository;
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.assessmentRepository = assessmentRepository;
        this.questionRepository = questionRepository;
        this.evidenceEngineService = evidenceEngineService;
        this.passwordEncoder = passwordEncoder;
        this.courseRepository = courseRepository;
        this.courseSkillMapRepository = courseSkillMapRepository;
        this.companyRepository = companyRepository;
        this.opportunityRepository = opportunityRepository;
        this.opportunitySkillRepository = opportunitySkillRepository;
        this.academicianRepository = academicianRepository;
        this.collaborationRepository = collaborationRepository;
        this.collaborationSkillRepository = collaborationSkillRepository;
        this.mentorRepository = mentorRepository;
        this.mentorshipRepository = mentorshipRepository;
        this.internshipRepository = internshipRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (skillRepository.count() > 0) return;

        Skill java = createSkill("Java", "Programming", "Core Java, OOPs, Collections, Concurrency", "Java17, CoreJava");
        Skill springBoot = createSkill("Spring Boot", "Backend", "Spring Framework, Spring MVC, Spring Data JPA, AutoConfiguration", "SpringBoot, Spring");
        Skill restApi = createSkill("REST API", "Backend", "RESTful web services, HTTP protocols, OpenAPI, JSON", "REST, RESTful");
        Skill sql = createSkill("SQL", "Database", "Relational queries, Joins, Indexing, Transactions", "RDBMS, RelationalDB");
        Skill postgres = createSkill("PostgreSQL", "Database", "Advanced Relational DB, JSONB, CTEs, Extensions", "Postgres, PGSQL");
        Skill docker = createSkill("Docker", "DevOps", "Containerization, Dockerfile, Docker Compose, Images", "Containers");
        Skill git = createSkill("Git", "DevOps", "Version control, Branching, Merging, Rebase", "GitHub, VersionControl");
        Skill react = createSkill("React", "Frontend", "React.js, Component State, Hooks, JSX, Redux", "ReactJS");
        Skill python = createSkill("Python", "Programming", "Python3, Data structures, Generators, Decorators", "Py");
        Skill ml = createSkill("Machine Learning", "AI/ML", "Supervised/Unsupervised learning, Scikit-learn, Model evaluation", "ML, DataScience");
        Skill aws = createSkill("AWS", "Cloud", "Amazon EC2, S3, RDS, Lambda, IAM, VPC", "Amazon Web Services, Cloud");
        Skill comm = createSkill("Communication", "Soft Skills", "Professional verbal & written interaction, Team collaboration", "SoftSkills");
        Skill dsa = createSkill("Data Structures", "Programming", "Arrays, Trees, Graphs, Algorithms, Complexity", "DSA, Algorithms");
        Skill security = createSkill("Cybersecurity", "Security", "OWASP Top 10, AuthN/AuthZ, JWT, Encryption", "InfoSec");
        Skill k8s = createSkill("Kubernetes", "DevOps", "K8s Pods, Deployments, Services, Helm", "K8s");
        Skill microservices = createSkill("Microservices", "Backend", "Distributed Systems, Service Discovery, API Gateway", "Cloud Native");
        Skill sysDesign = createSkill("System Design", "Backend", "High Availability, Load Balancing, Caching, Scaling", "Software Architecture");
        Skill ts = createSkill("TypeScript", "Frontend", "Typed JavaScript, Interfaces, Generics", "TS");
        Skill htmlCss = createSkill("HTML/CSS", "Frontend", "HTML5 Semantic Tags, CSS Flexbox, Grid, Responsive Design", "Web Design");
        Skill cicd = createSkill("CI/CD", "DevOps", "GitHub Actions, Jenkins, Pipeline Automation", "Automation");
        Skill unitTesting = createSkill("Unit Testing", "Programming", "JUnit 5, Mockito, Test-Driven Development", "TDD");
        Skill nodejs = createSkill("Node.js", "Backend", "Node runtime, Express.js, Event Loop", "Node");

        TargetRole backendDev = createRole("Backend Developer", "Building robust scalable enterprise APIs & databases", "Backend");
        TargetRole frontendDev = createRole("Frontend Developer", "Crafting intuitive responsive modern web user interfaces", "Frontend");
        TargetRole dataAnalyst = createRole("Data Analyst", "Extracting insights from complex datasets and SQL databases", "Data");
        TargetRole mlEngineer = createRole("ML Engineer", "Designing and deploying production machine learning models", "AI/ML");
        TargetRole cloudEngineer = createRole("Cloud Engineer", "Managing AWS/Cloud infrastructure and DevOps pipelines", "Cloud");
        TargetRole devopsEngineer = createRole("DevOps Engineer", "Automating Docker, Kubernetes, and CI/CD pipelines", "DevOps");

        createRoleSkill(backendDev, java, 90, 80);
        createRoleSkill(backendDev, springBoot, 85, 75);
        createRoleSkill(backendDev, sql, 80, 70);
        createRoleSkill(backendDev, restApi, 80, 75);
        createRoleSkill(backendDev, git, 60, 50);
        createRoleSkill(backendDev, docker, 50, 50);

        User studentUser = createUser("alex.student", "alex@mit.edu", "password123", "Alex Chen", RoleEnum.STUDENT);
        createUser("techcorp.hr", "hr@techcorp.com", "password123", "TechCorp HR Team", RoleEnum.INDUSTRY);
        createUser("prof.vance", "vance@mit.edu", "password123", "Prof. Sarah Vance", RoleEnum.ACADEMICIAN);
        createUser("admin.dean", "dean@mit.edu", "password123", "Dr. Robert Miller", RoleEnum.INSTITUTION_ADMIN);

        StudentProfile alexProfile = StudentProfile.builder()
                .user(studentUser)
                .targetRole(backendDev)
                .gitHubUsername("alexchen-dev")
                .institutionName("Metropolitan Institute of Technology")
                .department("Computer Science & Engineering")
                .graduationYear(2026)
                .bio("Final-year Computer Science student passionate about Java Spring Boot backend development, distributed microservices, and clean architecture.")
                .build();
        alexProfile = studentProfileRepository.save(alexProfile);

        Assessment backendAssessment = Assessment.builder()
                .title("Backend Developer Core Skill Assessment")
                .targetRole(backendDev)
                .durationMinutes(20)
                .passingScore(70)
                .build();
        backendAssessment = assessmentRepository.save(backendAssessment);

        createQuestion(backendAssessment, java, QuestionType.MCQ,
                "Which of the following guarantees thread safety in Java concurrent access?",
                null,
                "[\"ArrayList\", \"ConcurrentHashMap\", \"HashMap\", \"LinkedList\"]",
                "ConcurrentHashMap",
                "ConcurrentHashMap uses fine-grained bucket lock striping to allow concurrent readers and thread-safe writes.");

        createQuestion(backendAssessment, springBoot, QuestionType.CODE_OUTPUT,
                "What HTTP response status code does this Spring REST controller return by default on success?",
                """
                @RestController
                @RequestMapping("/api/orders")
                public class OrderController {
                    @PostMapping
                    public String createOrder() {
                        return "Order Created";
                    }
                }
                """,
                "[\"200 OK\", \"201 Created\", \"204 No Content\", \"500 Internal Server Error\"]",
                "200 OK",
                "@PostMapping methods without @ResponseStatus return 200 OK by default.");

        createQuestion(backendAssessment, sql, QuestionType.MCQ,
                "Which SQL JOIN type returns all records from the left table and matched records from the right table?",
                null,
                "[\"INNER JOIN\", \"LEFT JOIN\", \"RIGHT JOIN\", \"FULL OUTER JOIN\"]",
                "LEFT JOIN",
                "LEFT JOIN (or LEFT OUTER JOIN) preserves all rows from the left dataset.");

        createQuestion(backendAssessment, docker, QuestionType.MCQ,
                "Which Dockerfile instruction specifies the executable command run when the container starts?",
                null,
                "[\"RUN\", \"EXPOSE\", \"ENTRYPOINT\", \"COPY\"]",
                "ENTRYPOINT",
                "ENTRYPOINT defines the default process or binary executed upon container boot.");

        evidenceEngineService.recordAssessmentEvidence(alexProfile.getId(), java.getId(), 85);
        evidenceEngineService.recordAssessmentEvidence(alexProfile.getId(), sql.getId(), 78);
        evidenceEngineService.recordAssessmentEvidence(alexProfile.getId(), springBoot.getId(), 60);
        evidenceEngineService.recordAssessmentEvidence(alexProfile.getId(), docker.getId(), 25);

        evidenceEngineService.recordGitHubEvidence(alexProfile.getId(), java.getId(), 90,
                "GitHub AST Code Analysis detected @RestController, @Service, and @Repository annotations across 48 commits.");
        evidenceEngineService.recordGitHubEvidence(alexProfile.getId(), springBoot.getId(), 82,
                "GitHub Dependency & AST Scan confirmed Spring Boot starter web and Data JPA.");

        evidenceEngineService.recordProjectEvidence(alexProfile.getId(), java.getId(), 80, "E-Commerce REST API Engine");
        evidenceEngineService.recordProjectEvidence(alexProfile.getId(), restApi.getId(), 80, "E-Commerce REST API Engine");

        evidenceEngineService.recordCertificateEvidence(alexProfile.getId(), java.getId(), 75, "Oracle Certified Associate - Java SE");
        evidenceEngineService.recordCertificateEvidence(alexProfile.getId(), springBoot.getId(), 75, "Spring Boot Professional Certificate");

        // 8. Seed Module 2 Courses & Course-Skill Mappings
        Course dockerFund = createCourse("Docker Fundamentals & Container Architecture", "Docker Inc / Coursera", "https://docker.com/learn", "Master containers, Dockerfiles, images, volume mounts, and environment configuration.", "Beginner", 8, 92);
        Course dockerSpringBoot = createCourse("Dockerizing Spring Boot Microservices", "Spring Academy", "https://spring.io/academy", "Learn containerizing Spring Boot apps, multi-stage Docker builds, and JVM memory tuning.", "Intermediate", 12, 95);
        Course dockerCompose = createCourse("Docker Compose & Multi-Container Networking", "Udemy", "https://udemy.com/docker-compose", "Orchestrate Spring Boot, PostgreSQL, and Redis containers with Docker Compose.", "Intermediate", 10, 88);
        Course springMicro = createCourse("Spring Boot Microservices & Cloud Native", "Udemy", "https://udemy.com/spring-microservices", "Enterprise microservice design with Spring Cloud, Eureka API Gateway, and Resilience4j.", "Advanced", 24, 94);
        Course sqlMaster = createCourse("PostgreSQL & Advanced Database Indexing", "Pluralsight", "https://pluralsight.com/sql", "Master SQL queries, JOIN optimization, CTEs, indexing strategies, and ACID transactions.", "Intermediate", 16, 90);

        createCourseSkill(dockerFund, docker, 90);
        createCourseSkill(dockerSpringBoot, docker, 95);
        createCourseSkill(dockerSpringBoot, springBoot, 80);
        createCourseSkill(dockerCompose, docker, 85);
        createCourseSkill(dockerCompose, devopsEngineer.getId() != null ? docker : docker, 85);
        createCourseSkill(springMicro, springBoot, 95);
        createCourseSkill(springMicro, restApi, 90);
        createCourseSkill(sqlMaster, sql, 95);
        createCourseSkill(sqlMaster, postgres, 90);

        // 9. Seed Module 3 Companies & Opportunities
        Company vmware = createCompany("VMware / Broadcom", "Enterprise Cloud & Virtualization", "Leading multi-cloud software company powering global enterprises.", "https://vmware.com", "Bangalore, India", true);
        Company googleCloud = createCompany("Google Cloud", "AI & Cloud Infrastructure", "Global cloud computing service suite by Google.", "https://cloud.google.com", "Hyderabad / Remote", true);
        Company razorpay = createCompany("Razorpay", "Fintech & Payments Infrastructure", "India's leading payment gateway and neo-banking platform.", "https://razorpay.com", "Bangalore, India", true);

        Opportunity javaBackendJob = createOpportunity(vmware, "Junior Java Backend Engineer", OpportunityType.JOB, "Build scalable Spring Boot microservices, REST APIs, and database persistence layers.", "Bangalore / Remote", "Full-time", "₹12,00,000 / yr", 7.5, "B.Tech Computer Science / IT", "2026-10-31");
        Opportunity devopsInternship = createOpportunity(googleCloud, "Cloud Infrastructure & DevOps Intern", OpportunityType.INTERNSHIP, "Gain hands-on experience with Docker containers, Kubernetes, CI/CD, and GCP infrastructure.", "Remote", "6 Months", "₹45,000 / mo", 7.0, "B.Tech / M.Tech CSE", "2026-09-30");
        Opportunity microservicesApprentice = createOpportunity(razorpay, "Microservices & API Fellow", OpportunityType.APPRENTICESHIP, "Design high-throughput payment APIs, caching mechanisms, and database transactions.", "Bangalore, India", "12 Months", "₹35,00,000 / yr", 6.5, "B.Tech", "2026-11-15");

        createOpportunitySkill(javaBackendJob, java, 90, 80);
        createOpportunitySkill(javaBackendJob, springBoot, 85, 75);
        createOpportunitySkill(javaBackendJob, sql, 80, 70);
        createOpportunitySkill(javaBackendJob, docker, 60, 50);

        createOpportunitySkill(devopsInternship, docker, 90, 60);
        createOpportunitySkill(devopsInternship, aws, 85, 50);
        createOpportunitySkill(devopsInternship, git, 75, 60);

        createOpportunitySkill(microservicesApprentice, restApi, 95, 75);
        createOpportunitySkill(microservicesApprentice, springBoot, 90, 75);
        createOpportunitySkill(microservicesApprentice, sql, 85, 70);

        // 10. Seed Module 4 Academia ↔ Industry Collaboration
        User facultyUser = createUser("sarah.jenkins@nit.edu", "sarah_jenkins", "Dr. Sarah Jenkins", "password123", RoleEnum.ACADEMICIAN);
        Academician sarahProfile = createAcademician(facultyUser, "National Institute of Technology", "Computer Science & Engineering", "Machine Learning, Computer Vision, Healthcare Analytics", "Healthcare AI, Distributed ML", "15+ High-Impact IEEE Papers", "AI Disease Diagnostics Engine", 14);

        User mentorUser = createUser("marcus.vance@vmware.com", "marcus_vance", "Marcus Vance", "password123", RoleEnum.INDUSTRY);
        Mentor marcusMentor = createMentor(mentorUser, vmware, "Senior Staff Cloud Architect", "Java, Spring Boot, Microservices, Cloud Native", "Available 4 hrs/wk", 12);

        Collaboration aiProject = createCollaboration(vmware, "Healthcare AI & Computer Vision Joint Research", "Co-develop edge AI models for real-time medical imaging analysis.", CollaborationType.RESEARCH, "Looking for AI/ML faculty and postgraduate researchers.", "2026-09-01", "2027-03-31");
        createCollaborationSkill(aiProject, java, 80);

        Mentorship mentorship = createMentorship(marcusMentor, alexProfile, java, "ACTIVE");

        Internship internship = createInternship(alexProfile, vmware, javaBackendJob, marcusMentor, "2026-06-01", "2026-11-30", InternshipStatus.ONGOING);
    }

    private Skill createSkill(String name, String category, String description, String aliases) {
        Skill skill = Skill.builder()
                .name(name)
                .category(category)
                .description(description)
                .aliases(aliases)
                .build();
        return skillRepository.save(skill);
    }

    private TargetRole createRole(String name, String description, String category) {
        TargetRole role = TargetRole.builder()
                .name(name)
                .description(description)
                .category(category)
                .build();
        return roleRepository.save(role);
    }

    private void createRoleSkill(TargetRole role, Skill skill, int importance, int minLevel) {
        RoleSkill rs = RoleSkill.builder()
                .role(role)
                .skill(skill)
                .importance(importance)
                .minimumLevel(minLevel)
                .build();
        roleSkillRepository.save(rs);
    }

    private User createUser(String username, String email, String rawPassword, String fullName, RoleEnum role) {
        User user = User.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .fullName(fullName)
                .role(role)
                .build();
        return userRepository.save(user);
    }

    private void createQuestion(Assessment assessment, Skill skill, QuestionType type, String text, String code, String optionsJson, String correct, String explanation) {
        AssessmentQuestion q = AssessmentQuestion.builder()
                .assessment(assessment)
                .skill(skill)
                .type(type)
                .questionText(text)
                .codeSnippet(code)
                .optionsJson(optionsJson)
                .correctAnswer(correct)
                .explanation(explanation)
                .build();
        questionRepository.save(q);
    }

    private Course createCourse(String title, String provider, String url, String description, String difficulty, int durationHours, int qualityScore) {
        Course course = Course.builder()
                .title(title)
                .provider(provider)
                .url(url)
                .description(description)
                .difficulty(difficulty)
                .durationHours(durationHours)
                .qualityScore(qualityScore)
                .build();
        return courseRepository.save(course);
    }

    private void createCourseSkill(Course course, Skill skill, int coverageLevel) {
        CourseSkillMap map = CourseSkillMap.builder()
                .course(course)
                .skill(skill)
                .coverageLevel(coverageLevel)
                .build();
        courseSkillMapRepository.save(map);
    }

    private Company createCompany(String name, String industry, String description, String website, String location, boolean verified) {
        Company company = Company.builder()
                .name(name)
                .industry(industry)
                .description(description)
                .website(website)
                .location(location)
                .verified(verified)
                .build();
        return companyRepository.save(company);
    }

    private Opportunity createOpportunity(Company company, String title, com.skillintel.platform.domain.enums.OpportunityType type, String description, String location, String duration, String stipend, double minCgpa, String preferredDegree, String deadline) {
        Opportunity opp = Opportunity.builder()
                .company(company)
                .title(title)
                .type(type)
                .description(description)
                .location(location)
                .duration(duration)
                .stipend(stipend)
                .minCgpa(minCgpa)
                .preferredDegree(preferredDegree)
                .deadline(deadline)
                .status("OPEN")
                .build();
        return opportunityRepository.save(opp);
    }

    private void createOpportunitySkill(Opportunity opportunity, Skill skill, int importance, int minimumScore) {
        OpportunitySkill oppSkill = OpportunitySkill.builder()
                .opportunity(opportunity)
                .skill(skill)
                .importance(importance)
                .minimumScore(minimumScore)
                .build();
        opportunitySkillRepository.save(oppSkill);
    }

    private Academician createAcademician(User user, String institution, String dept, String exp, String research, String pub, String proj, int yearsExp) {
        Academician academician = Academician.builder()
                .user(user)
                .institutionName(institution)
                .department(dept)
                .expertise(exp)
                .researchAreas(research)
                .publications(pub)
                .projects(proj)
                .yearsExperience(yearsExp)
                .build();
        return academicianRepository.save(academician);
    }

    private Mentor createMentor(User user, Company company, String title, String expertise, String availability, int yearsExp) {
        Mentor mentor = Mentor.builder()
                .user(user)
                .company(company)
                .title(title)
                .expertise(expertise)
                .availability(availability)
                .yearsExperience(yearsExp)
                .build();
        return mentorRepository.save(mentor);
    }

    private Collaboration createCollaboration(Company company, String title, String description, com.skillintel.platform.domain.enums.CollaborationType type, String reqs, String startDate, String endDate) {
        Collaboration col = Collaboration.builder()
                .company(company)
                .title(title)
                .description(description)
                .type(type)
                .requirements(reqs)
                .startDate(startDate)
                .endDate(endDate)
                .status("OPEN")
                .build();
        return collaborationRepository.save(col);
    }

    private void createCollaborationSkill(Collaboration col, Skill skill, int reqLevel) {
        CollaborationSkill cs = CollaborationSkill.builder()
                .collaboration(col)
                .skill(skill)
                .requiredLevel(reqLevel)
                .build();
        collaborationSkillRepository.save(cs);
    }

    private Mentorship createMentorship(Mentor mentor, StudentProfile student, Skill skill, String status) {
        Mentorship mentorship = Mentorship.builder()
                .mentor(mentor)
                .studentProfile(student)
                .skill(skill)
                .status(status)
                .build();
        return mentorshipRepository.save(mentorship);
    }

    private Internship createInternship(StudentProfile student, Company company, Opportunity opp, Mentor mentor, String startDate, String endDate, com.skillintel.platform.domain.enums.InternshipStatus status) {
        Internship internship = Internship.builder()
                .studentProfile(student)
                .company(company)
                .opportunity(opp)
                .mentor(mentor)
                .startDate(startDate)
                .endDate(endDate)
                .status(status)
                .build();
        return internshipRepository.save(internship);
    }
}
