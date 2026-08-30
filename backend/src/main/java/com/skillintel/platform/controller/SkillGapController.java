package com.skillintel.platform.controller;

import com.skillintel.platform.dto.LearningDtos.GapAnalysisResultDto;
import com.skillintel.platform.service.SkillGapService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skill-gaps")
public class SkillGapController {

    private final SkillGapService skillGapService;

    public SkillGapController(SkillGapService skillGapService) {
        this.skillGapService = skillGapService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<GapAnalysisResultDto> analyzeGaps(@RequestParam(defaultValue = "1") Long studentProfileId) {
        return ResponseEntity.ok(skillGapService.analyzeSkillGaps(studentProfileId));
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<GapAnalysisResultDto> getStudentSkillGaps(@PathVariable Long id) {
        return ResponseEntity.ok(skillGapService.analyzeSkillGaps(id));
    }
}
