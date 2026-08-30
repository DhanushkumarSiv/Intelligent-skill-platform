package com.skillintel.platform.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "student_assessment_answers")
public class StudentAssessmentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_assessment_id", nullable = false)
    private StudentAssessment studentAssessment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    private AssessmentQuestion question;

    private String selectedAnswer;
    private Boolean isCorrect;
    private Integer scoreObtained;

    public StudentAssessmentAnswer() {}

    public StudentAssessmentAnswer(Long id, StudentAssessment studentAssessment, AssessmentQuestion question, String selectedAnswer, Boolean isCorrect, Integer scoreObtained) {
        this.id = id;
        this.studentAssessment = studentAssessment;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
        this.isCorrect = isCorrect;
        this.scoreObtained = scoreObtained;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private StudentAssessment studentAssessment;
        private AssessmentQuestion question;
        private String selectedAnswer;
        private Boolean isCorrect;
        private Integer scoreObtained;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder studentAssessment(StudentAssessment studentAssessment) { this.studentAssessment = studentAssessment; return this; }
        public Builder question(AssessmentQuestion question) { this.question = question; return this; }
        public Builder selectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; return this; }
        public Builder isCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; return this; }
        public Builder scoreObtained(Integer scoreObtained) { this.scoreObtained = scoreObtained; return this; }

        public StudentAssessmentAnswer build() {
            return new StudentAssessmentAnswer(id, studentAssessment, question, selectedAnswer, isCorrect, scoreObtained);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public StudentAssessment getStudentAssessment() { return studentAssessment; }
    public void setStudentAssessment(StudentAssessment studentAssessment) { this.studentAssessment = studentAssessment; }
    public AssessmentQuestion getQuestion() { return question; }
    public void setQuestion(AssessmentQuestion question) { this.question = question; }
    public String getSelectedAnswer() { return selectedAnswer; }
    public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
    public Integer getScoreObtained() { return scoreObtained; }
    public void setScoreObtained(Integer scoreObtained) { this.scoreObtained = scoreObtained; }
}
