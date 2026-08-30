package com.skillintel.platform.controller;

import com.skillintel.platform.dto.AssessmentDtos.*;
import com.skillintel.platform.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<AssessmentDto> getAssessmentByRole(@PathVariable Long roleId) {
        return ResponseEntity.ok(assessmentService.getAssessmentByRoleId(roleId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentDto> getAssessmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getAssessmentByRoleId(id));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<AssessmentResultDto> submitAssessment(
            @PathVariable Long id,
            @RequestParam(defaultValue = "1") Long studentProfileId,
            @RequestBody AssessmentSubmitDto submitDto) {
        submitDto.setAssessmentId(id);
        return ResponseEntity.ok(assessmentService.submitAssessment(studentProfileId, submitDto));
    }

    @GetMapping("")
    public ResponseEntity<List<AssessmentSummaryDto>> getAllAssessments() {
        return ResponseEntity.ok(assessmentService.getAllAssessments());
    }

    @PostMapping("/{id}/questions")
    public ResponseEntity<QuestionDto> addQuestionToAssessment(
            @PathVariable Long id,
            @RequestBody CreateQuestionDto createDto) {
        return ResponseEntity.ok(assessmentService.addQuestionToAssessment(id, createDto));
    }
}
