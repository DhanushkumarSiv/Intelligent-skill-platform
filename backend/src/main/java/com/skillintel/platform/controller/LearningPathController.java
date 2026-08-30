package com.skillintel.platform.controller;

import com.skillintel.platform.domain.enums.LearningStatus;
import com.skillintel.platform.dto.LearningDtos.LearningPathDto;
import com.skillintel.platform.dto.LearningDtos.LearningProgressDto;
import com.skillintel.platform.service.LearningService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-paths")
public class LearningPathController {

    private final LearningService learningService;

    public LearningPathController(LearningService learningService) {
        this.learningService = learningService;
    }

    @PostMapping
    public ResponseEntity<LearningPathDto> createLearningPath(
            @RequestParam(defaultValue = "1") Long studentProfileId,
            @RequestParam Long skillId) {
        return ResponseEntity.ok(learningService.createLearningPath(studentProfileId, skillId));
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<LearningPathDto>> getStudentPaths(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(learningService.getStudentLearningPaths(studentProfileId));
    }

    @PutMapping("/progress/{progressId}")
    public ResponseEntity<LearningProgressDto> updateProgress(
            @PathVariable Long progressId,
            @RequestParam Integer progressPercent,
            @RequestParam(required = false) LearningStatus status) {
        return ResponseEntity.ok(learningService.updateStepProgress(progressId, progressPercent, status));
    }
}
