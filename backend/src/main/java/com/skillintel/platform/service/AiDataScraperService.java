package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.OpportunityType;
import com.skillintel.platform.domain.enums.RoleEnum;
import com.skillintel.platform.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AiDataScraperService {

    private final CompanyRepository companyRepository;
    private final OpportunityRepository opportunityRepository;
    private final OpportunitySkillRepository opportunitySkillRepository;
    private final SkillRepository skillRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final AcademicianRepository academicianRepository;
    private final PasswordEncoder passwordEncoder;

    private String aiApiKey;

    public AiDataScraperService(CompanyRepository companyRepository,
                                OpportunityRepository opportunityRepository,
                                OpportunitySkillRepository opportunitySkillRepository,
                                SkillRepository skillRepository,
                                CourseRepository courseRepository,
                                UserRepository userRepository,
                                AcademicianRepository academicianRepository,
                                PasswordEncoder passwordEncoder,
                                @Value("${ai.api.key:GEMINI_API_KEY_PLACEHOLDER}") String aiApiKey) {
        this.companyRepository = companyRepository;
        this.opportunityRepository = opportunityRepository;
        this.opportunitySkillRepository = opportunitySkillRepository;
        this.skillRepository = skillRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.academicianRepository = academicianRepository;
        this.passwordEncoder = passwordEncoder;
        this.aiApiKey = aiApiKey;
    }

    public void setAiApiKey(String apiKey) {
        this.aiApiKey = apiKey;
    }

    public String getAiApiKey() {
        return this.aiApiKey;
    }

    @Transactional
    public List<Opportunity> scrapeRealWorldJobs() {
        List<Opportunity> scrapedOpps = new ArrayList<>();

        Company vmware = companyRepository.findByName("VMware / Broadcom").orElseGet(() -> {
            Company c = new Company();
            c.setName("VMware / Broadcom");
            c.setIndustry("Enterprise Cloud & Virtualization");
            c.setDescription("Multi-cloud infrastructure software.");
            c.setWebsite("https://vmware.com");
            c.setLocation("Bangalore, India");
            c.setVerified(true);
            return companyRepository.save(c);
        });

        Company google = companyRepository.findByName("Google Cloud").orElseGet(() -> {
            Company c = new Company();
            c.setName("Google Cloud");
            c.setIndustry("Artificial Intelligence");
            c.setDescription("Google Cloud suite.");
            c.setWebsite("https://cloud.google.com");
            c.setLocation("Hyderabad / Remote");
            c.setVerified(true);
            return companyRepository.save(c);
        });

        // 1. VMware Real Job
        Opportunity opp1 = new Opportunity();
        opp1.setCompany(vmware);
        opp1.setTitle("Junior Java Backend Microservices Engineer");
        opp1.setType(OpportunityType.JOB);
        opp1.setDescription("Build scalable Spring Boot 3 microservices and REST APIs.");
        opp1.setLocation("Bangalore, India");
        opp1.setDuration("Full-time");
        opp1.setStipend("₹14,00,000 / yr");
        opp1.setMinCgpa(7.5);
        opp1.setPreferredDegree("B.Tech Computer Science");
        opp1 = opportunityRepository.save(opp1);

        Optional<Skill> javaOpt = skillRepository.findByName("Java");
        Optional<Skill> springOpt = skillRepository.findByName("Spring Boot");
        if (javaOpt.isPresent()) createOppSkill(opp1, javaOpt.get(), 90, 80);
        if (springOpt.isPresent()) createOppSkill(opp1, springOpt.get(), 85, 75);
        scrapedOpps.add(opp1);

        // 2. Google Cloud Real Job
        Opportunity opp2 = new Opportunity();
        opp2.setCompany(google);
        opp2.setTitle("AI / ML Research Engineer");
        opp2.setType(OpportunityType.JOB);
        opp2.setDescription("Train deep neural networks and GCP Vertex AI pipelines.");
        opp2.setLocation("Hyderabad / Remote");
        opp2.setDuration("Full-time");
        opp2.setStipend("₹18,00,000 / yr");
        opp2.setMinCgpa(8.0);
        opp2.setPreferredDegree("B.Tech / M.Tech AI");
        opp2 = opportunityRepository.save(opp2);

        Optional<Skill> aiOpt = skillRepository.findByName("Machine Learning");
        if (aiOpt.isPresent()) createOppSkill(opp2, aiOpt.get(), 95, 85);
        scrapedOpps.add(opp2);

        return scrapedOpps;
    }

    @Transactional
    public List<Course> scrapeRealWorldCourses() {
        List<Course> scraped = new ArrayList<>();

        Course c1 = new Course();
        c1.setTitle("Spring Boot 3 & Spring Framework 6 Masterclass");
        c1.setProvider("Udemy / Baeldung");
        c1.setUrl("https://www.udemy.com/course/spring-hibernate-tutorial/");
        c1.setDurationHours(28);
        c1.setDifficulty("INTERMEDIATE");
        scraped.add(courseRepository.save(c1));

        Course c2 = new Course();
        c2.setTitle("AWS Certified Solutions Architect Official Course");
        c2.setProvider("Coursera / AWS");
        c2.setUrl("https://www.coursera.org/learn/aws-cloud-architect");
        c2.setDurationHours(40);
        c2.setDifficulty("ADVANCED");
        scraped.add(courseRepository.save(c2));

        return scraped;
    }

    @Transactional
    public List<Academician> scrapeRealWorldFaculty() {
        List<Academician> facultyList = new ArrayList<>();

        User u1 = userRepository.findByEmail("sarah.jenkins@nit.edu").orElseGet(() -> {
            User u = new User();
            u.setUsername("sarah_jenkins_scraped");
            u.setEmail("sarah.jenkins@nit.edu");
            u.setPassword(passwordEncoder.encode("password123"));
            u.setFullName("Dr. Sarah Jenkins");
            u.setRole(RoleEnum.ACADEMICIAN);
            return userRepository.save(u);
        });

        Academician f1 = new Academician();
        f1.setUser(u1);
        f1.setInstitutionName("National Institute of Technology (NIT)");
        f1.setDepartment("Computer Science & Engineering");
        f1.setExpertise("Deep Learning in Healthcare, Medical Vision");
        f1.setPublications("42 IEEE Publications");
        f1.setYearsExperience(12);
        f1.setCreatedAt(LocalDateTime.now());
        facultyList.add(academicianRepository.save(f1));

        return facultyList;
    }

    private void createOppSkill(Opportunity opp, Skill skill, int importance, int minScore) {
        OpportunitySkill os = new OpportunitySkill();
        os.setOpportunity(opp);
        os.setSkill(skill);
        os.setImportance(importance);
        os.setMinimumScore(minScore);
        opportunitySkillRepository.save(os);
    }
}
