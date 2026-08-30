package com.skillintel.platform.controller;

import com.skillintel.platform.dto.InstitutionalDtos.*;
import com.skillintel.platform.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
public class InstitutionalAnalyticsController {

    private final AnalyticsService analyticsService;

    public InstitutionalAnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/{id}/dashboard")
    public ResponseEntity<InstitutionDashboardDto> getDashboard(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getDashboardMetrics(id));
    }

    @GetMapping("/{id}/skill-gaps")
    public ResponseEntity<List<SkillGapAnalyticsItemDto>> getSkillGaps(
            @PathVariable Long id,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer year) {
        return ResponseEntity.ok(analyticsService.getSkillGapAnalytics(id, department, year));
    }

    @GetMapping("/{id}/industry-demand")
    public ResponseEntity<List<IndustryDemandItemDto>> getIndustryDemand(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getIndustryDemandAnalytics(id));
    }

    @GetMapping("/{id}/gap-demand-matrix")
    public ResponseEntity<List<GapDemandMatrixItemDto>> getGapDemandMatrix(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getGapDemandMatrix(id));
    }

    @GetMapping("/{id}/departments")
    public ResponseEntity<List<DepartmentComparisonDto>> getDepartmentComparisons(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getDepartmentComparisons(id));
    }

    @GetMapping("/{id}/placement-analytics")
    public ResponseEntity<PlacementFunnelAnalyticsDto> getPlacementAnalytics(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getPlacementFunnelAnalytics(id));
    }

    @GetMapping("/{id}/curriculum-insights")
    public ResponseEntity<List<CurriculumInsightDto>> getCurriculumInsights(@PathVariable Long id) {
        return ResponseEntity.ok(analyticsService.getCurriculumInsights(id));
    }
}
