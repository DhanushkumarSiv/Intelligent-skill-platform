package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.EvidenceSource;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "skill_evidence_records")
public class SkillEvidenceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_skill_id", nullable = false)
    private StudentSkill studentSkill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EvidenceSource source;

    private Integer score;
    private Double weight;

    @Column(columnDefinition = "TEXT")
    private String details;

    private LocalDateTime createdAt;

    public SkillEvidenceRecord() {}

    public SkillEvidenceRecord(Long id, StudentSkill studentSkill, EvidenceSource source, Integer score, Double weight, String details, LocalDateTime createdAt) {
        this.id = id;
        this.studentSkill = studentSkill;
        this.source = source;
        this.score = score;
        this.weight = weight;
        this.details = details;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentSkill studentSkill;
        private EvidenceSource source;
        private Integer score;
        private Double weight;
        private String details;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentSkill(StudentSkill studentSkill) { this.studentSkill = studentSkill; return this; }
        public Builder source(EvidenceSource source) { this.source = source; return this; }
        public Builder score(Integer score) { this.score = score; return this; }
        public Builder weight(Double weight) { this.weight = weight; return this; }
        public Builder details(String details) { this.details = details; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public SkillEvidenceRecord build() {
            return new SkillEvidenceRecord(id, studentSkill, source, score, weight, details, createdAt);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentSkill getStudentSkill() { return studentSkill; }
    public void setStudentSkill(StudentSkill studentSkill) { this.studentSkill = studentSkill; }
    public EvidenceSource getSource() { return source; }
    public void setSource(EvidenceSource source) { this.source = source; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
