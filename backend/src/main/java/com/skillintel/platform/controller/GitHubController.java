package com.skillintel.platform.controller;

import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.dto.GitHubDtos.*;
import com.skillintel.platform.repository.SkillRepository;
import com.skillintel.platform.service.EvidenceEngineService;
import com.skillintel.platform.service.GitHubAnalyzer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubAnalyzer gitHubAnalyzer;
    private final EvidenceEngineService evidenceEngineService;
    private final SkillRepository skillRepository;

    public GitHubController(GitHubAnalyzer gitHubAnalyzer,
                            EvidenceEngineService evidenceEngineService,
                            SkillRepository skillRepository) {
        this.gitHubAnalyzer = gitHubAnalyzer;
        this.evidenceEngineService = evidenceEngineService;
        this.skillRepository = skillRepository;
    }

    @PostMapping("/analyze")
    public ResponseEntity<GitHubAnalyzeResultDto> analyzeRepository(@RequestBody GitHubAnalyzeRequest request) {
        Long studentProfileId = request.getStudentProfileId() != null ? request.getStudentProfileId() : 1L;
        GitHubAnalyzeResultDto result = gitHubAnalyzer.analyzeRepository(request.getRepositoryUrl(), studentProfileId);

        for (Map.Entry<String, Integer> entry : result.getSkillScores().entrySet()) {
            String skillName = entry.getKey();
            Integer score = entry.getValue();

            Skill skill = skillRepository.findByNameIgnoreCase(skillName).orElse(null);
            if (skill != null) {
                String details = "GitHub Repository (" + result.getRepoName() + ") AST Code Analysis & Dependency Scan. Score: "
                        + score + "/100. Author ratio: " + (int)(result.getContributorRatio() * 100) + "%.";
                evidenceEngineService.recordGitHubEvidence(studentProfileId, skill.getId(), score, details);
            }
        }

        return ResponseEntity.ok(result);
    }
}
