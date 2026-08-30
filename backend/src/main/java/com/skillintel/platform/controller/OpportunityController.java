package com.skillintel.platform.controller;

import com.skillintel.platform.domain.Company;
import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.OpportunitySkill;
import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.dto.OpportunityDtos.*;
import com.skillintel.platform.repository.CompanyRepository;
import com.skillintel.platform.repository.OpportunityRepository;
import com.skillintel.platform.repository.OpportunitySkillRepository;
import com.skillintel.platform.repository.SkillRepository;
import com.skillintel.platform.service.JobDescriptionParsingService;
import com.skillintel.platform.service.MatchingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityRepository opportunityRepository;
    private final OpportunitySkillRepository opportunitySkillRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final MatchingService matchingService;
    private final JobDescriptionParsingService jobDescriptionParsingService;

    public OpportunityController(OpportunityRepository opportunityRepository,
                                 OpportunitySkillRepository opportunitySkillRepository,
                                 CompanyRepository companyRepository,
                                 SkillRepository skillRepository,
                                 MatchingService matchingService,
                                 JobDescriptionParsingService jobDescriptionParsingService) {
        this.opportunityRepository = opportunityRepository;
        this.opportunitySkillRepository = opportunitySkillRepository;
        this.companyRepository = companyRepository;
        this.skillRepository = skillRepository;
        this.matchingService = matchingService;
        this.jobDescriptionParsingService = jobDescriptionParsingService;
    }

    @GetMapping
    public ResponseEntity<List<OpportunityDto>> getAllOpportunities() {
        List<OpportunityDto> list = opportunityRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpportunityDto> getOpportunityById(@PathVariable Long id) {
        Opportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));
        return ResponseEntity.ok(mapToDto(opp));
    }

    @PostMapping
    public ResponseEntity<OpportunityDto> createOpportunity(@RequestBody Opportunity opp) {
        if (opp.getCompany() != null && opp.getCompany().getId() != null) {
            Company company = companyRepository.findById(opp.getCompany().getId()).orElse(null);
            opp.setCompany(company);
        }
        Opportunity saved = opportunityRepository.save(opp);
        return ResponseEntity.ok(mapToDto(saved));
    }

    @PostMapping("/{id}/match")
    public ResponseEntity<MatchScoreBreakdownDto> matchStudent(
            @PathVariable Long id,
            @RequestParam(defaultValue = "1") Long studentProfileId) {
        return ResponseEntity.ok(matchingService.evaluateMatch(studentProfileId, id));
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<MatchScoreBreakdownDto>> getRecommendedForStudent(@PathVariable Long studentProfileId) {
        return ResponseEntity.ok(matchingService.getRecommendedOpportunitiesForStudent(studentProfileId));
    }

    @PostMapping("/parse-jd")
    public ResponseEntity<List<OpportunitySkillDto>> parseJobDescription(@RequestBody JobDescriptionParseRequestDto request) {
        return ResponseEntity.ok(jobDescriptionParsingService.parseSkillsFromText(request.getRawJobDescription()));
    }

    private OpportunityDto mapToDto(Opportunity opp) {
        Company c = opp.getCompany();
        CompanyDto companyDto = c != null ? CompanyDto.builder()
                .id(c.getId())
                .name(c.getName())
                .industry(c.getIndustry())
                .website(c.getWebsite())
                .location(c.getLocation())
                .verified(c.getVerified())
                .build() : null;

        List<OpportunitySkill> reqSkills = opportunitySkillRepository.findByOpportunityId(opp.getId());
        List<OpportunitySkillDto> skillDtos = reqSkills.stream().map(s -> OpportunitySkillDto.builder()
                .skillId(s.getSkill().getId())
                .skillName(s.getSkill().getName())
                .category(s.getSkill().getCategory())
                .importance(s.getImportance())
                .minimumScore(s.getMinimumScore())
                .build()).collect(Collectors.toList());

        return OpportunityDto.builder()
                .id(opp.getId())
                .company(companyDto)
                .title(opp.getTitle())
                .type(opp.getType())
                .description(opp.getDescription())
                .location(opp.getLocation())
                .duration(opp.getDuration())
                .stipend(opp.getStipend())
                .minCgpa(opp.getMinCgpa())
                .preferredDegree(opp.getPreferredDegree())
                .deadline(opp.getDeadline())
                .status(opp.getStatus())
                .skills(skillDtos)
                .build();
    }
}
