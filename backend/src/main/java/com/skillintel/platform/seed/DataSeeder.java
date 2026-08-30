package com.skillintel.platform.seed;

import com.skillintel.platform.domain.*;
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
                      CourseSkillMapRepository courseSkillMapRepository) {
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
}
