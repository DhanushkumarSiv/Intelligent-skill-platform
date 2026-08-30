package com.skillintel.platform.controller;

import com.skillintel.platform.dto.CollaborationDtos.InternshipDto;
import com.skillintel.platform.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<InternshipDto>> getStudentInternships(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(internshipService.getStudentInternships(studentProfileId));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<InternshipDto> completeInternship(
            @PathVariable Long id,
            @RequestParam(defaultValue = "Completed with Distinction") String completionStatus) {
        return ResponseEntity.ok(internshipService.completeInternship(id, completionStatus));
    }
}
