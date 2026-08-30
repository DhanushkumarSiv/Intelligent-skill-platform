package com.skillintel.platform.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_evidence")
public class ProjectEvidence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String repositoryUrl;

    @Column(columnDefinition = "TEXT")
    private String technologies;

    private String studentRole;
    private Integer durationMonths;
    private LocalDateTime createdAt;

    public ProjectEvidence() {}

    public ProjectEvidence(Long id, StudentProfile studentProfile, String name, String description, String repositoryUrl, String technologies, String studentRole, Integer durationMonths, LocalDateTime createdAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.name = name;
        this.description = description;
        this.repositoryUrl = repositoryUrl;
        this.technologies = technologies;
        this.studentRole = studentRole;
        this.durationMonths = durationMonths;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private String name;
        private String description;
        private String repositoryUrl;
        private String technologies;
        private String studentRole;
        private Integer durationMonths;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder repositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; return this; }
        public Builder technologies(String technologies) { this.technologies = technologies; return this; }
        public Builder studentRole(String studentRole) { this.studentRole = studentRole; return this; }
        public Builder durationMonths(Integer durationMonths) { this.durationMonths = durationMonths; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ProjectEvidence build() {
            return new ProjectEvidence(id, studentProfile, name, description, repositoryUrl, technologies, studentRole, durationMonths, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getRepositoryUrl() { return repositoryUrl; }
    public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }
    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    public String getStudentRole() { return studentRole; }
    public void setStudentRole(String studentRole) { this.studentRole = studentRole; }
    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
