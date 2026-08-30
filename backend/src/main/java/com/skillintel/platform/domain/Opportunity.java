package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.OpportunityType;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "opportunities")
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OpportunityType type;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private String duration;
    private String stipend;
    private Double minCgpa;
    private String preferredDegree;
    private String deadline;
    private String status; // OPEN, CLOSED

    private LocalDateTime createdAt;

    public Opportunity() {}

    public Opportunity(Long id, Company company, String title, OpportunityType type, String description, String location, String duration, String stipend, Double minCgpa, String preferredDegree, String deadline, String status, LocalDateTime createdAt) {
        this.id = id;
        this.company = company;
        this.title = title;
        this.type = type;
        this.description = description;
        this.location = location;
        this.duration = duration;
        this.stipend = stipend;
        this.minCgpa = minCgpa;
        this.preferredDegree = preferredDegree;
        this.deadline = deadline;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Company company;
        private String title;
        private OpportunityType type;
        private String description;
        private String location;
        private String duration;
        private String stipend;
        private Double minCgpa;
        private String preferredDegree;
        private String deadline;
        private String status;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder company(Company company) { this.company = company; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder type(OpportunityType type) { this.type = type; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder duration(String duration) { this.duration = duration; return this; }
        public Builder stipend(String stipend) { this.stipend = stipend; return this; }
        public Builder minCgpa(Double minCgpa) { this.minCgpa = minCgpa; return this; }
        public Builder preferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; return this; }
        public Builder deadline(String deadline) { this.deadline = deadline; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Opportunity build() {
            return new Opportunity(id, company, title, type, description, location, duration, stipend, minCgpa, preferredDegree, deadline, status, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = "OPEN";
        if (minCgpa == null) minCgpa = 6.0;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public OpportunityType getType() { return type; }
    public void setType(OpportunityType type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getStipend() { return stipend; }
    public void setStipend(String stipend) { this.stipend = stipend; }
    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
    public String getPreferredDegree() { return preferredDegree; }
    public void setPreferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; }
    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
