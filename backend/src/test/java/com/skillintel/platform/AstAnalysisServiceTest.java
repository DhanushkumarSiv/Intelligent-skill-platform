package com.skillintel.platform;

import com.skillintel.platform.dto.GitHubDtos.AstEvidenceDto;
import com.skillintel.platform.service.AstAnalysisService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class AstAnalysisServiceTest {

    private AstAnalysisService astAnalysisService;

    @BeforeEach
    void setUp() {
        astAnalysisService = new AstAnalysisService();
    }

    @Test
    void testAstAnalysisDetectsSpringAnnotations() {
        String code = """
            package com.example;
            import org.springframework.web.bind.annotation.RestController;
            import org.springframework.stereotype.Service;
            import org.springframework.data.jpa.repository.JpaRepository;
            
            @RestController
            class TestController {}
            
            @Service
            class TestService {}
            
            interface TestRepo extends JpaRepository<Object, Long> {}
            """;

        List<AstEvidenceDto> findings = astAnalysisService.analyzeJavaCode("Test.java", code);

        assertNotNull(findings);
        assertTrue(findings.stream().anyMatch(f -> "@RestController".equals(f.getAnnotationOrConstruct())));
        assertTrue(findings.stream().anyMatch(f -> "@Service".equals(f.getAnnotationOrConstruct())));
        assertTrue(findings.stream().anyMatch(f -> "JpaRepository".equals(f.getAnnotationOrConstruct())));

        Map<String, Integer> depthScores = astAnalysisService.calculateDepthScores(findings);
        assertTrue(depthScores.containsKey("REST API"));
        assertTrue(depthScores.get("REST API") >= 30);
    }
}
