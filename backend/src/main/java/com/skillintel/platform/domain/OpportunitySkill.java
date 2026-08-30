package com.skillintel.platform.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "opportunity_skills")
public class OpportunitySkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "opportunity_id", nullable = false)
    private Opportunity opportunity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer importance; // 1 - 100
    private Integer minimumScore; // 1 - 100

    public OpportunitySkill() {}

    public OpportunitySkill(Long id, Opportunity opportunity, Skill skill, Integer importance, Integer minimumScore) {
        this.id = id;
        this.opportunity = opportunity;
        this.skill = skill;
        this.importance = importance;
        this.minimumScore = minimumScore;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Opportunity opportunity;
        private Skill skill;
        private Integer importance;
        private Integer minimumScore;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder opportunity(Opportunity opportunity) { this.opportunity = opportunity; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder importance(Integer importance) { this.importance = importance; return this; }
        public Builder minimumScore(Integer minimumScore) { this.minimumScore = minimumScore; return this; }

        public OpportunitySkill build() {
            return new OpportunitySkill(id, opportunity, skill, importance, minimumScore);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Opportunity getOpportunity() { return opportunity; }
    public void setOpportunity(Opportunity opportunity) { this.opportunity = opportunity; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public Integer getImportance() { return importance; }
    public void setImportance(Integer importance) { this.importance = importance; }
    public Integer getMinimumScore() { return minimumScore; }
    public void setMinimumScore(Integer minimumScore) { this.minimumScore = minimumScore; }
}
