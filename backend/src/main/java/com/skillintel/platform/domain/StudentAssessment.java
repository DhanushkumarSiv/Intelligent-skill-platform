package com.skillintel.platform.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_assessments")
public class StudentAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    private Integer overallScore;
    private LocalDateTime completedAt;

    public StudentAssessment() {}

    public StudentAssessment(Long id, StudentProfile studentProfile, Assessment assessment, Integer overallScore, LocalDateTime completedAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.assessment = assessment;
        this.overallScore = overallScore;
        this.completedAt = completedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private Assessment assessment;
        private Integer overallScore;
        private LocalDateTime completedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder assessment(Assessment assessment) { this.assessment = assessment; return this; }
        public Builder overallScore(Integer overallScore) { this.overallScore = overallScore; return this; }
        public Builder completedAt(LocalDateTime completedAt) { this.completedAt = completedAt; return this; }

        public StudentAssessment build() {
            return new StudentAssessment(id, studentProfile, assessment, overallScore, completedAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public Assessment getAssessment() { return assessment; }
    public void setAssessment(Assessment assessment) { this.assessment = assessment; }
    public Integer getOverallScore() { return overallScore; }
    public void setOverallScore(Integer overallScore) { this.overallScore = overallScore; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
