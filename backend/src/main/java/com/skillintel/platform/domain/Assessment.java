package com.skillintel.platform.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "target_role_id")
    private TargetRole targetRole;

    private Integer durationMinutes;
    private Integer passingScore;

    @OneToMany(mappedBy = "assessment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssessmentQuestion> questions = new ArrayList<>();

    public Assessment() {}

    public Assessment(Long id, String title, TargetRole targetRole, Integer durationMinutes, Integer passingScore, List<AssessmentQuestion> questions) {
        this.id = id;
        this.title = title;
        this.targetRole = targetRole;
        this.durationMinutes = durationMinutes;
        this.passingScore = passingScore;
        if (questions != null) this.questions = questions;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String title;
        private TargetRole targetRole;
        private Integer durationMinutes;
        private Integer passingScore;
        private List<AssessmentQuestion> questions = new ArrayList<>();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder targetRole(TargetRole targetRole) { this.targetRole = targetRole; return this; }
        public Builder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public Builder passingScore(Integer passingScore) { this.passingScore = passingScore; return this; }
        public Builder questions(List<AssessmentQuestion> questions) { this.questions = questions; return this; }

        public Assessment build() {
            return new Assessment(id, title, targetRole, durationMinutes, passingScore, questions);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public TargetRole getTargetRole() { return targetRole; }
    public void setTargetRole(TargetRole targetRole) { this.targetRole = targetRole; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    public Integer getPassingScore() { return passingScore; }
    public void setPassingScore(Integer passingScore) { this.passingScore = passingScore; }
    public List<AssessmentQuestion> getQuestions() { return questions; }
    public void setQuestions(List<AssessmentQuestion> questions) { this.questions = questions; }
}
