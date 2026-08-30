package com.skillintel.platform.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "collaboration_skills")
public class CollaborationSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "collaboration_id", nullable = false)
    private Collaboration collaboration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer requiredLevel;

    public CollaborationSkill() {}

    public CollaborationSkill(Long id, Collaboration collaboration, Skill skill, Integer requiredLevel) {
        this.id = id;
        this.collaboration = collaboration;
        this.skill = skill;
        this.requiredLevel = requiredLevel;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Collaboration collaboration;
        private Skill skill;
        private Integer requiredLevel;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder collaboration(Collaboration collaboration) { this.collaboration = collaboration; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder requiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; return this; }

        public CollaborationSkill build() {
            return new CollaborationSkill(id, collaboration, skill, requiredLevel);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Collaboration getCollaboration() { return collaboration; }
    public void setCollaboration(Collaboration collaboration) { this.collaboration = collaboration; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public Integer getRequiredLevel() { return requiredLevel; }
    public void setRequiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; }
}
