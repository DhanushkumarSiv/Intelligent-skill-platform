package com.skillintel.platform.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String industry;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String website;
    private String location;
    private Boolean verified;
    private LocalDateTime createdAt;

    public Company() {}

    public Company(Long id, String name, String industry, String description, String website, String location, Boolean verified, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.description = description;
        this.website = website;
        this.location = location;
        this.verified = verified;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String industry;
        private String description;
        private String website;
        private String location;
        private Boolean verified;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder industry(String industry) { this.industry = industry; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder website(String website) { this.website = website; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder verified(Boolean verified) { this.verified = verified; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Company build() {
            return new Company(id, name, industry, description, website, location, verified, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (verified == null) verified = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
