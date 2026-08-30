package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.VerificationStatus;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificate_evidence")
public class CertificateEvidence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    private String issuer;
    private String courseName;
    private String studentName;
    private String credentialId;
    private LocalDate issueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus verificationStatus;

    @Column(columnDefinition = "TEXT")
    private String extractedText;

    private String fileUrl;
    private LocalDateTime createdAt;

    public CertificateEvidence() {}

    public CertificateEvidence(Long id, StudentProfile studentProfile, String issuer, String courseName, String studentName, String credentialId, LocalDate issueDate, VerificationStatus verificationStatus, String extractedText, String fileUrl, LocalDateTime createdAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.issuer = issuer;
        this.courseName = courseName;
        this.studentName = studentName;
        this.credentialId = credentialId;
        this.issueDate = issueDate;
        this.verificationStatus = verificationStatus;
        this.extractedText = extractedText;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private String issuer;
        private String courseName;
        private String studentName;
        private String credentialId;
        private LocalDate issueDate;
        private VerificationStatus verificationStatus;
        private String extractedText;
        private String fileUrl;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder issuer(String issuer) { this.issuer = issuer; return this; }
        public Builder courseName(String courseName) { this.courseName = courseName; return this; }
        public Builder studentName(String studentName) { this.studentName = studentName; return this; }
        public Builder credentialId(String credentialId) { this.credentialId = credentialId; return this; }
        public Builder issueDate(LocalDate issueDate) { this.issueDate = issueDate; return this; }
        public Builder verificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder extractedText(String extractedText) { this.extractedText = extractedText; return this; }
        public Builder fileUrl(String fileUrl) { this.fileUrl = fileUrl; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public CertificateEvidence build() {
            return new CertificateEvidence(id, studentProfile, issuer, courseName, studentName, credentialId, issueDate, verificationStatus, extractedText, fileUrl, createdAt);
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
    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getCredentialId() { return credentialId; }
    public void setCredentialId(String credentialId) { this.credentialId = credentialId; }
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }
    public String getExtractedText() { return extractedText; }
    public void setExtractedText(String extractedText) { this.extractedText = extractedText; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
