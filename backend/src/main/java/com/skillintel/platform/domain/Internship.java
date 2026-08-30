package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.InternshipStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "internships")
public class Internship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "opportunity_id")
    private Opportunity opportunity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    private String startDate;
    private String endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InternshipStatus status;

    private String completionStatus; // e.g. "Completed with Distinction"
    private LocalDateTime createdAt;

    public Internship() {}

    public Internship(Long id, StudentProfile studentProfile, Company company, Opportunity opportunity, Mentor mentor, String startDate, String endDate, InternshipStatus status, String completionStatus, LocalDateTime createdAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.company = company;
        this.opportunity = opportunity;
        this.mentor = mentor;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.completionStatus = completionStatus;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private Company company;
        private Opportunity opportunity;
        private Mentor mentor;
        private String startDate;
        private String endDate;
        private InternshipStatus status;
        private String completionStatus;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder company(Company company) { this.company = company; return this; }
        public Builder opportunity(Opportunity opportunity) { this.opportunity = opportunity; return this; }
        public Builder mentor(Mentor mentor) { this.mentor = mentor; return this; }
        public Builder startDate(String startDate) { this.startDate = startDate; return this; }
        public Builder endDate(String endDate) { this.endDate = endDate; return this; }
        public Builder status(InternshipStatus status) { this.status = status; return this; }
        public Builder completionStatus(String completionStatus) { this.completionStatus = completionStatus; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Internship build() {
            return new Internship(id, studentProfile, company, opportunity, mentor, startDate, endDate, status, completionStatus, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = InternshipStatus.ONGOING;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    public Opportunity getOpportunity() { return opportunity; }
    public void setOpportunity(Opportunity opportunity) { this.opportunity = opportunity; }
    public Mentor getMentor() { return mentor; }
    public void setMentor(Mentor mentor) { this.mentor = mentor; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
    public InternshipStatus getStatus() { return status; }
    public void setStatus(InternshipStatus status) { this.status = status; }
    public String getCompletionStatus() { return completionStatus; }
    public void setCompletionStatus(String completionStatus) { this.completionStatus = completionStatus; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
