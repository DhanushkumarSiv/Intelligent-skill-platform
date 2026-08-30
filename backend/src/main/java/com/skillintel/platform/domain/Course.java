package com.skillintel.platform.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String provider;
    private String url;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String difficulty; // Beginner, Intermediate, Advanced
    private Integer durationHours;
    private Integer qualityScore; // 1 - 100

    public Course() {}

    public Course(Long id, String title, String provider, String url, String description, String difficulty, Integer durationHours, Integer qualityScore) {
        this.id = id;
        this.title = title;
        this.provider = provider;
        this.url = url;
        this.description = description;
        this.difficulty = difficulty;
        this.durationHours = durationHours;
        this.qualityScore = qualityScore;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String title;
        private String provider;
        private String url;
        private String description;
        private String difficulty;
        private Integer durationHours;
        private Integer qualityScore;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder provider(String provider) { this.provider = provider; return this; }
        public Builder url(String url) { this.url = url; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder difficulty(String difficulty) { this.difficulty = difficulty; return this; }
        public Builder durationHours(Integer durationHours) { this.durationHours = durationHours; return this; }
        public Builder qualityScore(Integer qualityScore) { this.qualityScore = qualityScore; return this; }

        public Course build() {
            return new Course(id, title, provider, url, description, difficulty, durationHours, qualityScore);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public Integer getDurationHours() { return durationHours; }
    public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }
    public Integer getQualityScore() { return qualityScore; }
    public void setQualityScore(Integer qualityScore) { this.qualityScore = qualityScore; }
}
