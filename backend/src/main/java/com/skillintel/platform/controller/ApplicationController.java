package com.skillintel.platform.controller;

import com.skillintel.platform.domain.enums.ApplicationStatus;
import com.skillintel.platform.dto.OpportunityDtos.ApplicationDto;
import com.skillintel.platform.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationDto> apply(
            @RequestParam(defaultValue = "1") Long studentProfileId,
            @RequestParam Long opportunityId,
            @RequestParam(required = false) String coverNote) {
        return ResponseEntity.ok(applicationService.applyForOpportunity(studentProfileId, opportunityId, coverNote));
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<ApplicationDto>> getStudentApplications(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(applicationService.getStudentApplications(studentProfileId));
    }

    @GetMapping("/opportunity/{opportunityId}")
    public ResponseEntity<List<ApplicationDto>> getOpportunityApplications(@PathVariable Long opportunityId) {
        return ResponseEntity.ok(applicationService.getOpportunityApplications(opportunityId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationDto> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }
}
