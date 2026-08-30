package com.skillintel.platform.dto;

import java.util.List;
import java.util.Map;

public class GitHubDtos {

    public static class GitHubAnalyzeRequest {
        private String repositoryUrl;
        private Long studentProfileId;

        public GitHubAnalyzeRequest() {}
        public GitHubAnalyzeRequest(String repositoryUrl, Long studentProfileId) {
            this.repositoryUrl = repositoryUrl;
            this.studentProfileId = studentProfileId;
        }

        public String getRepositoryUrl() { return repositoryUrl; }
        public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }
        public Long getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
    }

    public static class GitHubAnalyzeResultDto {
        private String repoName;
        private String owner;
        private Integer commitCount;
        private Double contributorRatio;
        private List<String> detectedLanguages;
        private List<DependencyEvidenceDto> dependencies;
        private List<AstEvidenceDto> astFindings;
        private Map<String, Integer> skillScores;
        private String summaryText;

        public GitHubAnalyzeResultDto() {}
        public GitHubAnalyzeResultDto(String repoName, String owner, Integer commitCount, Double contributorRatio, List<String> detectedLanguages, List<DependencyEvidenceDto> dependencies, List<AstEvidenceDto> astFindings, Map<String, Integer> skillScores, String summaryText) {
            this.repoName = repoName;
            this.owner = owner;
            this.commitCount = commitCount;
            this.contributorRatio = contributorRatio;
            this.detectedLanguages = detectedLanguages;
            this.dependencies = dependencies;
            this.astFindings = astFindings;
            this.skillScores = skillScores;
            this.summaryText = summaryText;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String repoName;
            private String owner;
            private Integer commitCount;
            private Double contributorRatio;
            private List<String> detectedLanguages;
            private List<DependencyEvidenceDto> dependencies;
            private List<AstEvidenceDto> astFindings;
            private Map<String, Integer> skillScores;
            private String summaryText;

            public Builder repoName(String repoName) { this.repoName = repoName; return this; }
            public Builder owner(String owner) { this.owner = owner; return this; }
            public Builder commitCount(Integer commitCount) { this.commitCount = commitCount; return this; }
            public Builder contributorRatio(Double contributorRatio) { this.contributorRatio = contributorRatio; return this; }
            public Builder detectedLanguages(List<String> detectedLanguages) { this.detectedLanguages = detectedLanguages; return this; }
            public Builder dependencies(List<DependencyEvidenceDto> dependencies) { this.dependencies = dependencies; return this; }
            public Builder astFindings(List<AstEvidenceDto> astFindings) { this.astFindings = astFindings; return this; }
            public Builder skillScores(Map<String, Integer> skillScores) { this.skillScores = skillScores; return this; }
            public Builder summaryText(String summaryText) { this.summaryText = summaryText; return this; }

            public GitHubAnalyzeResultDto build() {
                return new GitHubAnalyzeResultDto(repoName, owner, commitCount, contributorRatio, detectedLanguages, dependencies, astFindings, skillScores, summaryText);
            }
        }

        public String getRepoName() { return repoName; }
        public void setRepoName(String repoName) { this.repoName = repoName; }
        public String getOwner() { return owner; }
        public void setOwner(String owner) { this.owner = owner; }
        public Integer getCommitCount() { return commitCount; }
        public void setCommitCount(Integer commitCount) { this.commitCount = commitCount; }
        public Double getContributorRatio() { return contributorRatio; }
        public void setContributorRatio(Double contributorRatio) { this.contributorRatio = contributorRatio; }
        public List<String> getDetectedLanguages() { return detectedLanguages; }
        public void setDetectedLanguages(List<String> detectedLanguages) { this.detectedLanguages = detectedLanguages; }
        public List<DependencyEvidenceDto> getDependencies() { return dependencies; }
        public void setDependencies(List<DependencyEvidenceDto> dependencies) { this.dependencies = dependencies; }
        public List<AstEvidenceDto> getAstFindings() { return astFindings; }
        public void setAstFindings(List<AstEvidenceDto> astFindings) { this.astFindings = astFindings; }
        public Map<String, Integer> getSkillScores() { return skillScores; }
        public void setSkillScores(Map<String, Integer> skillScores) { this.skillScores = skillScores; }
        public String getSummaryText() { return summaryText; }
        public void setSummaryText(String summaryText) { this.summaryText = summaryText; }
    }

    public static class DependencyEvidenceDto {
        private String dependencyName;
        private String mappedSkill;
        private Integer baseScore;

        public DependencyEvidenceDto() {}
        public DependencyEvidenceDto(String dependencyName, String mappedSkill, Integer baseScore) {
            this.dependencyName = dependencyName;
            this.mappedSkill = mappedSkill;
            this.baseScore = baseScore;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String dependencyName;
            private String mappedSkill;
            private Integer baseScore;

            public Builder dependencyName(String dependencyName) { this.dependencyName = dependencyName; return this; }
            public Builder mappedSkill(String mappedSkill) { this.mappedSkill = mappedSkill; return this; }
            public Builder baseScore(Integer baseScore) { this.baseScore = baseScore; return this; }

            public DependencyEvidenceDto build() {
                return new DependencyEvidenceDto(dependencyName, mappedSkill, baseScore);
            }
        }

        public String getDependencyName() { return dependencyName; }
        public void setDependencyName(String dependencyName) { this.dependencyName = dependencyName; }
        public String getMappedSkill() { return mappedSkill; }
        public void setMappedSkill(String mappedSkill) { this.mappedSkill = mappedSkill; }
        public Integer getBaseScore() { return baseScore; }
        public void setBaseScore(Integer baseScore) { this.baseScore = baseScore; }
    }

    public static class AstEvidenceDto {
        private String filePath;
        private String annotationOrConstruct;
        private String mappedSkill;
        private Integer codeDepthLevel;
        private String detail;

        public AstEvidenceDto() {}
        public AstEvidenceDto(String filePath, String annotationOrConstruct, String mappedSkill, Integer codeDepthLevel, String detail) {
            this.filePath = filePath;
            this.annotationOrConstruct = annotationOrConstruct;
            this.mappedSkill = mappedSkill;
            this.codeDepthLevel = codeDepthLevel;
            this.detail = detail;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private String filePath;
            private String annotationOrConstruct;
            private String mappedSkill;
            private Integer codeDepthLevel;
            private String detail;

            public Builder filePath(String filePath) { this.filePath = filePath; return this; }
            public Builder annotationOrConstruct(String annotationOrConstruct) { this.annotationOrConstruct = annotationOrConstruct; return this; }
            public Builder mappedSkill(String mappedSkill) { this.mappedSkill = mappedSkill; return this; }
            public Builder codeDepthLevel(Integer codeDepthLevel) { this.codeDepthLevel = codeDepthLevel; return this; }
            public Builder detail(String detail) { this.detail = detail; return this; }

            public AstEvidenceDto build() {
                return new AstEvidenceDto(filePath, annotationOrConstruct, mappedSkill, codeDepthLevel, detail);
            }
        }

        public String getFilePath() { return filePath; }
        public void setFilePath(String filePath) { this.filePath = filePath; }
        public String getAnnotationOrConstruct() { return annotationOrConstruct; }
        public void setAnnotationOrConstruct(String annotationOrConstruct) { this.annotationOrConstruct = annotationOrConstruct; }
        public String getMappedSkill() { return mappedSkill; }
        public void setMappedSkill(String mappedSkill) { this.mappedSkill = mappedSkill; }
        public Integer getCodeDepthLevel() { return codeDepthLevel; }
        public void setCodeDepthLevel(Integer codeDepthLevel) { this.codeDepthLevel = codeDepthLevel; }
        public String getDetail() { return detail; }
        public void setDetail(String detail) { this.detail = detail; }
    }
}
