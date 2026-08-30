package com.skillintel.platform.test;

import com.skillintel.platform.domain.enums.PriorityLevel;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SkillGapServiceTest {

    @Test
    void testSkillGapAndPriorityCalculation() {
        int requiredLevel = 60;
        int verifiedScore = 25;
        int importance = 80;

        int gap = Math.max(0, requiredLevel - verifiedScore);
        int priorityScore = importance * gap;

        assertEquals(35, gap);
        assertEquals(2800, priorityScore);

        PriorityLevel priorityLevel = (priorityScore >= 1800) ? PriorityLevel.URGENT : PriorityLevel.HIGH;
        assertEquals(PriorityLevel.URGENT, priorityLevel);
    }
}
