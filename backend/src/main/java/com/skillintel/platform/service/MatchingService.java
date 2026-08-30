package com.skillintel.platform.service;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.OpportunitySkill;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.domain.StudentSkill;
import com.skillintel.platform.dto.OpportunityDtos.MatchScoreBreakdownDto;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class MatchingService {

    private final StudentProfileRepository studentProfileRepository;
    private final OpportunityRepository opportunityRepository;
    private final OpportunitySkillRepository opportunitySkillRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final EligibilityEngineService eligibilityEngineService;
    private final MatchingStrategy matchingStrategy;

    public MatchingService(StudentProfileRepository studentProfileRepository,
                           OpportunityRepository opportunityRepository,
                           OpportunitySkillRepository opportunitySkillRepository,
                           StudentSkillRepository studentSkillRepository,
                           EligibilityEngineService eligibilityEngineService,
                           MatchingStrategy matchingStrategy) {
        this.studentProfileRepository = studentProfileRepository;
        this.opportunityRepository = opportunityRepository;
        this.opportunitySkillRepository = opportunitySkillRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.eligibilityEngineService = eligibilityEngineService;
        this.matchingStrategy = matchingStrategy;
    }

    public MatchScoreBreakdownDto evaluateMatch(Long studentProfileId, Long opportunityId) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        List<OpportunitySkill> reqSkills = opportunitySkillRepository.findByOpportunityId(opportunityId);
        List<StudentSkill> verifiedSkills = studentSkillRepository.findByStudentProfileId(studentProfileId);

        EligibilityEngineService.EligibilityResult elRes = eligibilityEngineService.checkEligibility(student, opportunity);

        return matchingStrategy.calculateMatch(student, opportunity, reqSkills, verifiedSkills, elRes.isEligible(), elRes.getReason());
    }

    public List<MatchScoreBreakdownDto> getRecommendedOpportunitiesForStudent(Long studentProfileId) {
        List<Opportunity> opportunities = opportunityRepository.findAll();
        List<MatchScoreBreakdownDto> recommendations = new ArrayList<>();

        for (Opportunity opp : opportunities) {
            recommendations.add(evaluateMatch(studentProfileId, opp.getId()));
        }

        // Rank by overall match score descending
        recommendations.sort(Comparator.comparingInt(MatchScoreBreakdownDto::getOverallMatchScore).reversed());
        return recommendations;
    }
}
