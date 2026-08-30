package com.skillintel.platform.test;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ReassessmentServiceTest {

    @Test
    void testReassessmentImprovementCalculation() {
        int previousScore = 25;
        int newScore = 67;

        int improvement = newScore - previousScore;

        assertEquals(42, improvement);
        assertTrue(improvement > 0);
    }
}
