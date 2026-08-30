package com.skillintel.platform.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "role_skills")
public class RoleSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private TargetRole role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer importance;
    private Integer minimumLevel;

    public RoleSkill() {}

    public RoleSkill(Long id, TargetRole role, Skill skill, Integer importance, Integer minimumLevel) {
        this.id = id;
        this.role = role;
        this.skill = skill;
        this.importance = importance;
        this.minimumLevel = minimumLevel;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private TargetRole role;
        private Skill skill;
        private Integer importance;
        private Integer minimumLevel;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder role(TargetRole role) { this.role = role; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder importance(Integer importance) { this.importance = importance; return this; }
        public Builder minimumLevel(Integer minimumLevel) { this.minimumLevel = minimumLevel; return this; }

        public RoleSkill build() {
            return new RoleSkill(id, role, skill, importance, minimumLevel);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public TargetRole getRole() { return role; }
    public void setRole(TargetRole role) { this.role = role; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public Integer getImportance() { return importance; }
    public void setImportance(Integer importance) { this.importance = importance; }
    public Integer getMinimumLevel() { return minimumLevel; }
    public void setMinimumLevel(Integer minimumLevel) { this.minimumLevel = minimumLevel; }
}
