package com.skillintel.platform.domain;

import com.skillintel.platform.domain.enums.QuestionType;
import jakarta.persistence.*;

@Entity
@Table(name = "assessment_questions")
public class AssessmentQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Column(columnDefinition = "TEXT")
    private String codeSnippet;

    @Column(columnDefinition = "TEXT")
    private String optionsJson;

    private String correctAnswer;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    public AssessmentQuestion() {}

    public AssessmentQuestion(Long id, Assessment assessment, Skill skill, String questionText, QuestionType type, String codeSnippet, String optionsJson, String correctAnswer, String explanation) {
        this.id = id;
        this.assessment = assessment;
        this.skill = skill;
        this.questionText = questionText;
        this.type = type;
        this.codeSnippet = codeSnippet;
        this.optionsJson = optionsJson;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Assessment assessment;
        private Skill skill;
        private String questionText;
        private QuestionType type;
        private String codeSnippet;
        private String optionsJson;
        private String correctAnswer;
        private String explanation;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder assessment(Assessment assessment) { this.assessment = assessment; return this; }
        public Builder skill(Skill skill) { this.skill = skill; return this; }
        public Builder questionText(String questionText) { this.questionText = questionText; return this; }
        public Builder type(QuestionType type) { this.type = type; return this; }
        public Builder codeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; return this; }
        public Builder optionsJson(String optionsJson) { this.optionsJson = optionsJson; return this; }
        public Builder correctAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; return this; }
        public Builder explanation(String explanation) { this.explanation = explanation; return this; }

        public AssessmentQuestion build() {
            return new AssessmentQuestion(id, assessment, skill, questionText, type, codeSnippet, optionsJson, correctAnswer, explanation);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Assessment getAssessment() { return assessment; }
    public void setAssessment(Assessment assessment) { this.assessment = assessment; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public QuestionType getType() { return type; }
    public void setType(QuestionType type) { this.type = type; }
    public String getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }
    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
