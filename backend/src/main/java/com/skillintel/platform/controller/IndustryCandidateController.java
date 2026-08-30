package com.skillintel.platform.controller;

import com.skillintel.platform.dto.OpportunityDtos.CandidateSearchResultDto;
import com.skillintel.platform.dto.SkillDtos.SkillPassportDto;
import com.skillintel.platform.service.CandidateSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/industry/candidates")
public class IndustryCandidateController {

    private final CandidateSearchService candidateSearchService;

    public IndustryCandidateController(CandidateSearchService candidateSearchService) {
        this.candidateSearchService = candidateSearchService;
    }

    @GetMapping
    public ResponseEntity<List<CandidateSearchResultDto>> searchCandidates(
            @RequestParam(required = false) List<String> skills) {
        return ResponseEntity.ok(candidateSearchService.searchCandidates(skills));
    }

    @GetMapping("/{id}/evidence")
    public ResponseEntity<SkillPassportDto> getCandidateEvidence(@PathVariable Long id) {
        return ResponseEntity.ok(candidateSearchService.getCandidateEvidence(id));
    }
}
