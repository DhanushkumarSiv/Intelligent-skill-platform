package com.skillintel.platform.controller;

import com.skillintel.platform.domain.Collaboration;
import com.skillintel.platform.dto.CollaborationDtos.CollaborationDto;
import com.skillintel.platform.service.CollaborationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collaborations")
public class CollaborationController {

    private final CollaborationService collaborationService;

    public CollaborationController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @GetMapping
    public ResponseEntity<List<CollaborationDto>> getAllCollaborations() {
        return ResponseEntity.ok(collaborationService.getAllCollaborations());
    }

    @PostMapping
    public ResponseEntity<CollaborationDto> createCollaboration(@RequestBody Collaboration collaboration) {
        return ResponseEntity.ok(collaborationService.createCollaboration(collaboration));
    }

    @PostMapping("/{id}/interest")
    public ResponseEntity<String> expressInterest(@PathVariable Long id, @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok("Interest expressed successfully for collaboration ID: " + id);
    }
}
