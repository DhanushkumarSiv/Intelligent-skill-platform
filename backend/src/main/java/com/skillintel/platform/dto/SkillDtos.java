package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.EvidenceSource;
import com.skillintel.platform.domain.enums.VerificationStatus;

import java.time.LocalDateTime;
import java.util.List;

public class SkillDtos {

    public static class SkillDto {
        private Long id;
        private String name;
        private String category;
        private String description;
        private Long parentSkillId;
        private List<String> aliases;

        public SkillDto() {}
        public SkillDto(Long id, String name, String category, String description, Long parentSkillId, List<String> aliases) {
            this.id = id;
            this.name = name;
            this.category = category;
            this.description = description;
            this.parentSkillId = parentSkillId;
            this.aliases = aliases;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private String name;
            private String category;
            private String description;
            private Long parentSkillId;
            private List<String> aliases;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder parentSkillId(Long parentSkillId) { this.parentSkillId = parentSkillId; return this; }
            public Builder aliases(List<String> aliases) { this.aliases = aliases; return this; }

            public SkillDto build() {
                return new SkillDto(id, name, category, description, parentSkillId, aliases);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Long getParentSkillId() { return parentSkillId; }
        public void setParentSkillId(Long parentSkillId) { this.parentSkillId = parentSkillId; }
        public List<String> getAliases() { return aliases; }
        public void setAliases(List<String> aliases) { this.aliases = aliases; }
    }

    public static class TargetRoleDto {
        private Long id;
        private String name;
        private String description;
        private String category;
        private List<RoleSkillDto> requiredSkills;

        public TargetRoleDto() {}
        public TargetRoleDto(Long id, String name, String description, String category, List<RoleSkillDto> requiredSkills) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.category = category;
            this.requiredSkills = requiredSkills;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private String name;
            private String description;
            private String category;
            private List<RoleSkillDto> requiredSkills;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder requiredSkills(List<RoleSkillDto> requiredSkills) { this.requiredSkills = requiredSkills; return this; }

            public TargetRoleDto build() {
                return new TargetRoleDto(id, name, description, category, requiredSkills);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public List<RoleSkillDto> getRequiredSkills() { return requiredSkills; }
        public void setRequiredSkills(List<RoleSkillDto> requiredSkills) { this.requiredSkills = requiredSkills; }
    }

    public static class RoleSkillDto {
        private Long skillId;
        private String skillName;
        private String category;
        private Integer importance;
        private Integer minimumLevel;

        public RoleSkillDto() {}
        public RoleSkillDto(Long skillId, String skillName, String category, Integer importance, Integer minimumLevel) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.category = category;
            this.importance = importance;
            this.minimumLevel = minimumLevel;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long skillId;
            private String skillName;
            private String category;
            private Integer importance;
            private Integer minimumLevel;

            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder importance(Integer importance) { this.importance = importance; return this; }
            public Builder minimumLevel(Integer minimumLevel) { this.minimumLevel = minimumLevel; return this; }

            public RoleSkillDto build() {
                return new RoleSkillDto(skillId, skillName, category, importance, minimumLevel);
            }
        }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Integer getImportance() { return importance; }
        public void setImportance(Integer importance) { this.importance = importance; }
        public Integer getMinimumLevel() { return minimumLevel; }
        public void setMinimumLevel(Integer minimumLevel) { this.minimumLevel = minimumLevel; }
    }

    public static class StudentSkillDto {
        private Long id;
        private Long skillId;
        private String skillName;
        private String category;
        private Integer selfDeclaredScore;
        private Integer assessmentScore;
        private Integer mcqAssessmentWebsiteScore;
        private Integer evidenceScore;
        private Integer verifiedScore;
        private VerificationStatus verificationStatus;
        private LocalDateTime lastVerifiedAt;
        private List<SkillEvidenceDto> evidenceList;

        public StudentSkillDto() {}
        public StudentSkillDto(Long id, Long skillId, String skillName, String category, Integer selfDeclaredScore, Integer assessmentScore, Integer mcqAssessmentWebsiteScore, Integer evidenceScore, Integer verifiedScore, VerificationStatus verificationStatus, LocalDateTime lastVerifiedAt, List<SkillEvidenceDto> evidenceList) {
            this.id = id;
            this.skillId = skillId;
            this.skillName = skillName;
            this.category = category;
            this.selfDeclaredScore = selfDeclaredScore;
            this.assessmentScore = assessmentScore;
            this.mcqAssessmentWebsiteScore = mcqAssessmentWebsiteScore;
            this.evidenceScore = evidenceScore;
            this.verifiedScore = verifiedScore;
            this.verificationStatus = verificationStatus;
            this.lastVerifiedAt = lastVerifiedAt;
            this.evidenceList = evidenceList;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private Long skillId;
            private String skillName;
            private String category;
            private Integer selfDeclaredScore;
            private Integer assessmentScore;
            private Integer mcqAssessmentWebsiteScore;
            private Integer evidenceScore;
            private Integer verifiedScore;
            private VerificationStatus verificationStatus;
            private LocalDateTime lastVerifiedAt;
            private List<SkillEvidenceDto> evidenceList;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder selfDeclaredScore(Integer selfDeclaredScore) { this.selfDeclaredScore = selfDeclaredScore; return this; }
            public Builder assessmentScore(Integer assessmentScore) { this.assessmentScore = assessmentScore; return this; }
            public Builder mcqAssessmentWebsiteScore(Integer mcqAssessmentWebsiteScore) { this.mcqAssessmentWebsiteScore = mcqAssessmentWebsiteScore; return this; }
            public Builder evidenceScore(Integer evidenceScore) { this.evidenceScore = evidenceScore; return this; }
            public Builder verifiedScore(Integer verifiedScore) { this.verifiedScore = verifiedScore; return this; }
            public Builder verificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; return this; }
            public Builder lastVerifiedAt(LocalDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; return this; }
            public Builder evidenceList(List<SkillEvidenceDto> evidenceList) { this.evidenceList = evidenceList; return this; }

            public StudentSkillDto build() {
                return new StudentSkillDto(id, skillId, skillName, category, selfDeclaredScore, assessmentScore, mcqAssessmentWebsiteScore, evidenceScore, verifiedScore, verificationStatus, lastVerifiedAt, evidenceList);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Integer getSelfDeclaredScore() { return selfDeclaredScore; }
        public void setSelfDeclaredScore(Integer selfDeclaredScore) { this.selfDeclaredScore = selfDeclaredScore; }
        public Integer getAssessmentScore() { return assessmentScore; }
        public void setAssessmentScore(Integer assessmentScore) { this.assessmentScore = assessmentScore; }
        public Integer getMcqAssessmentWebsiteScore() { return mcqAssessmentWebsiteScore; }
        public void setMcqAssessmentWebsiteScore(Integer mcqAssessmentWebsiteScore) { this.mcqAssessmentWebsiteScore = mcqAssessmentWebsiteScore; }
        public Integer getEvidenceScore() { return evidenceScore; }
        public void setEvidenceScore(Integer evidenceScore) { this.evidenceScore = evidenceScore; }
        public Integer getVerifiedScore() { return verifiedScore; }
        public void setVerifiedScore(Integer verifiedScore) { this.verifiedScore = verifiedScore; }
        public VerificationStatus getVerificationStatus() { return verificationStatus; }
        public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }
        public LocalDateTime getLastVerifiedAt() { return lastVerifiedAt; }
        public void setLastVerifiedAt(LocalDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }
        public List<SkillEvidenceDto> getEvidenceList() { return evidenceList; }
        public void setEvidenceList(List<SkillEvidenceDto> evidenceList) { this.evidenceList = evidenceList; }
    }

    public static class SkillEvidenceDto {
        private Long id;
        private EvidenceSource source;
        private Integer score;
        private Double weight;
        private String details;
        private LocalDateTime createdAt;

        public SkillEvidenceDto() {}
        public SkillEvidenceDto(Long id, EvidenceSource source, Integer score, Double weight, String details, LocalDateTime createdAt) {
            this.id = id;
            this.source = source;
            this.score = score;
            this.weight = weight;
            this.details = details;
            this.createdAt = createdAt;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private EvidenceSource source;
            private Integer score;
            private Double weight;
            private String details;
            private LocalDateTime createdAt;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder source(EvidenceSource source) { this.source = source; return this; }
            public Builder score(Integer score) { this.score = score; return this; }
            public Builder weight(Double weight) { this.weight = weight; return this; }
            public Builder details(String details) { this.details = details; return this; }
            public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

            public SkillEvidenceDto build() {
                return new SkillEvidenceDto(id, source, score, weight, details, createdAt);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public EvidenceSource getSource() { return source; }
        public void setSource(EvidenceSource source) { this.source = source; }
        public Integer getScore() { return score; }
        public void setScore(Integer score) { this.score = score; }
        public Double getWeight() { return weight; }
        public void setWeight(Double weight) { this.weight = weight; }
        public String getDetails() { return details; }
        public void setDetails(String details) { this.details = details; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    public static class SkillPassportDto {
        private Long studentId;
        private String studentName;
        private String targetRole;
        private String gitHubUsername;
        private Integer overallPassportScore;
        private Integer totalVerifiedSkills;
        private List<StudentSkillDto> skills;
        private LocalDateTime lastUpdatedAt;

        public SkillPassportDto() {}
        public SkillPassportDto(Long studentId, String studentName, String targetRole, String gitHubUsername, Integer overallPassportScore, Integer totalVerifiedSkills, List<StudentSkillDto> skills, LocalDateTime lastUpdatedAt) {
            this.studentId = studentId;
            this.studentName = studentName;
            this.targetRole = targetRole;
            this.gitHubUsername = gitHubUsername;
            this.overallPassportScore = overallPassportScore;
            this.totalVerifiedSkills = totalVerifiedSkills;
            this.skills = skills;
            this.lastUpdatedAt = lastUpdatedAt;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long studentId;
            private String studentName;
            private String targetRole;
            private String gitHubUsername;
            private Integer overallPassportScore;
            private Integer totalVerifiedSkills;
            private List<StudentSkillDto> skills;
            private LocalDateTime lastUpdatedAt;

            public Builder studentId(Long studentId) { this.studentId = studentId; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder targetRole(String targetRole) { this.targetRole = targetRole; return this; }
            public Builder gitHubUsername(String gitHubUsername) { this.gitHubUsername = gitHubUsername; return this; }
            public Builder overallPassportScore(Integer overallPassportScore) { this.overallPassportScore = overallPassportScore; return this; }
            public Builder totalVerifiedSkills(Integer totalVerifiedSkills) { this.totalVerifiedSkills = totalVerifiedSkills; return this; }
            public Builder skills(List<StudentSkillDto> skills) { this.skills = skills; return this; }
            public Builder lastUpdatedAt(LocalDateTime lastUpdatedAt) { this.lastUpdatedAt = lastUpdatedAt; return this; }

            public SkillPassportDto build() {
                return new SkillPassportDto(studentId, studentName, targetRole, gitHubUsername, overallPassportScore, totalVerifiedSkills, skills, lastUpdatedAt);
            }
        }

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
        public String getGitHubUsername() { return gitHubUsername; }
        public void setGitHubUsername(String gitHubUsername) { this.gitHubUsername = gitHubUsername; }
        public Integer getOverallPassportScore() { return overallPassportScore; }
        public void setOverallPassportScore(Integer overallPassportScore) { this.overallPassportScore = overallPassportScore; }
        public Integer getTotalVerifiedSkills() { return totalVerifiedSkills; }
        public void setTotalVerifiedSkills(Integer totalVerifiedSkills) { this.totalVerifiedSkills = totalVerifiedSkills; }
        public List<StudentSkillDto> getSkills() { return skills; }
        public void setSkills(List<StudentSkillDto> skills) { this.skills = skills; }
        public LocalDateTime getLastUpdatedAt() { return lastUpdatedAt; }
        public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) { this.lastUpdatedAt = lastUpdatedAt; }
    }
}
