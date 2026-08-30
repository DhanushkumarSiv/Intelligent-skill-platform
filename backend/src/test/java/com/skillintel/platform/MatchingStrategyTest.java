package com.skillintel.platform.test;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.OpportunitySkill;
import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.domain.StudentSkill;
import com.skillintel.platform.dto.OpportunityDtos.MatchScoreBreakdownDto;
import com.skillintel.platform.service.DefaultMatchingStrategy;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MatchingStrategyTest {

    private final DefaultMatchingStrategy matchingStrategy = new DefaultMatchingStrategy();

    @Test
    void testWeightedMatchingFormulaAndSkillBreakdown() {
        Skill java = Skill.builder().id(1L).name("Java").category("Programming").build();
        Skill docker = Skill.builder().id(6L).name("Docker").category("DevOps").build();

        Opportunity opp = Opportunity.builder().id(10L).title("Backend Engineer").location("Remote").build();

        List<OpportunitySkill> reqSkills = List.of(
                OpportunitySkill.builder().skill(java).importance(90).minimumScore(80).build(),
                OpportunitySkill.builder().skill(docker).importance(60).minimumScore(50).build()
        );

        List<StudentSkill> verifiedSkills = List.of(
                StudentSkill.builder().skill(java).verifiedScore(88).build(),
                StudentSkill.builder().skill(docker).verifiedScore(25).build()
        );

        StudentProfile student = StudentProfile.builder().id(1L).build();

        MatchScoreBreakdownDto match = matchingStrategy.calculateMatch(student, opp, reqSkills, verifiedSkills, true, "Eligible");

        assertNotNull(match);
        assertTrue(match.getOverallMatchScore() > 70);
        assertEquals("Docker", match.getBiggestGapSkillName());
        assertEquals(2, match.getSkillBreakdown().size());
        assertEquals("STRONG", match.getSkillBreakdown().get(0).getStatus());
        assertEquals("WEAK", match.getSkillBreakdown().get(1).getStatus());
    }
}
