package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.QuestionType;
import java.util.List;
import java.util.Map;

public class AssessmentDtos {

    public static class AssessmentDto {
        private Long id;
        private String title;
        private Long targetRoleId;
        private String targetRoleName;
        private Integer durationMinutes;
        private Integer totalQuestions;
        private List<QuestionDto> questions;

        public AssessmentDto() {}
        public AssessmentDto(Long id, String title, Long targetRoleId, String targetRoleName, Integer durationMinutes, Integer totalQuestions, List<QuestionDto> questions) {
            this.id = id;
            this.title = title;
            this.targetRoleId = targetRoleId;
            this.targetRoleName = targetRoleName;
            this.durationMinutes = durationMinutes;
            this.totalQuestions = totalQuestions;
            this.questions = questions;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private String title;
            private Long targetRoleId;
            private String targetRoleName;
            private Integer durationMinutes;
            private Integer totalQuestions;
            private List<QuestionDto> questions;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder targetRoleId(Long targetRoleId) { this.targetRoleId = targetRoleId; return this; }
            public Builder targetRoleName(String targetRoleName) { this.targetRoleName = targetRoleName; return this; }
            public Builder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
            public Builder totalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; return this; }
            public Builder questions(List<QuestionDto> questions) { this.questions = questions; return this; }

            public AssessmentDto build() {
                return new AssessmentDto(id, title, targetRoleId, targetRoleName, durationMinutes, totalQuestions, questions);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public Long getTargetRoleId() { return targetRoleId; }
        public void setTargetRoleId(Long targetRoleId) { this.targetRoleId = targetRoleId; }
        public String getTargetRoleName() { return targetRoleName; }
        public void setTargetRoleName(String targetRoleName) { this.targetRoleName = targetRoleName; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
        public Integer getTotalQuestions() { return totalQuestions; }
        public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
        public List<QuestionDto> getQuestions() { return questions; }
        public void setQuestions(List<QuestionDto> questions) { this.questions = questions; }
    }

    public static class QuestionDto {
        private Long id;
        private Long skillId;
        private String skillName;
        private String questionText;
        private QuestionType type;
        private String codeSnippet;
        private List<String> options;

        public QuestionDto() {}
        public QuestionDto(Long id, Long skillId, String skillName, String questionText, QuestionType type, String codeSnippet, List<String> options) {
            this.id = id;
            this.skillId = skillId;
            this.skillName = skillName;
            this.questionText = questionText;
            this.type = type;
            this.codeSnippet = codeSnippet;
            this.options = options;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private Long skillId;
            private String skillName;
            private String questionText;
            private QuestionType type;
            private String codeSnippet;
            private List<String> options;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder questionText(String questionText) { this.questionText = questionText; return this; }
            public Builder type(QuestionType type) { this.type = type; return this; }
            public Builder codeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; return this; }
            public Builder options(List<String> options) { this.options = options; return this; }

            public QuestionDto build() {
                return new QuestionDto(id, skillId, skillName, questionText, type, codeSnippet, options);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public QuestionType getType() { return type; }
        public void setType(QuestionType type) { this.type = type; }
        public String getCodeSnippet() { return codeSnippet; }
        public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }
        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }
    }

    public static class AssessmentSubmitDto {
        private Long assessmentId;
        private List<QuestionAnswerDto> answers;

        public AssessmentSubmitDto() {}
        public AssessmentSubmitDto(Long assessmentId, List<QuestionAnswerDto> answers) {
            this.assessmentId = assessmentId;
            this.answers = answers;
        }

        public Long getAssessmentId() { return assessmentId; }
        public void setAssessmentId(Long assessmentId) { this.assessmentId = assessmentId; }
        public List<QuestionAnswerDto> getAnswers() { return answers; }
        public void setAnswers(List<QuestionAnswerDto> answers) { this.answers = answers; }
    }

    public static class QuestionAnswerDto {
        private Long questionId;
        private String selectedAnswer;

        public QuestionAnswerDto() {}
        public QuestionAnswerDto(Long questionId, String selectedAnswer) {
            this.questionId = questionId;
            this.selectedAnswer = selectedAnswer;
        }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }
        public String getSelectedAnswer() { return selectedAnswer; }
        public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
    }

    public static class AssessmentResultDto {
        private Long studentAssessmentId;
        private Integer overallScore;
        private Map<String, Integer> skillWiseScores;
        private List<QuestionFeedbackDto> questionFeedback;

        public AssessmentResultDto() {}
        public AssessmentResultDto(Long studentAssessmentId, Integer overallScore, Map<String, Integer> skillWiseScores, List<QuestionFeedbackDto> questionFeedback) {
            this.studentAssessmentId = studentAssessmentId;
            this.overallScore = overallScore;
            this.skillWiseScores = skillWiseScores;
            this.questionFeedback = questionFeedback;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long studentAssessmentId;
            private Integer overallScore;
            private Map<String, Integer> skillWiseScores;
            private List<QuestionFeedbackDto> questionFeedback;

            public Builder studentAssessmentId(Long studentAssessmentId) { this.studentAssessmentId = studentAssessmentId; return this; }
            public Builder overallScore(Integer overallScore) { this.overallScore = overallScore; return this; }
            public Builder skillWiseScores(Map<String, Integer> skillWiseScores) { this.skillWiseScores = skillWiseScores; return this; }
            public Builder questionFeedback(List<QuestionFeedbackDto> questionFeedback) { this.questionFeedback = questionFeedback; return this; }

            public AssessmentResultDto build() {
                return new AssessmentResultDto(studentAssessmentId, overallScore, skillWiseScores, questionFeedback);
            }
        }

        public Long getStudentAssessmentId() { return studentAssessmentId; }
        public void setStudentAssessmentId(Long studentAssessmentId) { this.studentAssessmentId = studentAssessmentId; }
        public Integer getOverallScore() { return overallScore; }
        public void setOverallScore(Integer overallScore) { this.overallScore = overallScore; }
        public Map<String, Integer> getSkillWiseScores() { return skillWiseScores; }
        public void setSkillWiseScores(Map<String, Integer> skillWiseScores) { this.skillWiseScores = skillWiseScores; }
        public List<QuestionFeedbackDto> getQuestionFeedback() { return questionFeedback; }
        public void setQuestionFeedback(List<QuestionFeedbackDto> questionFeedback) { this.questionFeedback = questionFeedback; }
    }

    public static class QuestionFeedbackDto {
        private Long questionId;
        private String skillName;
        private String questionText;
        private String selectedAnswer;
        private String correctAnswer;
        private Boolean isCorrect;
        private String explanation;

        public QuestionFeedbackDto() {}
        public QuestionFeedbackDto(Long questionId, String skillName, String questionText, String selectedAnswer, String correctAnswer, Boolean isCorrect, String explanation) {
            this.questionId = questionId;
            this.skillName = skillName;
            this.questionText = questionText;
            this.selectedAnswer = selectedAnswer;
            this.correctAnswer = correctAnswer;
            this.isCorrect = isCorrect;
            this.explanation = explanation;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long questionId;
            private String skillName;
            private String questionText;
            private String selectedAnswer;
            private String correctAnswer;
            private Boolean isCorrect;
            private String explanation;

            public Builder questionId(Long questionId) { this.questionId = questionId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder questionText(String questionText) { this.questionText = questionText; return this; }
            public Builder selectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; return this; }
            public Builder correctAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; return this; }
            public Builder isCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; return this; }
            public Builder explanation(String explanation) { this.explanation = explanation; return this; }

            public QuestionFeedbackDto build() {
                return new QuestionFeedbackDto(questionId, skillName, questionText, selectedAnswer, correctAnswer, isCorrect, explanation);
            }
        }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public String getSelectedAnswer() { return selectedAnswer; }
        public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    public static class CreateQuestionDto {
        private Long skillId;
        private String questionText;
        private QuestionType type;
        private String codeSnippet;
        private List<String> options;
        private String correctAnswer;
        private String explanation;

        public CreateQuestionDto() {}

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public QuestionType getType() { return type; }
        public void setType(QuestionType type) { this.type = type; }
        public String getCodeSnippet() { return codeSnippet; }
        public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }
        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }
        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    public static class AssessmentSummaryDto {
        private Long id;
        private String title;
        private String targetRoleName;
        private Integer durationMinutes;
        private Integer totalQuestions;

        public AssessmentSummaryDto() {}
        public AssessmentSummaryDto(Long id, String title, String targetRoleName, Integer durationMinutes, Integer totalQuestions) {
            this.id = id;
            this.title = title;
            this.targetRoleName = targetRoleName;
            this.durationMinutes = durationMinutes;
            this.totalQuestions = totalQuestions;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getTargetRoleName() { return targetRoleName; }
        public void setTargetRoleName(String targetRoleName) { this.targetRoleName = targetRoleName; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
        public Integer getTotalQuestions() { return totalQuestions; }
        public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    }
}
