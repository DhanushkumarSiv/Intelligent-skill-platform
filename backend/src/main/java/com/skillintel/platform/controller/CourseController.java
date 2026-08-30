package com.skillintel.platform.controller;

import com.skillintel.platform.dto.LearningDtos.CourseDto;
import com.skillintel.platform.service.RecommendationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final RecommendationEngineService recommendationEngineService;

    public CourseController(RecommendationEngineService recommendationEngineService) {
        this.recommendationEngineService = recommendationEngineService;
    }

    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        return ResponseEntity.ok(recommendationEngineService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(recommendationEngineService.getCourseById(id));
    }

    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<CourseDto>> getRecommendedCourses(@PathVariable Long skillId) {
        return ResponseEntity.ok(recommendationEngineService.getRecommendedCoursesForSkill(skillId));
    }
}
