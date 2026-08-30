package com.skillintel.platform.test;

import com.skillintel.platform.dto.GitHubDtos.GitHubAnalyzeResultDto;
import com.skillintel.platform.service.AstAnalysisService;
import com.skillintel.platform.service.DefaultGitHubAnalyzer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GitHubAnalyzerTest {

    private DefaultGitHubAnalyzer gitHubAnalyzer;

    @BeforeEach
    void setUp() {
        gitHubAnalyzer = new DefaultGitHubAnalyzer(new AstAnalysisService());
    }

    @Test
    void testGitHubAnalysisMultiContributorScaling() {
        GitHubAnalyzeResultDto result = gitHubAnalyzer.analyzeRepository("https://github.com/alexchen/spring-boot-api.git", 1L);

        assertNotNull(result);
        assertEquals(0.85, result.getContributorRatio());
        assertNotNull(result.getSkillScores());
        assertTrue(result.getSkillScores().containsKey("Java") || result.getSkillScores().size() > 0);
    }
}
