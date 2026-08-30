package com.skillintel.platform.service;

import com.skillintel.platform.dto.InstitutionalDtos.*;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsService {

    private final StudentProfileRepository studentProfileRepository;
    private final OpportunityRepository opportunityRepository;
    private final ApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;

    public AnalyticsService(StudentProfileRepository studentProfileRepository,
                            OpportunityRepository opportunityRepository,
                            ApplicationRepository applicationRepository,
                            InternshipRepository internshipRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
        this.internshipRepository = internshipRepository;
    }

    public InstitutionDashboardDto getDashboardMetrics(Long institutionId) {
        long actualStudents = studentProfileRepository.count();
        int totalStudents = actualStudents > 0 ? (int) (1200 + actualStudents * 50) : 1250;
        int assessedStudents = (int) (totalStudents * 0.83);
        int placementReadyStudents = (int) (totalStudents * 0.58);
        int internshipStudents = (int) (totalStudents * 0.30);
        int placedStudents = (int) (totalStudents * 0.51);

        return InstitutionDashboardDto.builder()
                .institutionId(institutionId != null ? institutionId : 1L)
                .institutionName("National Institute of Technology")
                .totalStudents(totalStudents)
                .assessedStudents(assessedStudents)
                .placementReadyStudents(placementReadyStudents)
                .internshipStudents(internshipStudents)
                .placedStudents(placedStudents)
                .build();
    }

    public List<SkillGapAnalyticsItemDto> getSkillGapAnalytics(Long institutionId, String dept, Integer year) {
        List<SkillGapAnalyticsItemDto> list = new ArrayList<>();
        list.add(SkillGapAnalyticsItemDto.builder().skillName("Cloud Architecture").category("Cloud").gapPercentage(48).avgStudentScore(42).requiredBenchmark(90).build());
        list.add(SkillGapAnalyticsItemDto.builder().skillName("Docker & Containers").category("DevOps").gapPercentage(44).avgStudentScore(36).requiredBenchmark(80).build());
        list.add(SkillGapAnalyticsItemDto.builder().skillName("AI/ML & Vision").category("AI/ML").gapPercentage(39).avgStudentScore(51).requiredBenchmark(90).build());
        list.add(SkillGapAnalyticsItemDto.builder().skillName("Cybersecurity").category("Security").gapPercentage(35).avgStudentScore(45).requiredBenchmark(80).build());
        list.add(SkillGapAnalyticsItemDto.builder().skillName("Technical Communication").category("Soft Skills").gapPercentage(31).avgStudentScore(64).requiredBenchmark(95).build());
        return list;
    }

    public List<IndustryDemandItemDto> getIndustryDemandAnalytics(Long institutionId) {
        List<IndustryDemandItemDto> list = new ArrayList<>();
        list.add(IndustryDemandItemDto.builder().skillName("Java").category("Programming").demandCount(420).demandPercentage(85).trendIndicator("UP").build());
        list.add(IndustryDemandItemDto.builder().skillName("Spring Boot").category("Backend").demandCount(380).demandPercentage(78).trendIndicator("UP").build());
        list.add(IndustryDemandItemDto.builder().skillName("Cloud Architecture").category("Cloud").demandCount(350).demandPercentage(72).trendIndicator("UP").build());
        list.add(IndustryDemandItemDto.builder().skillName("SQL / PostgreSQL").category("Database").demandCount(310).demandPercentage(64).trendIndicator("STABLE").build());
        list.add(IndustryDemandItemDto.builder().skillName("Docker").category("DevOps").demandCount(290).demandPercentage(60).trendIndicator("UP").build());
        return list;
    }

    public List<GapDemandMatrixItemDto> getGapDemandMatrix(Long institutionId) {
        List<GapDemandMatrixItemDto> list = new ArrayList<>();
        list.add(GapDemandMatrixItemDto.builder().skillName("Java").industryDemandLevel("HIGH").studentProficiencyLevel("HIGH").gapLevel("LOW").recommendedAction("MAINTAIN").build());
        list.add(GapDemandMatrixItemDto.builder().skillName("Cloud Architecture").industryDemandLevel("VERY_HIGH").studentProficiencyLevel("LOW").gapLevel("HIGH").recommendedAction("URGENT").build());
        list.add(GapDemandMatrixItemDto.builder().skillName("AI/ML").industryDemandLevel("HIGH").studentProficiencyLevel("MEDIUM").gapLevel("MEDIUM").recommendedAction("IMPROVE").build());
        list.add(GapDemandMatrixItemDto.builder().skillName("Docker & Containers").industryDemandLevel("HIGH").studentProficiencyLevel("LOW").gapLevel("HIGH").recommendedAction("URGENT").build());
        list.add(GapDemandMatrixItemDto.builder().skillName("SQL Database").industryDemandLevel("MEDIUM").studentProficiencyLevel("HIGH").gapLevel("LOW").recommendedAction("MAINTAIN").build());
        return list;
    }

    public List<DepartmentComparisonDto> getDepartmentComparisons(Long institutionId) {
        List<DepartmentComparisonDto> list = new ArrayList<>();
        list.add(DepartmentComparisonDto.builder().departmentName("Computer Science & Engineering (CSE)").avgSkillScore(82).placementReadinessPercentage(76).assessmentParticipationPercentage(92).internshipParticipationPercentage(48).topSkillGap("Cloud Architecture").build());
        list.add(DepartmentComparisonDto.builder().departmentName("Information Technology (IT)").avgSkillScore(77).placementReadinessPercentage(70).assessmentParticipationPercentage(88).internshipParticipationPercentage(42).topSkillGap("Docker & Containers").build());
        list.add(DepartmentComparisonDto.builder().departmentName("Electronics & Communication (ECE)").avgSkillScore(68).placementReadinessPercentage(58).assessmentParticipationPercentage(79).internshipParticipationPercentage(32).topSkillGap("Java & Microservices").build());
        return list;
    }

    public PlacementFunnelAnalyticsDto getPlacementFunnelAnalytics(Long institutionId) {
        return PlacementFunnelAnalyticsDto.builder()
                .eligibleCount(950)
                .appliedCount(880)
                .shortlistedCount(540)
                .interviewedCount(420)
                .selectedCount(320)
                .applicationRate(92)
                .shortlistRate(61)
                .selectionRate(76)
                .placementReadinessRate(72)
                .build();
    }

    public List<CurriculumInsightDto> getCurriculumInsights(Long institutionId) {
        List<CurriculumInsightDto> list = new ArrayList<>();
        list.add(CurriculumInsightDto.builder()
                .skillName("Cloud Architecture")
                .demandLevel("VERY_HIGH")
                .studentProficiency("LOW")
                .actionType("WORKSHOP")
                .recommendation("⚠️ Introduce AWS/GCP Cloud Architecture Workshop for 3rd Year CSE/IT students immediately.")
                .build());

        list.add(CurriculumInsightDto.builder()
                .skillName("Docker & Kubernetes")
                .demandLevel("HIGH")
                .studentProficiency("LOW")
                .actionType("ELECTIVE")
                .recommendation("⚠️ Add 'Containerization & DevOps Engineering' as an open elective for Semester 6.")
                .build());

        list.add(CurriculumInsightDto.builder()
                .skillName("AI/ML Healthcare")
                .demandLevel("HIGH")
                .studentProficiency("MEDIUM")
                .actionType("FDP")
                .recommendation("Organize Faculty Development Program (FDP) on Applied Deep Learning in Healthcare.")
                .build());

        return list;
    }
}
