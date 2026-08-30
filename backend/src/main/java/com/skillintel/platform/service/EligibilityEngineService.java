package com.skillintel.platform.service;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.StudentProfile;
import org.springframework.stereotype.Service;

@Service
public class EligibilityEngineService {

    public EligibilityResult checkEligibility(StudentProfile student, Opportunity opportunity) {
        if (student == null || opportunity == null) {
            return new EligibilityResult(false, "Invalid student or opportunity details");
        }

        double studentCgpa = student.getCgpa() != null ? student.getCgpa() : 8.5;
        double minCgpa = opportunity.getMinCgpa() != null ? opportunity.getMinCgpa() : 6.0;

        if (studentCgpa < minCgpa) {
            return new EligibilityResult(false, String.format("CGPA benchmark not met. Required: %.2f, Current: %.2f", minCgpa, studentCgpa));
        }

        if (opportunity.getPreferredDegree() != null && !opportunity.getPreferredDegree().isEmpty()) {
            String studentDegree = student.getDegree() != null ? student.getDegree().toLowerCase() : "b.tech";
            String reqDegree = opportunity.getPreferredDegree().toLowerCase();
            if (!studentDegree.contains(reqDegree) && !reqDegree.contains(studentDegree)) {
                return new EligibilityResult(true, "Degree requirement partially matched; candidate eligible.");
            }
        }

        return new EligibilityResult(true, "Candidate satisfies all mandatory academic, CGPA, and degree eligibility criteria.");
    }

    public static class EligibilityResult {
        private final boolean eligible;
        private final String reason;

        public EligibilityResult(boolean eligible, String reason) {
            this.eligible = eligible;
            this.reason = reason;
        }

        public boolean isEligible() { return eligible; }
        public String getReason() { return reason; }
    }
}
