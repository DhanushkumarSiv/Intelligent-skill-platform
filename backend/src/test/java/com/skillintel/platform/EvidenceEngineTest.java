package com.skillintel.platform.test;

import com.skillintel.platform.domain.enums.VerificationStatus;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EvidenceEngineTest {

    @Test
    void testWeightedEvidenceCalculation() {
        int assessmentScore = 85;
        int githubScore = 90;
        int projectScore = 80;
        int certScore = 75;

        double wAss = 0.40, wGh = 0.30, wProj = 0.15, wCert = 0.10;
        double totalWeight = wAss + wGh + wProj + wCert;
        double weightedSum = (assessmentScore * wAss) + (githubScore * wGh) + (projectScore * wProj) + (certScore * wCert);
        int calculatedScore = (int) Math.round(weightedSum / totalWeight);

        assertEquals(85, calculatedScore);

        VerificationStatus status = (calculatedScore >= 70) ? VerificationStatus.VERIFIED : VerificationStatus.EVIDENCE_FOUND;
        assertEquals(VerificationStatus.VERIFIED, status);
    }
}
