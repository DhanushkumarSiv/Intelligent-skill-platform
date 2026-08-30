package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.LearningStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_paths")
public class LearningPath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_profile_id", nullable = false)
    private StudentProfile studentProfile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "target_role_id")
    private TargetRole targetRole;

    private String title;
    private Integer totalSteps;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LearningStatus status;

    private Integer initialScore;
    private Integer currentScore;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public LearningPath() {}

    public LearningPath(Long id, StudentProfile studentProfile, Skill skill, TargetRole targetRole, String title, Integer totalSteps, LearningStatus status, Integer initialScore, Integer currentScore, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.studentProfile = studentProfile;
        this.skill = skill;
        this.targetRole = targetRole;
        this.title = title;
        this.totalSteps = totalSteps;
        this.status = status;
        this.initialScore = initialScore;
        this.currentScore = currentScore;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentProfile studentProfile;
        private Skill skill;
        private TargetRole targetRole;
        private String title;
        private Integer totalSteps;
        private LearningStatus status;
        private Integer initialScore;
        private Integer currentScore;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder targetRole(TargetRole targetRole) { this.targetRole = targetRole; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder totalSteps(Integer totalSteps) { this.totalSteps = totalSteps; return this; }
        public Builder status(LearningStatus status) { this.status = status; return this; }
        public Builder initialScore(Integer initialScore) { this.initialScore = initialScore; return this; }
        public Builder currentScore(Integer currentScore) { this.currentScore = currentScore; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public LearningPath build() {
            return new LearningPath(id, studentProfile, skill, targetRole, title, totalSteps, status, initialScore, currentScore, createdAt, updatedAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public TargetRole getTargetRole() { return targetRole; }
    public void setTargetRole(TargetRole targetRole) { this.targetRole = targetRole; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getTotalSteps() { return totalSteps; }
    public void setTotalSteps(Integer totalSteps) { this.totalSteps = totalSteps; }
    public LearningStatus getStatus() { return status; }
    public void setStatus(LearningStatus status) { this.status = status; }
    public Integer getInitialScore() { return initialScore; }
    public void setInitialScore(Integer initialScore) { this.initialScore = initialScore; }
    public Integer getCurrentScore() { return currentScore; }
    public void setCurrentScore(Integer currentScore) { this.currentScore = currentScore; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
