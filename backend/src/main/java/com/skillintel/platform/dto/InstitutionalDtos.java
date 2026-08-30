package com.skillintel.platform.dto;

import java.util.List;

public class InstitutionalDtos {

    public static class InstitutionDashboardDto {
        private Long institutionId;
        private String institutionName;
        private int totalStudents;
        private int assessedStudents;
        private int placementReadyStudents;
        private int internshipStudents;
        private int placedStudents;

        public InstitutionDashboardDto() {}
        public InstitutionDashboardDto(Long institutionId, String institutionName, int totalStudents, int assessedStudents, int placementReadyStudents, int internshipStudents, int placedStudents) {
            this.institutionId = institutionId;
            this.institutionName = institutionName;
            this.totalStudents = totalStudents;
            this.assessedStudents = assessedStudents;
            this.placementReadyStudents = placementReadyStudents;
            this.internshipStudents = internshipStudents;
            this.placedStudents = placedStudents;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long institutionId;
            private String institutionName;
            private int totalStudents;
            private int assessedStudents;
            private int placementReadyStudents;
            private int internshipStudents;
            private int placedStudents;

            public Builder institutionId(Long institutionId) { this.institutionId = institutionId; return this; }
            public Builder institutionName(String institutionName) { this.institutionName = institutionName; return this; }
            public Builder totalStudents(int totalStudents) { this.totalStudents = totalStudents; return this; }
            public Builder assessedStudents(int assessedStudents) { this.assessedStudents = assessedStudents; return this; }
            public Builder placementReadyStudents(int placementReadyStudents) { this.placementReadyStudents = placementReadyStudents; return this; }
            public Builder internshipStudents(int internshipStudents) { this.internshipStudents = internshipStudents; return this; }
            public Builder placedStudents(int placedStudents) { this.placedStudents = placedStudents; return this; }

            public InstitutionDashboardDto build() {
                return new InstitutionDashboardDto(institutionId, institutionName, totalStudents, assessedStudents, placementReadyStudents, internshipStudents, placedStudents);
            }
        }

        public Long getInstitutionId() { return institutionId; }
        public void setInstitutionId(Long institutionId) { this.institutionId = institutionId; }
        public String getInstitutionName() { return institutionName; }
        public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
        public int getTotalStudents() { return totalStudents; }
        public void setTotalStudents(int totalStudents) { this.totalStudents = totalStudents; }
        public int getAssessedStudents() { return assessedStudents; }
        public void setAssessedStudents(int assessedStudents) { this.assessedStudents = assessedStudents; }
        public int getPlacementReadyStudents() { return placementReadyStudents; }
        public void setPlacementReadyStudents(int placementReadyStudents) { this.placementReadyStudents = placementReadyStudents; }
        public int getInternshipStudents() { return internshipStudents; }
        public void setInternshipStudents(int internshipStudents) { this.internshipStudents = internshipStudents; }
        public int getPlacedStudents() { return placedStudents; }
        public void setPlacedStudents(int placedStudents) { this.placedStudents = placedStudents; }
    }

    public static class SkillGapAnalyticsItemDto {
        private String skillName;
        private String category;
        private int gapPercentage;
        private int avgStudentScore;
        private int requiredBenchmark;

        public SkillGapAnalyticsItemDto() {}
        public SkillGapAnalyticsItemDto(String skillName, String category, int gapPercentage, int avgStudentScore, int requiredBenchmark) {
            this.skillName = skillName;
            this.category = category;
            this.gapPercentage = gapPercentage;
            this.avgStudentScore = avgStudentScore;
            this.requiredBenchmark = requiredBenchmark;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String skillName;
            private String category;
            private int gapPercentage;
            private int avgStudentScore;
            private int requiredBenchmark;

            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder gapPercentage(int gapPercentage) { this.gapPercentage = gapPercentage; return this; }
            public Builder avgStudentScore(int avgStudentScore) { this.avgStudentScore = avgStudentScore; return this; }
            public Builder requiredBenchmark(int requiredBenchmark) { this.requiredBenchmark = requiredBenchmark; return this; }

            public SkillGapAnalyticsItemDto build() {
                return new SkillGapAnalyticsItemDto(skillName, category, gapPercentage, avgStudentScore, requiredBenchmark);
            }
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public int getGapPercentage() { return gapPercentage; }
        public void setGapPercentage(int gapPercentage) { this.gapPercentage = gapPercentage; }
        public int getAvgStudentScore() { return avgStudentScore; }
        public void setAvgStudentScore(int avgStudentScore) { this.avgStudentScore = avgStudentScore; }
        public int getRequiredBenchmark() { return requiredBenchmark; }
        public void setRequiredBenchmark(int requiredBenchmark) { this.requiredBenchmark = requiredBenchmark; }
    }

    public static class IndustryDemandItemDto {
        private String skillName;
        private String category;
        private int demandCount;
        private int demandPercentage;
        private String trendIndicator; // UP, STABLE, DOWN

        public IndustryDemandItemDto() {}
        public IndustryDemandItemDto(String skillName, String category, int demandCount, int demandPercentage, String trendIndicator) {
            this.skillName = skillName;
            this.category = category;
            this.demandCount = demandCount;
            this.demandPercentage = demandPercentage;
            this.trendIndicator = trendIndicator;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String skillName;
            private String category;
            private int demandCount;
            private int demandPercentage;
            private String trendIndicator;

            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder demandCount(int demandCount) { this.demandCount = demandCount; return this; }
            public Builder demandPercentage(int demandPercentage) { this.demandPercentage = demandPercentage; return this; }
            public Builder trendIndicator(String trendIndicator) { this.trendIndicator = trendIndicator; return this; }

            public IndustryDemandItemDto build() {
                return new IndustryDemandItemDto(skillName, category, demandCount, demandPercentage, trendIndicator);
            }
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public int getDemandCount() { return demandCount; }
        public void setDemandCount(int demandCount) { this.demandCount = demandCount; }
        public int getDemandPercentage() { return demandPercentage; }
        public void setDemandPercentage(int demandPercentage) { this.demandPercentage = demandPercentage; }
        public String getTrendIndicator() { return trendIndicator; }
        public void setTrendIndicator(String trendIndicator) { this.trendIndicator = trendIndicator; }
    }

    public static class GapDemandMatrixItemDto {
        private String skillName;
        private String industryDemandLevel; // VERY_HIGH, HIGH, MEDIUM
        private String studentProficiencyLevel; // LOW, MEDIUM, HIGH
        private String gapLevel; // HIGH, MEDIUM, LOW
        private String recommendedAction; // URGENT, IMPROVE, MAINTAIN

        public GapDemandMatrixItemDto() {}
        public GapDemandMatrixItemDto(String skillName, String industryDemandLevel, String studentProficiencyLevel, String gapLevel, String recommendedAction) {
            this.skillName = skillName;
            this.industryDemandLevel = industryDemandLevel;
            this.studentProficiencyLevel = studentProficiencyLevel;
            this.gapLevel = gapLevel;
            this.recommendedAction = recommendedAction;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String skillName;
            private String industryDemandLevel;
            private String studentProficiencyLevel;
            private String gapLevel;
            private String recommendedAction;

            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder industryDemandLevel(String industryDemandLevel) { this.industryDemandLevel = industryDemandLevel; return this; }
            public Builder studentProficiencyLevel(String studentProficiencyLevel) { this.studentProficiencyLevel = studentProficiencyLevel; return this; }
            public Builder gapLevel(String gapLevel) { this.gapLevel = gapLevel; return this; }
            public Builder recommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; return this; }

            public GapDemandMatrixItemDto build() {
                return new GapDemandMatrixItemDto(skillName, industryDemandLevel, studentProficiencyLevel, gapLevel, recommendedAction);
            }
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getIndustryDemandLevel() { return industryDemandLevel; }
        public void setIndustryDemandLevel(String industryDemandLevel) { this.industryDemandLevel = industryDemandLevel; }
        public String getStudentProficiencyLevel() { return studentProficiencyLevel; }
        public void setStudentProficiencyLevel(String studentProficiencyLevel) { this.studentProficiencyLevel = studentProficiencyLevel; }
        public String getGapLevel() { return gapLevel; }
        public void setGapLevel(String gapLevel) { this.gapLevel = gapLevel; }
        public String getRecommendedAction() { return recommendedAction; }
        public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }
    }

    public static class DepartmentComparisonDto {
        private String departmentName;
        private int avgSkillScore;
        private int placementReadinessPercentage;
        private int assessmentParticipationPercentage;
        private int internshipParticipationPercentage;
        private String topSkillGap;

        public DepartmentComparisonDto() {}
        public DepartmentComparisonDto(String departmentName, int avgSkillScore, int placementReadinessPercentage, int assessmentParticipationPercentage, int internshipParticipationPercentage, String topSkillGap) {
            this.departmentName = departmentName;
            this.avgSkillScore = avgSkillScore;
            this.placementReadinessPercentage = placementReadinessPercentage;
            this.assessmentParticipationPercentage = assessmentParticipationPercentage;
            this.internshipParticipationPercentage = internshipParticipationPercentage;
            this.topSkillGap = topSkillGap;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String departmentName;
            private int avgSkillScore;
            private int placementReadinessPercentage;
            private int assessmentParticipationPercentage;
            private int internshipParticipationPercentage;
            private String topSkillGap;

            public Builder departmentName(String departmentName) { this.departmentName = departmentName; return this; }
            public Builder avgSkillScore(int avgSkillScore) { this.avgSkillScore = avgSkillScore; return this; }
            public Builder placementReadinessPercentage(int placementReadinessPercentage) { this.placementReadinessPercentage = placementReadinessPercentage; return this; }
            public Builder assessmentParticipationPercentage(int assessmentParticipationPercentage) { this.assessmentParticipationPercentage = assessmentParticipationPercentage; return this; }
            public Builder internshipParticipationPercentage(int internshipParticipationPercentage) { this.internshipParticipationPercentage = internshipParticipationPercentage; return this; }
            public Builder topSkillGap(String topSkillGap) { this.topSkillGap = topSkillGap; return this; }

            public DepartmentComparisonDto build() {
                return new DepartmentComparisonDto(departmentName, avgSkillScore, placementReadinessPercentage, assessmentParticipationPercentage, internshipParticipationPercentage, topSkillGap);
            }
        }

        public String getDepartmentName() { return departmentName; }
        public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
        public int getAvgSkillScore() { return avgSkillScore; }
        public void setAvgSkillScore(int avgSkillScore) { this.avgSkillScore = avgSkillScore; }
        public int getPlacementReadinessPercentage() { return placementReadinessPercentage; }
        public void setPlacementReadinessPercentage(int placementReadinessPercentage) { this.placementReadinessPercentage = placementReadinessPercentage; }
        public int getAssessmentParticipationPercentage() { return assessmentParticipationPercentage; }
        public void setAssessmentParticipationPercentage(int assessmentParticipationPercentage) { this.assessmentParticipationPercentage = assessmentParticipationPercentage; }
        public int getInternshipParticipationPercentage() { return internshipParticipationPercentage; }
        public void setInternshipParticipationPercentage(int internshipParticipationPercentage) { this.internshipParticipationPercentage = internshipParticipationPercentage; }
        public String getTopSkillGap() { return topSkillGap; }
        public void setTopSkillGap(String topSkillGap) { this.topSkillGap = topSkillGap; }
    }

    public static class PlacementFunnelAnalyticsDto {
        private int eligibleCount;
        private int appliedCount;
        private int shortlistedCount;
        private int interviewedCount;
        private int selectedCount;
        private int applicationRate;
        private int shortlistRate;
        private int selectionRate;
        private int placementReadinessRate;

        public PlacementFunnelAnalyticsDto() {}
        public PlacementFunnelAnalyticsDto(int eligibleCount, int appliedCount, int shortlistedCount, int interviewedCount, int selectedCount, int applicationRate, int shortlistRate, int selectionRate, int placementReadinessRate) {
            this.eligibleCount = eligibleCount;
            this.appliedCount = appliedCount;
            this.shortlistedCount = shortlistedCount;
            this.interviewedCount = interviewedCount;
            this.selectedCount = selectedCount;
            this.applicationRate = applicationRate;
            this.shortlistRate = shortlistRate;
            this.selectionRate = selectionRate;
            this.placementReadinessRate = placementReadinessRate;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private int eligibleCount;
            private int appliedCount;
            private int shortlistedCount;
            private int interviewedCount;
            private int selectedCount;
            private int applicationRate;
            private int shortlistRate;
            private int selectionRate;
            private int placementReadinessRate;

            public Builder eligibleCount(int eligibleCount) { this.eligibleCount = eligibleCount; return this; }
            public Builder appliedCount(int appliedCount) { this.appliedCount = appliedCount; return this; }
            public Builder shortlistedCount(int shortlistedCount) { this.shortlistedCount = shortlistedCount; return this; }
            public Builder interviewedCount(int interviewedCount) { this.interviewedCount = interviewedCount; return this; }
            public Builder selectedCount(int selectedCount) { this.selectedCount = selectedCount; return this; }
            public Builder applicationRate(int applicationRate) { this.applicationRate = applicationRate; return this; }
            public Builder shortlistRate(int shortlistRate) { this.shortlistRate = shortlistRate; return this; }
            public Builder selectionRate(int selectionRate) { this.selectionRate = selectionRate; return this; }
            public Builder placementReadinessRate(int placementReadinessRate) { this.placementReadinessRate = placementReadinessRate; return this; }

            public PlacementFunnelAnalyticsDto build() {
                return new PlacementFunnelAnalyticsDto(eligibleCount, appliedCount, shortlistedCount, interviewedCount, selectedCount, applicationRate, shortlistRate, selectionRate, placementReadinessRate);
            }
        }

        public int getEligibleCount() { return eligibleCount; }
        public void setEligibleCount(int eligibleCount) { this.eligibleCount = eligibleCount; }
        public int getAppliedCount() { return appliedCount; }
        public void setAppliedCount(int appliedCount) { this.appliedCount = appliedCount; }
        public int getShortlistedCount() { return shortlistedCount; }
        public void setShortlistedCount(int shortlistedCount) { this.shortlistedCount = shortlistedCount; }
        public int getInterviewedCount() { return interviewedCount; }
        public void setInterviewedCount(int interviewedCount) { this.interviewedCount = interviewedCount; }
        public int getSelectedCount() { return selectedCount; }
        public void setSelectedCount(int selectedCount) { this.selectedCount = selectedCount; }
        public int getApplicationRate() { return applicationRate; }
        public void setApplicationRate(int applicationRate) { this.applicationRate = applicationRate; }
        public int getShortlistRate() { return shortlistRate; }
        public void setShortlistRate(int shortlistRate) { this.shortlistRate = shortlistRate; }
        public int getSelectionRate() { return selectionRate; }
        public void setSelectionRate(int selectionRate) { this.selectionRate = selectionRate; }
        public int getPlacementReadinessRate() { return placementReadinessRate; }
        public void setPlacementReadinessRate(int placementReadinessRate) { this.placementReadinessRate = placementReadinessRate; }
    }

    public static class CurriculumInsightDto {
        private String skillName;
        private String demandLevel;
        private String studentProficiency;
        private String actionType; // WORKSHOP, ELECTIVE, FDP, CERTIFICATION
        private String recommendation;

        public CurriculumInsightDto() {}
        public CurriculumInsightDto(String skillName, String demandLevel, String studentProficiency, String actionType, String recommendation) {
            this.skillName = skillName;
            this.demandLevel = demandLevel;
            this.studentProficiency = studentProficiency;
            this.actionType = actionType;
            this.recommendation = recommendation;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String skillName;
            private String demandLevel;
            private String studentProficiency;
            private String actionType;
            private String recommendation;

            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder demandLevel(String demandLevel) { this.demandLevel = demandLevel; return this; }
            public Builder studentProficiency(String studentProficiency) { this.studentProficiency = studentProficiency; return this; }
            public Builder actionType(String actionType) { this.actionType = actionType; return this; }
            public Builder recommendation(String recommendation) { this.recommendation = recommendation; return this; }

            public CurriculumInsightDto build() {
                return new CurriculumInsightDto(skillName, demandLevel, studentProficiency, actionType, recommendation);
            }
        }

        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getDemandLevel() { return demandLevel; }
        public void setDemandLevel(String demandLevel) { this.demandLevel = demandLevel; }
        public String getStudentProficiency() { return studentProficiency; }
        public void setStudentProficiency(String studentProficiency) { this.studentProficiency = studentProficiency; }
        public String getActionType() { return actionType; }
        public void setActionType(String actionType) { this.actionType = actionType; }
        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
    }
}
