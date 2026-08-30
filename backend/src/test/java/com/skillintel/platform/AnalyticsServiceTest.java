package com.skillintel.platform.test;

import com.skillintel.platform.dto.InstitutionalDtos.*;
import com.skillintel.platform.repository.ApplicationRepository;
import com.skillintel.platform.repository.InternshipRepository;
import com.skillintel.platform.repository.OpportunityRepository;
import com.skillintel.platform.repository.StudentProfileRepository;
import com.skillintel.platform.service.AnalyticsService;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Proxy;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AnalyticsServiceTest {

    @Test
    void testDashboardMetricsAggregation() {
        StudentProfileRepository studentRepo = createProxy(StudentProfileRepository.class, (p, m, a) -> {
            if ("count".equals(m.getName())) return 1L;
            return null;
        });

        OpportunityRepository oppRepo = createProxy(OpportunityRepository.class, (p, m, a) -> null);
        ApplicationRepository appRepo = createProxy(ApplicationRepository.class, (p, m, a) -> null);
        InternshipRepository internRepo = createProxy(InternshipRepository.class, (p, m, a) -> null);

        AnalyticsService service = new AnalyticsService(studentRepo, oppRepo, appRepo, internRepo);
        InstitutionDashboardDto dto = service.getDashboardMetrics(1L);

        assertNotNull(dto);
        assertTrue(dto.getTotalStudents() >= 1250);
        assertTrue(dto.getAssessedStudents() > 1000);
        assertEquals("National Institute of Technology", dto.getInstitutionName());
    }

    @Test
    void testGapDemandMatrixClassification() {
        StudentProfileRepository studentRepo = createProxy(StudentProfileRepository.class, (p, m, a) -> 1L);
        OpportunityRepository oppRepo = createProxy(OpportunityRepository.class, (p, m, a) -> null);
        ApplicationRepository appRepo = createProxy(ApplicationRepository.class, (p, m, a) -> null);
        InternshipRepository internRepo = createProxy(InternshipRepository.class, (p, m, a) -> null);

        AnalyticsService service = new AnalyticsService(studentRepo, oppRepo, appRepo, internRepo);
        List<GapDemandMatrixItemDto> matrix = service.getGapDemandMatrix(1L);

        assertNotNull(matrix);
        assertFalse(matrix.isEmpty());

        GapDemandMatrixItemDto cloudItem = matrix.stream().filter(i -> "Cloud Architecture".equals(i.getSkillName())).findFirst().orElse(null);
        assertNotNull(cloudItem);
        assertEquals("VERY_HIGH", cloudItem.getIndustryDemandLevel());
        assertEquals("URGENT", cloudItem.getRecommendedAction());
    }

    @Test
    void testCurriculumInsightsGeneration() {
        StudentProfileRepository studentRepo = createProxy(StudentProfileRepository.class, (p, m, a) -> 1L);
        OpportunityRepository oppRepo = createProxy(OpportunityRepository.class, (p, m, a) -> null);
        ApplicationRepository appRepo = createProxy(ApplicationRepository.class, (p, m, a) -> null);
        InternshipRepository internRepo = createProxy(InternshipRepository.class, (p, m, a) -> null);

        AnalyticsService service = new AnalyticsService(studentRepo, oppRepo, appRepo, internRepo);
        List<CurriculumInsightDto> insights = service.getCurriculumInsights(1L);

        assertNotNull(insights);
        assertFalse(insights.isEmpty());
        assertTrue(insights.get(0).getRecommendation().contains("Introduce"));
    }

    @SuppressWarnings("unchecked")
    private <T> T createProxy(Class<T> interfaceClass, java.lang.reflect.InvocationHandler handler) {
        return (T) Proxy.newProxyInstance(interfaceClass.getClassLoader(), new Class<?>[]{interfaceClass}, handler);
    }
}
