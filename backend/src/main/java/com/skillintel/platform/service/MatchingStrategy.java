package com.skillintel.platform.service;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.OpportunitySkill;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.domain.StudentSkill;
import com.skillintel.platform.dto.OpportunityDtos.MatchScoreBreakdownDto;

import java.util.List;

public interface MatchingStrategy {
    MatchScoreBreakdownDto calculateMatch(
            StudentProfile student,
            Opportunity opportunity,
            List<OpportunitySkill> requiredSkills,
            List<StudentSkill> verifiedSkills,
            boolean isEligible,
            String eligibilityReason
    );
}
