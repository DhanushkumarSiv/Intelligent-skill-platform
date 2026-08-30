package com.skillintel.platform.service;

import com.skillintel.platform.dto.GitHubDtos.GitHubAnalyzeResultDto;

public interface GitHubAnalyzer {
    GitHubAnalyzeResultDto analyzeRepository(String repositoryUrl, Long studentProfileId);
}
