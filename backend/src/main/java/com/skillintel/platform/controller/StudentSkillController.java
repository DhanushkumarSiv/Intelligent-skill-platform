package com.skillintel.platform.controller;

import com.skillintel.platform.dto.SkillDtos.*;
import com.skillintel.platform.repository.SkillEvidenceRecordRepository;
import com.skillintel.platform.service.EvidenceEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
public class StudentSkillController {

    private final EvidenceEngineService evidenceEngineService;
    private final SkillEvidenceRecordRepository evidenceRecordRepository;

    public StudentSkillController(EvidenceEngineService evidenceEngineService,
                                  SkillEvidenceRecordRepository evidenceRecordRepository) {
        this.evidenceEngineService = evidenceEngineService;
        this.evidenceRecordRepository = evidenceRecordRepository;
    }

    @GetMapping("/{id}/skill-passport")
    public ResponseEntity<SkillPassportDto> getDigitalSkillPassport(@PathVariable Long id) {
        return ResponseEntity.ok(evidenceEngineService.getDigitalSkillPassport(id));
    }

    @GetMapping("/{id}/skills")
    public ResponseEntity<List<StudentSkillDto>> getStudentSkills(@PathVariable Long id) {
        SkillPassportDto passport = evidenceEngineService.getDigitalSkillPassport(id);
        return ResponseEntity.ok(passport.getSkills());
    }

    @GetMapping("/{id}/evidence")
    public ResponseEntity<List<SkillEvidenceDto>> getStudentEvidenceRecords(@PathVariable Long id) {
        List<SkillEvidenceDto> list = evidenceRecordRepository.findByStudentSkillStudentProfileId(id).stream()
                .map(r -> SkillEvidenceDto.builder()
                        .id(r.getId())
                        .source(r.getSource())
                        .score(r.getScore())
                        .weight(r.getWeight())
                        .details(r.getDetails())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
