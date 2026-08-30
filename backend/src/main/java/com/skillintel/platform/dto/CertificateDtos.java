package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.VerificationStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class CertificateDtos {

    public static class CertificateDto {
        private Long id;
        private String issuer;
        private String courseName;
        private String studentName;
        private String credentialId;
        private LocalDate issueDate;
        private VerificationStatus verificationStatus;
        private String extractedText;
        private List<String> matchedSkills;
        private LocalDateTime createdAt;

        public CertificateDto() {}
        public CertificateDto(Long id, String issuer, String courseName, String studentName, String credentialId, LocalDate issueDate, VerificationStatus verificationStatus, String extractedText, List<String> matchedSkills, LocalDateTime createdAt) {
            this.id = id;
            this.issuer = issuer;
            this.courseName = courseName;
            this.studentName = studentName;
            this.credentialId = credentialId;
            this.issueDate = issueDate;
            this.verificationStatus = verificationStatus;
            this.extractedText = extractedText;
            this.matchedSkills = matchedSkills;
            this.createdAt = createdAt;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private String issuer;
            private String courseName;
            private String studentName;
            private String credentialId;
            private LocalDate issueDate;
            private VerificationStatus verificationStatus;
            private String extractedText;
            private List<String> matchedSkills;
            private LocalDateTime createdAt;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder issuer(String issuer) { this.issuer = issuer; return this; }
            public Builder courseName(String courseName) { this.courseName = courseName; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder credentialId(String credentialId) { this.credentialId = credentialId; return this; }
            public Builder issueDate(LocalDate issueDate) { this.issueDate = issueDate; return this; }
            public Builder verificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; return this; }
            public Builder extractedText(String extractedText) { this.extractedText = extractedText; return this; }
            public Builder matchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; return this; }
            public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

            public CertificateDto build() {
                return new CertificateDto(id, issuer, courseName, studentName, credentialId, issueDate, verificationStatus, extractedText, matchedSkills, createdAt);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
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
        public List<String> getMatchedSkills() { return matchedSkills; }
        public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
