package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.LearningStatus;
import com.skillintel.platform.dto.LearningDtos.*;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LearningService {

    private final LearningPathRepository learningPathRepository;
    private final LearningProgressRepository learningProgressRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final SkillRepository skillRepository;
    private final CourseRepository courseRepository;
    private final RecommendationEngineService recommendationEngineService;
    private final AiLearningPathService aiLearningPathService;
    private final StudentSkillRepository studentSkillRepository;

    public LearningService(LearningPathRepository learningPathRepository,
                           LearningProgressRepository learningProgressRepository,
                           StudentProfileRepository studentProfileRepository,
                           SkillRepository skillRepository,
                           CourseRepository courseRepository,
                           RecommendationEngineService recommendationEngineService,
                           AiLearningPathService aiLearningPathService,
                           StudentSkillRepository studentSkillRepository) {
        this.learningPathRepository = learningPathRepository;
        this.learningProgressRepository = learningProgressRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.courseRepository = courseRepository;
        this.recommendationEngineService = recommendationEngineService;
        this.aiLearningPathService = aiLearningPathService;
        this.studentSkillRepository = studentSkillRepository;
    }

    @Transactional
    public LearningPathDto createLearningPath(Long studentProfileId, Long skillId) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        List<LearningPath> existing = learningPathRepository.findByStudentProfileIdAndSkillId(studentProfileId, skillId);
        if (!existing.isEmpty()) {
            return mapPathToDto(existing.get(0));
        }

        StudentSkill ss = studentSkillRepository.findByStudentProfileIdAndSkillId(studentProfileId, skillId).orElse(null);
        int initialScore = (ss != null && ss.getVerifiedScore() != null) ? ss.getVerifiedScore() : 25;

        LearningPath path = LearningPath.builder()
                .studentProfile(student)
                .skill(skill)
                .targetRole(student.getTargetRole())
                .title("Personalized " + skill.getName() + " Mastery Path")
                .status(LearningStatus.IN_PROGRESS)
                .initialScore(initialScore)
                .currentScore(initialScore)
                .totalSteps(5)
                .build();

        path = learningPathRepository.save(path);

        List<CourseDto> availableCourses = recommendationEngineService.getRecommendedCoursesForSkill(skillId);
        List<AiLearningPathService.LearningStepPlan> plans = aiLearningPathService.generateSequence(skill, initialScore, 70, availableCourses);

        for (AiLearningPathService.LearningStepPlan plan : plans) {
            Course course = null;
            if (plan.getRecommendedCourse() != null) {
                course = courseRepository.findById(plan.getRecommendedCourse().getId()).orElse(null);
            }

            LearningProgress step = LearningProgress.builder()
                    .learningPath(path)
                    .stepNumber(plan.getStepNumber())
                    .moduleTitle(plan.getModuleTitle())
                    .course(course)
                    .status(plan.getStepNumber() == 1 ? LearningStatus.IN_PROGRESS : LearningStatus.NOT_STARTED)
                    .progress(plan.getStepNumber() == 1 ? 20 : 0)
                    .startedAt(plan.getStepNumber() == 1 ? LocalDateTime.now() : null)
                    .build();

            learningProgressRepository.save(step);
        }

        return mapPathToDto(path);
    }

    public List<LearningPathDto> getStudentLearningPaths(Long studentProfileId) {
        return learningPathRepository.findByStudentProfileId(studentProfileId).stream()
                .map(this::mapPathToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public LearningProgressDto updateStepProgress(Long progressId, Integer progressPercent, LearningStatus status) {
        LearningProgress step = learningProgressRepository.findById(progressId)
                .orElseThrow(() -> new RuntimeException("Learning progress step not found"));

        step.setProgress(progressPercent);
        if (status != null) step.setStatus(status);
        if (progressPercent >= 100) {
            step.setStatus(LearningStatus.COMPLETED);
            step.setCompletedAt(LocalDateTime.now());
        }

        step = learningProgressRepository.save(step);

        // Update overall learning path status if all steps completed
        LearningPath path = step.getLearningPath();
        List<LearningProgress> allSteps = learningProgressRepository.findByLearningPathIdOrderByStepNumberAsc(path.getId());

        boolean allDone = allSteps.stream().allMatch(s -> s.getStatus() == LearningStatus.COMPLETED);
        if (allDone) {
            path.setStatus(LearningStatus.COMPLETED);
            learningPathRepository.save(path);
        }

        Course c = step.getCourse();
        CourseDto courseDto = c != null ? CourseDto.builder()
                .id(c.getId())
                .title(c.getTitle())
                .provider(c.getProvider())
                .url(c.getUrl())
                .difficulty(c.getDifficulty())
                .durationHours(c.getDurationHours())
                .build() : null;

        return LearningProgressDto.builder()
                .id(step.getId())
                .learningPathId(path.getId())
                .stepNumber(step.getStepNumber())
                .moduleTitle(step.getModuleTitle())
                .course(courseDto)
                .status(step.getStatus())
                .progress(step.getProgress())
                .build();
    }

    public LearningPathDto mapPathToDto(LearningPath path) {
        List<LearningProgress> steps = learningProgressRepository.findByLearningPathIdOrderByStepNumberAsc(path.getId());

        List<LearningProgressDto> stepDtos = steps.stream().map(s -> {
            Course c = s.getCourse();
            CourseDto courseDto = c != null ? CourseDto.builder()
                    .id(c.getId())
                    .title(c.getTitle())
                    .provider(c.getProvider())
                    .url(c.getUrl())
                    .difficulty(c.getDifficulty())
                    .durationHours(c.getDurationHours())
                    .build() : null;

            return LearningProgressDto.builder()
                    .id(s.getId())
                    .learningPathId(path.getId())
                    .stepNumber(s.getStepNumber())
                    .moduleTitle(s.getModuleTitle())
                    .course(courseDto)
                    .status(s.getStatus())
                    .progress(s.getProgress())
                    .build();
        }).collect(Collectors.toList());

        return LearningPathDto.builder()
                .id(path.getId())
                .skillId(path.getSkill().getId())
                .skillName(path.getSkill().getName())
                .title(path.getTitle())
                .totalSteps(path.getTotalSteps())
                .status(path.getStatus())
                .initialScore(path.getInitialScore())
                .currentScore(path.getCurrentScore())
                .steps(stepDtos)
                .build();
    }
}
