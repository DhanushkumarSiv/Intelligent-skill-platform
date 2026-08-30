package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.LearningStatus;
import com.skillintel.platform.dto.LearningDtos.ReassessmentRequestDto;
import com.skillintel.platform.dto.LearningDtos.ReassessmentResultDto;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReassessmentService {

    private final EvidenceEngineService evidenceEngineService;
    private final StudentSkillRepository studentSkillRepository;
    private final SkillRepository skillRepository;
    private final LearningPathRepository learningPathRepository;

    public ReassessmentService(EvidenceEngineService evidenceEngineService,
                                StudentSkillRepository studentSkillRepository,
                                SkillRepository skillRepository,
                                LearningPathRepository learningPathRepository) {
        this.evidenceEngineService = evidenceEngineService;
        this.studentSkillRepository = studentSkillRepository;
        this.skillRepository = skillRepository;
        this.learningPathRepository = learningPathRepository;
    }

    @Transactional
    public ReassessmentResultDto processReassessment(ReassessmentRequestDto request) {
        Long studentProfileId = request.getStudentProfileId() != null ? request.getStudentProfileId() : 1L;
        Long skillId = request.getSkillId();

        StudentSkill ss = studentSkillRepository.findByStudentProfileIdAndSkillId(studentProfileId, skillId)
                .orElse(null);

        int previousScore = (ss != null && ss.getVerifiedScore() != null) ? ss.getVerifiedScore() : 25;
        int newScore = request.getScoreAchieved() != null ? request.getScoreAchieved() : 67; // Default mock post-learning reassessment score

        // Crucial Integration: Flow back directly into Module 1 Evidence Engine!
        evidenceEngineService.recordAssessmentEvidence(studentProfileId, skillId, newScore);

        // Fetch updated student skill
        ss = studentSkillRepository.findByStudentProfileIdAndSkillId(studentProfileId, skillId).orElseThrow();
        int improvement = ss.getVerifiedScore() - previousScore;

        // Update LearningPath if provided
        if (request.getLearningPathId() != null) {
            LearningPath path = learningPathRepository.findById(request.getLearningPathId()).orElse(null);
            if (path != null) {
                path.setCurrentScore(ss.getVerifiedScore());
                path.setStatus(LearningStatus.COMPLETED);
                learningPathRepository.save(path);
            }
        }

        Skill skill = skillRepository.findById(skillId).orElseThrow();

        return ReassessmentResultDto.builder()
                .skillId(skill.getId())
                .skillName(skill.getName())
                .previousScore(previousScore)
                .newScore(ss.getVerifiedScore())
                .improvement(improvement)
                .updatedStatus(ss.getVerificationStatus())
                .build();
    }
}
