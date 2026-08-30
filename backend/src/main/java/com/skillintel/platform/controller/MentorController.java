package com.skillintel.platform.controller;

import com.skillintel.platform.dto.CollaborationDtos.MentorDto;
import com.skillintel.platform.dto.CollaborationDtos.MentorFeedbackDto;
import com.skillintel.platform.dto.CollaborationDtos.MentorshipDto;
import com.skillintel.platform.service.MentorshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MentorController {

    private final MentorshipService mentorshipService;

    public MentorController(MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @GetMapping("/mentors")
    public ResponseEntity<List<MentorDto>> getAllMentors() {
        return ResponseEntity.ok(mentorshipService.getAllMentors());
    }

    @GetMapping("/mentorships/student/{studentProfileId}")
    public ResponseEntity<List<MentorshipDto>> getStudentMentorships(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(mentorshipService.getStudentMentorships(studentProfileId));
    }

    @PostMapping("/mentor-feedback")
    public ResponseEntity<MentorFeedbackDto> submitFeedback(
            @RequestParam(defaultValue = "1") Long studentProfileId,
            @RequestParam(defaultValue = "1") Long mentorId,
            @RequestParam(defaultValue = "1") Long skillId,
            @RequestParam(defaultValue = "85") int score,
            @RequestParam String comments,
            @RequestParam(required = false) String technicalEvaluation,
            @RequestParam(required = false) String softSkillEvaluation) {
        return ResponseEntity.ok(mentorshipService.submitMentorFeedback(studentProfileId, mentorId, skillId, score, comments, technicalEvaluation, softSkillEvaluation));
    }

    @GetMapping("/students/{id}/mentor-feedback")
    public ResponseEntity<List<MentorFeedbackDto>> getStudentMentorFeedback(@PathVariable Long id) {
        return ResponseEntity.ok(mentorshipService.getStudentMentorFeedback(id));
    }
}
