package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.LearningStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_progress")
public class LearningProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learning_path_id", nullable = false)
    private LearningPath learningPath;

    private Integer stepNumber;
    private String moduleTitle;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LearningStatus status;

    private Integer progress; // 0 - 100%

    private LocalDateTime startedAt;
    private LocalDateTime completedAt;

    public LearningProgress() {}

    public LearningProgress(Long id, LearningPath learningPath, Integer stepNumber, String moduleTitle, Course course, LearningStatus status, Integer progress, LocalDateTime startedAt, LocalDateTime completedAt) {
        this.id = id;
        this.learningPath = learningPath;
        this.stepNumber = stepNumber;
        this.moduleTitle = moduleTitle;
        this.course = course;
        this.status = status;
        this.progress = progress;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private LearningPath learningPath;
        private Integer stepNumber;
        private String moduleTitle;
        private Course course;
        private LearningStatus status;
        private Integer progress;
        private LocalDateTime startedAt;
        private LocalDateTime completedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder learningPath(LearningPath learningPath) { this.learningPath = learningPath; return this; }
        public Builder stepNumber(Integer stepNumber) { this.stepNumber = stepNumber; return this; }
        public Builder moduleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; return this; }
        public Builder course(Course course) { this.course = course; return this; }
        public Builder status(LearningStatus status) { this.status = status; return this; }
        public Builder progress(Integer progress) { this.progress = progress; return this; }
        public Builder startedAt(LocalDateTime startedAt) { this.startedAt = startedAt; return this; }
        public Builder completedAt(LocalDateTime completedAt) { this.completedAt = completedAt; return this; }

        public LearningProgress build() {
            return new LearningProgress(id, learningPath, stepNumber, moduleTitle, course, status, progress, startedAt, completedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LearningPath getLearningPath() { return learningPath; }
    public void setLearningPath(LearningPath learningPath) { this.learningPath = learningPath; }
    public Integer getStepNumber() { return stepNumber; }
    public void setStepNumber(Integer stepNumber) { this.stepNumber = stepNumber; }
    public String getModuleTitle() { return moduleTitle; }
    public void setModuleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public LearningStatus getStatus() { return status; }
    public void setStatus(LearningStatus status) { this.status = status; }
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
