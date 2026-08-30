package com.skillintel.platform.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "course_skills")
public class CourseSkillMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer coverageLevel; // 1 - 100

    public CourseSkillMap() {}

    public CourseSkillMap(Long id, Course course, Skill skill, Integer coverageLevel) {
        this.id = id;
        this.course = course;
        this.skill = skill;
        this.coverageLevel = coverageLevel;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Course course;
        private Skill skill;
        private Integer coverageLevel;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder course(Course course) { this.course = course; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder coverageLevel(Integer coverageLevel) { this.coverageLevel = coverageLevel; return this; }

        public CourseSkillMap build() {
            return new CourseSkillMap(id, course, skill, coverageLevel);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public Integer getCoverageLevel() { return coverageLevel; }
    public void setCoverageLevel(Integer coverageLevel) { this.coverageLevel = coverageLevel; }
}
