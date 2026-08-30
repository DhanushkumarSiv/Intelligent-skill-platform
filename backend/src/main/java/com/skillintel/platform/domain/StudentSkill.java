package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.VerificationStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_skills", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_profile_id", "skill_id"})
})
public class StudentSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer selfDeclaredScore;
    private Integer assessmentScore;
    private Integer mcqAssessmentWebsiteScore;
    private Integer evidenceScore;
    private Integer verifiedScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus verificationStatus;

    private LocalDateTime lastVerifiedAt;

    public StudentSkill() {}

    public StudentSkill(Long id, StudentProfile studentProfile, Skill skill, Integer selfDeclaredScore, Integer assessmentScore, Integer mcqAssessmentWebsiteScore, Integer evidenceScore, Integer verifiedScore, VerificationStatus verificationStatus, LocalDateTime lastVerifiedAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.skill = skill;
        this.selfDeclaredScore = selfDeclaredScore;
        this.assessmentScore = assessmentScore;
        this.mcqAssessmentWebsiteScore = mcqAssessmentWebsiteScore;
        this.evidenceScore = evidenceScore;
        this.verifiedScore = verifiedScore;
        this.verificationStatus = verificationStatus;
        this.lastVerifiedAt = lastVerifiedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private Skill skill;
        private Integer selfDeclaredScore;
        private Integer assessmentScore;
        private Integer mcqAssessmentWebsiteScore;
        private Integer evidenceScore;
        private Integer verifiedScore;
        private VerificationStatus verificationStatus;
        private LocalDateTime lastVerifiedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder selfDeclaredScore(Integer selfDeclaredScore) { this.selfDeclaredScore = selfDeclaredScore; return this; }
        public Builder assessmentScore(Integer assessmentScore) { this.assessmentScore = assessmentScore; return this; }
        public Builder mcqAssessmentWebsiteScore(Integer mcqAssessmentWebsiteScore) { this.mcqAssessmentWebsiteScore = mcqAssessmentWebsiteScore; return this; }
        public Builder evidenceScore(Integer evidenceScore) { this.evidenceScore = evidenceScore; return this; }
        public Builder verifiedScore(Integer verifiedScore) { this.verifiedScore = verifiedScore; return this; }
        public Builder verificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder lastVerifiedAt(LocalDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; return this; }

        public StudentSkill build() {
            return new StudentSkill(id, studentProfile, skill, selfDeclaredScore, assessmentScore, mcqAssessmentWebsiteScore, evidenceScore, verifiedScore, verificationStatus, lastVerifiedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public Integer getSelfDeclaredScore() { return selfDeclaredScore; }
    public void setSelfDeclaredScore(Integer selfDeclaredScore) { this.selfDeclaredScore = selfDeclaredScore; }
    public Integer getAssessmentScore() { return assessmentScore; }
    public void setAssessmentScore(Integer assessmentScore) { this.assessmentScore = assessmentScore; }
    public Integer getMcqAssessmentWebsiteScore() { return mcqAssessmentWebsiteScore; }
    public void setMcqAssessmentWebsiteScore(Integer mcqAssessmentWebsiteScore) { this.mcqAssessmentWebsiteScore = mcqAssessmentWebsiteScore; }
    public Integer getEvidenceScore() { return evidenceScore; }
    public void setEvidenceScore(Integer evidenceScore) { this.evidenceScore = evidenceScore; }
    public Integer getVerifiedScore() { return verifiedScore; }
    public void setVerifiedScore(Integer verifiedScore) { this.verifiedScore = verifiedScore; }
    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }
    public LocalDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(LocalDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }
}
