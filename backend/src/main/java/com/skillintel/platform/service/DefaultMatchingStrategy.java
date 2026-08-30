package com.skillintel.platform.service;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.OpportunitySkill;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.domain.StudentSkill;
import com.skillintel.platform.dto.OpportunityDtos.MatchScoreBreakdownDto;
import com.skillintel.platform.dto.OpportunityDtos.SkillMatchDetailDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class DefaultMatchingStrategy implements MatchingStrategy {

    @Override
    public MatchScoreBreakdownDto calculateMatch(
            StudentProfile student,
            Opportunity opportunity,
            List<OpportunitySkill> requiredSkills,
            List<StudentSkill> verifiedSkills,
            boolean isEligible,
            String eligibilityReason
    ) {
        List<SkillMatchDetailDto> skillBreakdown = new ArrayList<>();

        double weightedSkillScoreSum = 0;
        double totalWeightSum = 0;

        String biggestGapSkillName = null;
        Long biggestGapSkillId = null;
        int maxGap = 0;

        for (OpportunitySkill req : requiredSkills) {
            Long skillId = req.getSkill().getId();
            String skillName = req.getSkill().getName();
            int minScore = req.getMinimumScore() != null ? req.getMinimumScore() : 60;
            int importance = req.getImportance() != null ? req.getImportance() : 80;

            StudentSkill ss = verifiedSkills.stream()
                    .filter(s -> s.getSkill().getId().equals(skillId))
                    .findFirst()
                    .orElse(null);

            int verifiedScore = (ss != null && ss.getVerifiedScore() != null) ? ss.getVerifiedScore() : 0;
            int gap = Math.max(0, minScore - verifiedScore);

            String status;
            if (verifiedScore >= minScore) {
                status = "STRONG";
            } else if (minScore - verifiedScore <= 15) {
                status = "MODERATE";
            } else {
                status = "WEAK";
            }

            if (gap > maxGap) {
                maxGap = gap;
                biggestGapSkillName = skillName;
                biggestGapSkillId = skillId;
            }

            double skillRatio = Math.min(1.0, (double) verifiedScore / Math.max(1, minScore));
            weightedSkillScoreSum += skillRatio * importance;
            totalWeightSum += importance;

            skillBreakdown.add(SkillMatchDetailDto.builder()
                    .skillId(skillId)
                    .skillName(skillName)
                    .requiredScore(minScore)
                    .studentVerifiedScore(verifiedScore)
                    .status(status)
                    .gap(gap)
                    .build());
        }

        int skillMatchScore = totalWeightSum > 0 ? (int) Math.round((weightedSkillScoreSum / totalWeightSum) * 100) : 80;
        int eligibilityScore = isEligible ? 100 : 40;
        int interestScore = 90; // Default match interest
        int locationScore = (opportunity.getLocation() != null && opportunity.getLocation().equalsIgnoreCase("Remote")) ? 100 : 85;

        // Formula: 70% Skill + 15% Eligibility + 10% Interest + 5% Location
        double finalScoreRaw = (0.70 * skillMatchScore) + (0.15 * eligibilityScore) + (0.10 * interestScore) + (0.05 * locationScore);
        int overallMatchScore = (int) Math.round(finalScoreRaw);

        return MatchScoreBreakdownDto.builder()
                .studentId(student != null ? student.getId() : 1L)
                .opportunityId(opportunity.getId())
                .opportunityTitle(opportunity.getTitle())
                .companyName(opportunity.getCompany() != null ? opportunity.getCompany().getName() : "Industry Partner")
                .overallMatchScore(overallMatchScore)
                .skillMatchScore(skillMatchScore)
                .eligibilityScore(eligibilityScore)
                .locationScore(locationScore)
                .isEligible(isEligible)
                .eligibilityReason(eligibilityReason)
                .skillBreakdown(skillBreakdown)
                .biggestGapSkillName(biggestGapSkillName)
                .biggestGapSkillId(biggestGapSkillId)
                .build();
    }
}
