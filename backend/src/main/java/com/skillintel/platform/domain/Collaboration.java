package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.CollaborationType;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "collaborations")
public class Collaboration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CollaborationType type;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    private String startDate;
    private String endDate;
    private String status; // OPEN, ACTIVE, COMPLETED

    private LocalDateTime createdAt;

    public Collaboration() {}

    public Collaboration(Long id, Company company, String title, String description, CollaborationType type, String requirements, String startDate, String endDate, String status, LocalDateTime createdAt) {
        this.id = id;
        this.company = company;
        this.title = title;
        this.description = description;
        this.type = type;
        this.requirements = requirements;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Company company;
        private String title;
        private String description;
        private CollaborationType type;
        private String requirements;
        private String startDate;
        private String endDate;
        private String status;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder company(Company company) { this.company = company; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder type(CollaborationType type) { this.type = type; return this; }
        public Builder requirements(String requirements) { this.requirements = requirements; return this; }
        public Builder startDate(String startDate) { this.startDate = startDate; return this; }
        public Builder endDate(String endDate) { this.endDate = endDate; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Collaboration build() {
            return new Collaboration(id, company, title, description, type, requirements, startDate, endDate, status, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = "OPEN";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public CollaborationType getType() { return type; }
    public void setType(CollaborationType type) { this.type = type; }
    public String getRequirements() { return requirements; }
    public void setRequirements(String requirements) { this.requirements = requirements; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
