package com.skillintel.platform.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillintel.platform.domain.*;
import com.skillintel.platform.dto.AssessmentDtos.*;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final AssessmentQuestionRepository questionRepository;
    private final StudentAssessmentRepository studentAssessmentRepository;
    private final StudentAssessmentAnswerRepository answerRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final EvidenceEngineService evidenceEngineService;
    private final SkillRepository skillRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AssessmentService(AssessmentRepository assessmentRepository,
                             AssessmentQuestionRepository questionRepository,
                             StudentAssessmentRepository studentAssessmentRepository,
                             StudentAssessmentAnswerRepository answerRepository,
                             StudentProfileRepository studentProfileRepository,
                             EvidenceEngineService evidenceEngineService,
                             SkillRepository skillRepository) {
        this.assessmentRepository = assessmentRepository;
        this.questionRepository = questionRepository;
        this.studentAssessmentRepository = studentAssessmentRepository;
        this.answerRepository = answerRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.evidenceEngineService = evidenceEngineService;
        this.skillRepository = skillRepository;
    }

    public AssessmentDto getAssessmentByRoleId(Long roleId) {
        Assessment assessment = assessmentRepository.findByTargetRoleId(roleId)
                .orElseGet(() -> {
                    List<Assessment> all = assessmentRepository.findAll();
                    return all.isEmpty() ? null : all.get(0);
                });

        if (assessment == null) {
            throw new RuntimeException("Assessment not found for role ID " + roleId);
        }

        List<QuestionDto> questionDtos = assessment.getQuestions().stream()
                .map(q -> {
                    List<String> options = Collections.emptyList();
                    try {
                        options = objectMapper.readValue(q.getOptionsJson(), new TypeReference<List<String>>() {});
                    } catch (Exception ignored) {}

                    return QuestionDto.builder()
                            .id(q.getId())
                            .skillId(q.getSkill().getId())
                            .skillName(q.getSkill().getName())
                            .questionText(q.getQuestionText())
                            .type(q.getType())
                            .codeSnippet(q.getCodeSnippet())
                            .options(options)
                            .build();
                })
                .collect(Collectors.toList());

        return AssessmentDto.builder()
                .id(assessment.getId())
                .title(assessment.getTitle())
                .targetRoleId(assessment.getTargetRole().getId())
                .targetRoleName(assessment.getTargetRole().getName())
                .durationMinutes(assessment.getDurationMinutes())
                .totalQuestions(questionDtos.size())
                .questions(questionDtos)
                .build();
    }

    @Transactional
    public AssessmentResultDto submitAssessment(Long studentProfileId, AssessmentSubmitDto submitDto) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        Assessment assessment = assessmentRepository.findById(submitDto.getAssessmentId())
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        StudentAssessment studentAssessment = StudentAssessment.builder()
                .studentProfile(student)
                .assessment(assessment)
                .overallScore(0)
                .build();

        studentAssessment = studentAssessmentRepository.save(studentAssessment);

        Map<Long, List<Boolean>> skillCorrectMap = new HashMap<>();
        Map<Long, String> skillNameMap = new HashMap<>();
        List<QuestionFeedbackDto> feedbacks = new ArrayList<>();
        int totalCorrect = 0;

        for (QuestionAnswerDto answerDto : submitDto.getAnswers()) {
            AssessmentQuestion question = questionRepository.findById(answerDto.getQuestionId())
                    .orElse(null);
            if (question == null) continue;

            boolean isCorrect = question.getCorrectAnswer() != null &&
                    question.getCorrectAnswer().equalsIgnoreCase(answerDto.getSelectedAnswer());

            if (isCorrect) totalCorrect++;

            Long skillId = question.getSkill().getId();
            String skillName = question.getSkill().getName();
            skillNameMap.put(skillId, skillName);

            skillCorrectMap.computeIfAbsent(skillId, k -> new ArrayList<>()).add(isCorrect);

            StudentAssessmentAnswer saAnswer = StudentAssessmentAnswer.builder()
                    .studentAssessment(studentAssessment)
                    .question(question)
                    .selectedAnswer(answerDto.getSelectedAnswer())
                    .isCorrect(isCorrect)
                    .scoreObtained(isCorrect ? 100 : 0)
                    .build();
            answerRepository.save(saAnswer);

            feedbacks.add(QuestionFeedbackDto.builder()
                    .questionId(question.getId())
                    .skillName(skillName)
                    .questionText(question.getQuestionText())
                    .selectedAnswer(answerDto.getSelectedAnswer())
                    .correctAnswer(question.getCorrectAnswer())
                    .isCorrect(isCorrect)
                    .explanation(question.getExplanation())
                    .build());
        }

        int totalQuestions = submitDto.getAnswers().size();
        int overallScore = totalQuestions > 0 ? (int) Math.round(((double) totalCorrect / totalQuestions) * 100) : 0;
        studentAssessment.setOverallScore(overallScore);
        studentAssessmentRepository.save(studentAssessment);

        Map<String, Integer> skillWiseScores = new HashMap<>();
        for (Map.Entry<Long, List<Boolean>> entry : skillCorrectMap.entrySet()) {
            Long skillId = entry.getKey();
            List<Boolean> results = entry.getValue();
            long correctCount = results.stream().filter(b -> b).count();
            int score = (int) Math.round(((double) correctCount / results.size()) * 100);

            String skillName = skillNameMap.get(skillId);
            skillWiseScores.put(skillName, score);

            evidenceEngineService.recordAssessmentEvidence(studentProfileId, skillId, score);
            evidenceEngineService.recordMcqAssessmentWebsiteEvidence(studentProfileId, skillId, score);
        }

        return AssessmentResultDto.builder()
                .studentAssessmentId(studentAssessment.getId())
                .overallScore(overallScore)
                .skillWiseScores(skillWiseScores)
                .questionFeedback(feedbacks)
                .build();
    }

    public List<AssessmentSummaryDto> getAllAssessments() {
        return assessmentRepository.findAll().stream().map(assessment -> {
            return new AssessmentSummaryDto(
                    assessment.getId(),
                    assessment.getTitle(),
                    assessment.getTargetRole().getName(),
                    assessment.getDurationMinutes(),
                    assessment.getQuestions() != null ? assessment.getQuestions().size() : 0
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public QuestionDto addQuestionToAssessment(Long assessmentId, CreateQuestionDto dto) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        Skill skill = skillRepository.findById(dto.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        String optionsJson = "[]";
        try {
            if (dto.getOptions() != null) {
                optionsJson = objectMapper.writeValueAsString(dto.getOptions());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize options", e);
        }

        AssessmentQuestion question = AssessmentQuestion.builder()
                .assessment(assessment)
                .skill(skill)
                .questionText(dto.getQuestionText())
                .type(dto.getType())
                .codeSnippet(dto.getCodeSnippet())
                .optionsJson(optionsJson)
                .correctAnswer(dto.getCorrectAnswer())
                .explanation(dto.getExplanation())
                .build();

        question = questionRepository.save(question);
        if (assessment.getQuestions() == null) {
            assessment.setQuestions(new ArrayList<>());
        }
        assessment.getQuestions().add(question);
        assessmentRepository.save(assessment);

        return QuestionDto.builder()
                .id(question.getId())
                .skillId(skill.getId())
                .skillName(skill.getName())
                .questionText(question.getQuestionText())
                .type(question.getType())
                .codeSnippet(question.getCodeSnippet())
                .options(dto.getOptions())
                .build();
    }
}
