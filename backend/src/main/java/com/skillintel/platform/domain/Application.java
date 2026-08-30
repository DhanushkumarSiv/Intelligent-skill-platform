package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.ApplicationStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "opportunity_id", nullable = false)
    private Opportunity opportunity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(columnDefinition = "TEXT")
    private String coverNote;

    private LocalDateTime appliedAt;
    private LocalDateTime statusUpdatedAt;

    public Application() {}

    public Application(Long id, Opportunity opportunity, StudentProfile studentProfile, ApplicationStatus status, String coverNote, LocalDateTime appliedAt, LocalDateTime statusUpdatedAt) {
        this.id = id;
        this.opportunity = opportunity;
        this.studentProfile = studentProfile;
        this.status = status;
        this.coverNote = coverNote;
        this.appliedAt = appliedAt;
        this.statusUpdatedAt = statusUpdatedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Opportunity opportunity;
        private StudentProfile studentProfile;
        private ApplicationStatus status;
        private String coverNote;
        private LocalDateTime appliedAt;
        private LocalDateTime statusUpdatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder opportunity(Opportunity opportunity) { this.opportunity = opportunity; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder status(ApplicationStatus status) { this.status = status; return this; }
        public Builder coverNote(String coverNote) { this.coverNote = coverNote; return this; }
        public Builder appliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; return this; }
        public Builder statusUpdatedAt(LocalDateTime statusUpdatedAt) { this.statusUpdatedAt = statusUpdatedAt; return this; }

        public Application build() {
            return new Application(id, opportunity, studentProfile, status, coverNote, appliedAt, statusUpdatedAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
        statusUpdatedAt = LocalDateTime.now();
        if (status == null) status = ApplicationStatus.APPLIED;
    }

    @PreUpdate
    protected void onUpdate() {
        statusUpdatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Opportunity getOpportunity() { return opportunity; }
    public void setOpportunity(Opportunity opportunity) { this.opportunity = opportunity; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public String getCoverNote() { return coverNote; }
    public void setCoverNote(String coverNote) { this.coverNote = coverNote; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    public LocalDateTime getStatusUpdatedAt() { return statusUpdatedAt; }
    public void setStatusUpdatedAt(LocalDateTime statusUpdatedAt) { this.statusUpdatedAt = statusUpdatedAt; }
}
