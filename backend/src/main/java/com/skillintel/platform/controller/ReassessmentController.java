package com.skillintel.platform.controller;

import com.skillintel.platform.dto.LearningDtos.ReassessmentRequestDto;
import com.skillintel.platform.dto.LearningDtos.ReassessmentResultDto;
import com.skillintel.platform.service.ReassessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reassessment")
public class ReassessmentController {

    private final ReassessmentService reassessmentService;

    public ReassessmentController(ReassessmentService reassessmentService) {
        this.reassessmentService = reassessmentService;
    }

    @PostMapping
    public ResponseEntity<ReassessmentResultDto> processReassessment(@RequestBody ReassessmentRequestDto request) {
        return ResponseEntity.ok(reassessmentService.processReassessment(request));
    }
}
