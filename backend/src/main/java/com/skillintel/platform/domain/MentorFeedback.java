package com.skillintel.platform.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentor_feedback")
public class MentorFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mentor_id", nullable = false)
    private Mentor mentor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer score; // 1 - 100

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(columnDefinition = "TEXT")
    private String technicalEvaluation;

    @Column(columnDefinition = "TEXT")
    private String softSkillEvaluation;

    private LocalDateTime createdAt;

    public MentorFeedback() {}

    public MentorFeedback(Long id, StudentProfile studentProfile, Mentor mentor, Skill skill, Integer score, String comments, String technicalEvaluation, String softSkillEvaluation, LocalDateTime createdAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.mentor = mentor;
        this.skill = skill;
        this.score = score;
        this.comments = comments;
        this.technicalEvaluation = technicalEvaluation;
        this.softSkillEvaluation = softSkillEvaluation;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private Mentor mentor;
        private Skill skill;
        private Integer score;
        private String comments;
        private String technicalEvaluation;
        private String softSkillEvaluation;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder mentor(Mentor mentor) { this.mentor = mentor; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder score(Integer score) { this.score = score; return this; }
        public Builder comments(String comments) { this.comments = comments; return this; }
        public Builder technicalEvaluation(String technicalEvaluation) { this.technicalEvaluation = technicalEvaluation; return this; }
        public Builder softSkillEvaluation(String softSkillEvaluation) { this.softSkillEvaluation = softSkillEvaluation; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public MentorFeedback build() {
            return new MentorFeedback(id, studentProfile, mentor, skill, score, comments, technicalEvaluation, softSkillEvaluation, createdAt);
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
    public Mentor getMentor() { return mentor; }
    public void setMentor(Mentor mentor) { this.mentor = mentor; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public String getTechnicalEvaluation() { return technicalEvaluation; }
    public void setTechnicalEvaluation(String technicalEvaluation) { this.technicalEvaluation = technicalEvaluation; }
    public String getSoftSkillEvaluation() { return softSkillEvaluation; }
    public void setSoftSkillEvaluation(String softSkillEvaluation) { this.softSkillEvaluation = softSkillEvaluation; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
