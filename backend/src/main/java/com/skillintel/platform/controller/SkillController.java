package com.skillintel.platform.controller;

import com.skillintel.platform.dto.SkillDtos.SkillDto;
import com.skillintel.platform.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillDto>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping
    public ResponseEntity<SkillDto> createSkill(@RequestBody SkillDto dto) {
        return ResponseEntity.ok(skillService.createSkill(dto));
    }
}
