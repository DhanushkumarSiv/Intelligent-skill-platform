package com.skillintel.platform.test;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.service.EligibilityEngineService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EligibilityEngineUnitTest {

    private final EligibilityEngineService eligibilityEngineService = new EligibilityEngineService();

    @Test
    void testEligibilityPassWhenCgpaMeetsBenchmark() {
        StudentProfile student = StudentProfile.builder()
                .cgpa(8.5)
                .degree("B.Tech Computer Science")
                .build();

        Opportunity opp = Opportunity.builder()
                .minCgpa(7.5)
                .preferredDegree("B.Tech")
                .build();

        EligibilityEngineService.EligibilityResult result = eligibilityEngineService.checkEligibility(student, opp);

        assertTrue(result.isEligible());
        assertTrue(result.getReason().contains("satisfies all mandatory"));
    }

    @Test
    void testEligibilityFailWhenCgpaBelowBenchmark() {
        StudentProfile student = StudentProfile.builder()
                .cgpa(6.2)
                .degree("B.Tech")
                .build();

        Opportunity opp = Opportunity.builder()
                .minCgpa(7.5)
                .build();

        EligibilityEngineService.EligibilityResult result = eligibilityEngineService.checkEligibility(student, opp);

        assertFalse(result.isEligible());
        assertTrue(result.getReason().contains("CGPA benchmark not met"));
    }
}
