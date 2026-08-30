package com.skillintel.platform.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "academicians")
public class Academician {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String institutionName;
    private String department;

    @Column(columnDefinition = "TEXT")
    private String expertise;

    @Column(columnDefinition = "TEXT")
    private String researchAreas;

    @Column(columnDefinition = "TEXT")
    private String publications;

    @Column(columnDefinition = "TEXT")
    private String projects;

    private Integer yearsExperience;
    private LocalDateTime createdAt;

    public Academician() {}

    public Academician(Long id, User user, String institutionName, String department, String expertise, String researchAreas, String publications, String projects, Integer yearsExperience, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.institutionName = institutionName;
        this.department = department;
        this.expertise = expertise;
        this.researchAreas = researchAreas;
        this.publications = publications;
        this.projects = projects;
        this.yearsExperience = yearsExperience;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private String institutionName;
        private String department;
        private String expertise;
        private String researchAreas;
        private String publications;
        private String projects;
        private Integer yearsExperience;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder institutionName(String institutionName) { this.institutionName = institutionName; return this; }
        public Builder department(String department) { this.department = department; return this; }
        public Builder expertise(String expertise) { this.expertise = expertise; return this; }
        public Builder researchAreas(String researchAreas) { this.researchAreas = researchAreas; return this; }
        public Builder publications(String publications) { this.publications = publications; return this; }
        public Builder projects(String projects) { this.projects = projects; return this; }
        public Builder yearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Academician build() {
            return new Academician(id, user, institutionName, department, expertise, researchAreas, publications, projects, yearsExperience, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getInstitutionName() { return institutionName; }
    public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getExpertise() { return expertise; }
    public void setExpertise(String expertise) { this.expertise = expertise; }
    public String getResearchAreas() { return researchAreas; }
    public void setResearchAreas(String researchAreas) { this.researchAreas = researchAreas; }
    public String getPublications() { return publications; }
    public void setPublications(String publications) { this.publications = publications; }
    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }
    public Integer getYearsExperience() { return yearsExperience; }
    public void setYearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
