package com.skillintel.platform.service;

import com.skillintel.platform.domain.Course;
import com.skillintel.platform.domain.CourseSkillMap;
import com.skillintel.platform.dto.LearningDtos.CourseDto;
import com.skillintel.platform.repository.CourseRepository;
import com.skillintel.platform.repository.CourseSkillMapRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationEngineService {

    private final CourseRepository courseRepository;
    private final CourseSkillMapRepository courseSkillMapRepository;

    public RecommendationEngineService(CourseRepository courseRepository, CourseSkillMapRepository courseSkillMapRepository) {
        this.courseRepository = courseRepository;
        this.courseSkillMapRepository = courseSkillMapRepository;
    }

    public List<CourseDto> getRecommendedCoursesForSkill(Long skillId) {
        List<CourseSkillMap> mappings = courseSkillMapRepository.findBySkillId(skillId);

        List<CourseDto> recommended = new ArrayList<>();
        for (CourseSkillMap map : mappings) {
            Course c = map.getCourse();
            recommended.add(CourseDto.builder()
                    .id(c.getId())
                    .title(c.getTitle())
                    .provider(c.getProvider())
                    .url(c.getUrl())
                    .description(c.getDescription())
                    .difficulty(c.getDifficulty())
                    .durationHours(c.getDurationHours())
                    .qualityScore(c.getQualityScore())
                    .coverageLevel(map.getCoverageLevel())
                    .build());
        }

        // Rank by coverage level * quality score descending
        recommended.sort(Comparator.comparingInt((CourseDto c) -> c.getCoverageLevel() * c.getQualityScore()).reversed());
        return recommended;
    }

    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream().map(c -> CourseDto.builder()
                .id(c.getId())
                .title(c.getTitle())
                .provider(c.getProvider())
                .url(c.getUrl())
                .description(c.getDescription())
                .difficulty(c.getDifficulty())
                .durationHours(c.getDurationHours())
                .qualityScore(c.getQualityScore())
                .build()).collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long id) {
        Course c = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID " + id));
        return CourseDto.builder()
                .id(c.getId())
                .title(c.getTitle())
                .provider(c.getProvider())
                .url(c.getUrl())
                .description(c.getDescription())
                .difficulty(c.getDifficulty())
                .durationHours(c.getDurationHours())
                .qualityScore(c.getQualityScore())
                .build();
    }
}
