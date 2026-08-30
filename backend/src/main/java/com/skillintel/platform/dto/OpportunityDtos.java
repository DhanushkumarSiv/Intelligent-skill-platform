package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.ApplicationStatus;
import com.skillintel.platform.domain.enums.OpportunityType;

import java.util.List;

public class OpportunityDtos {

    public static class CompanyDto {
        private Long id;
        private String name;
        private String industry;
        private String description;
        private String website;
        private String location;
        private Boolean verified;

        public CompanyDto() {}
        public CompanyDto(Long id, String name, String industry, String description, String website, String location, Boolean verified) {
            this.id = id;
            this.name = name;
            this.industry = industry;
            this.description = description;
            this.website = website;
            this.location = location;
            this.verified = verified;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String name;
            private String industry;
            private String description;
            private String website;
            private String location;
            private Boolean verified;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder industry(String industry) { this.industry = industry; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder website(String website) { this.website = website; return this; }
            public Builder location(String location) { this.location = location; return this; }
            public Builder verified(Boolean verified) { this.verified = verified; return this; }

            public CompanyDto build() {
                return new CompanyDto(id, name, industry, description, website, location, verified);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getIndustry() { return industry; }
        public void setIndustry(String industry) { this.industry = industry; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getWebsite() { return website; }
        public void setWebsite(String website) { this.website = website; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public Boolean getVerified() { return verified; }
        public void setVerified(Boolean verified) { this.verified = verified; }
    }

    public static class OpportunitySkillDto {
        private Long skillId;
        private String skillName;
        private String category;
        private Integer importance;
        private Integer minimumScore;

        public OpportunitySkillDto() {}
        public OpportunitySkillDto(Long skillId, String skillName, String category, Integer importance, Integer minimumScore) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.category = category;
            this.importance = importance;
            this.minimumScore = minimumScore;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long skillId;
            private String skillName;
            private String category;
            private Integer importance;
            private Integer minimumScore;

            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder importance(Integer importance) { this.importance = importance; return this; }
            public Builder minimumScore(Integer minimumScore) { this.minimumScore = minimumScore; return this; }

            public OpportunitySkillDto build() {
                return new OpportunitySkillDto(skillId, skillName, category, importance, minimumScore);
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
        public Integer getMinimumScore() { return minimumScore; }
        public void setMinimumScore(Integer minimumScore) { this.minimumScore = minimumScore; }
    }

    public static class OpportunityDto {
        private Long id;
        private CompanyDto company;
        private String title;
        private OpportunityType type;
        private String description;
        private String location;
        private String duration;
        private String stipend;
        private Double minCgpa;
        private String preferredDegree;
        private String deadline;
        private String status;
        private List<OpportunitySkillDto> skills;

        public OpportunityDto() {}
        public OpportunityDto(Long id, CompanyDto company, String title, OpportunityType type, String description, String location, String duration, String stipend, Double minCgpa, String preferredDegree, String deadline, String status, List<OpportunitySkillDto> skills) {
            this.id = id;
            this.company = company;
            this.title = title;
            this.type = type;
            this.description = description;
            this.location = location;
            this.duration = duration;
            this.stipend = stipend;
            this.minCgpa = minCgpa;
            this.preferredDegree = preferredDegree;
            this.deadline = deadline;
            this.status = status;
            this.skills = skills;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private CompanyDto company;
            private String title;
            private OpportunityType type;
            private String description;
            private String location;
            private String duration;
            private String stipend;
            private Double minCgpa;
            private String preferredDegree;
            private String deadline;
            private String status;
            private List<OpportunitySkillDto> skills;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder company(CompanyDto company) { this.company = company; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder type(OpportunityType type) { this.type = type; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder location(String location) { this.location = location; return this; }
            public Builder duration(String duration) { this.duration = duration; return this; }
            public Builder stipend(String stipend) { this.stipend = stipend; return this; }
            public Builder minCgpa(Double minCgpa) { this.minCgpa = minCgpa; return this; }
            public Builder preferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; return this; }
            public Builder deadline(String deadline) { this.deadline = deadline; return this; }
            public Builder status(String status) { this.status = status; return this; }
            public Builder skills(List<OpportunitySkillDto> skills) { this.skills = skills; return this; }

            public OpportunityDto build() {
                return new OpportunityDto(id, company, title, type, description, location, duration, stipend, minCgpa, preferredDegree, deadline, status, skills);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public CompanyDto getCompany() { return company; }
        public void setCompany(CompanyDto company) { this.company = company; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public OpportunityType getType() { return type; }
        public void setType(OpportunityType type) { this.type = type; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }
        public String getStipend() { return stipend; }
        public void setStipend(String stipend) { this.stipend = stipend; }
        public Double getMinCgpa() { return minCgpa; }
        public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }
        public String getPreferredDegree() { return preferredDegree; }
        public void setPreferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; }
        public String getDeadline() { return deadline; }
        public void setDeadline(String deadline) { this.deadline = deadline; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public List<OpportunitySkillDto> getSkills() { return skills; }
        public void setSkills(List<OpportunitySkillDto> skills) { this.skills = skills; }
    }

    public static class SkillMatchDetailDto {
        private Long skillId;
        private String skillName;
        private Integer requiredScore;
        private Integer studentVerifiedScore;
        private String status; // STRONG, MODERATE, WEAK
        private Integer gap;

        public SkillMatchDetailDto() {}
        public SkillMatchDetailDto(Long skillId, String skillName, Integer requiredScore, Integer studentVerifiedScore, String status, Integer gap) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.requiredScore = requiredScore;
            this.studentVerifiedScore = studentVerifiedScore;
            this.status = status;
            this.gap = gap;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long skillId;
            private String skillName;
            private Integer requiredScore;
            private Integer studentVerifiedScore;
            private String status;
            private Integer gap;

            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder requiredScore(Integer requiredScore) { this.requiredScore = requiredScore; return this; }
            public Builder studentVerifiedScore(Integer studentVerifiedScore) { this.studentVerifiedScore = studentVerifiedScore; return this; }
            public Builder status(String status) { this.status = status; return this; }
            public Builder gap(Integer gap) { this.gap = gap; return this; }

            public SkillMatchDetailDto build() {
                return new SkillMatchDetailDto(skillId, skillName, requiredScore, studentVerifiedScore, status, gap);
            }
        }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public Integer getRequiredScore() { return requiredScore; }
        public void setRequiredScore(Integer requiredScore) { this.requiredScore = requiredScore; }
        public Integer getStudentVerifiedScore() { return studentVerifiedScore; }
        public void setStudentVerifiedScore(Integer studentVerifiedScore) { this.studentVerifiedScore = studentVerifiedScore; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Integer getGap() { return gap; }
        public void setGap(Integer gap) { this.gap = gap; }
    }

    public static class MatchScoreBreakdownDto {
        private Long studentId;
        private Long opportunityId;
        private String opportunityTitle;
        private String companyName;
        private Integer overallMatchScore;
        private Integer skillMatchScore;
        private Integer eligibilityScore;
        private Integer locationScore;
        private Boolean isEligible;
        private String eligibilityReason;
        private List<SkillMatchDetailDto> skillBreakdown;
        private String biggestGapSkillName;
        private Long biggestGapSkillId;

        public MatchScoreBreakdownDto() {}
        public MatchScoreBreakdownDto(Long studentId, Long opportunityId, String opportunityTitle, String companyName, Integer overallMatchScore, Integer skillMatchScore, Integer eligibilityScore, Integer locationScore, Boolean isEligible, String eligibilityReason, List<SkillMatchDetailDto> skillBreakdown, String biggestGapSkillName, Long biggestGapSkillId) {
            this.studentId = studentId;
            this.opportunityId = opportunityId;
            this.opportunityTitle = opportunityTitle;
            this.companyName = companyName;
            this.overallMatchScore = overallMatchScore;
            this.skillMatchScore = skillMatchScore;
            this.eligibilityScore = eligibilityScore;
            this.locationScore = locationScore;
            this.isEligible = isEligible;
            this.eligibilityReason = eligibilityReason;
            this.skillBreakdown = skillBreakdown;
            this.biggestGapSkillName = biggestGapSkillName;
            this.biggestGapSkillId = biggestGapSkillId;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long studentId;
            private Long opportunityId;
            private String opportunityTitle;
            private String companyName;
            private Integer overallMatchScore;
            private Integer skillMatchScore;
            private Integer eligibilityScore;
            private Integer locationScore;
            private Boolean isEligible;
            private String eligibilityReason;
            private List<SkillMatchDetailDto> skillBreakdown;
            private String biggestGapSkillName;
            private Long biggestGapSkillId;

            public Builder studentId(Long studentId) { this.studentId = studentId; return this; }
            public Builder opportunityId(Long opportunityId) { this.opportunityId = opportunityId; return this; }
            public Builder opportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; return this; }
            public Builder companyName(String companyName) { this.companyName = companyName; return this; }
            public Builder overallMatchScore(Integer overallMatchScore) { this.overallMatchScore = overallMatchScore; return this; }
            public Builder skillMatchScore(Integer skillMatchScore) { this.skillMatchScore = skillMatchScore; return this; }
            public Builder eligibilityScore(Integer eligibilityScore) { this.eligibilityScore = eligibilityScore; return this; }
            public Builder locationScore(Integer locationScore) { this.locationScore = locationScore; return this; }
            public Builder isEligible(Boolean isEligible) { this.isEligible = isEligible; return this; }
            public Builder eligibilityReason(String eligibilityReason) { this.eligibilityReason = eligibilityReason; return this; }
            public Builder skillBreakdown(List<SkillMatchDetailDto> skillBreakdown) { this.skillBreakdown = skillBreakdown; return this; }
            public Builder biggestGapSkillName(String biggestGapSkillName) { this.biggestGapSkillName = biggestGapSkillName; return this; }
            public Builder biggestGapSkillId(Long biggestGapSkillId) { this.biggestGapSkillId = biggestGapSkillId; return this; }

            public MatchScoreBreakdownDto build() {
                return new MatchScoreBreakdownDto(studentId, opportunityId, opportunityTitle, companyName, overallMatchScore, skillMatchScore, eligibilityScore, locationScore, isEligible, eligibilityReason, skillBreakdown, biggestGapSkillName, biggestGapSkillId);
            }
        }

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        public Long getOpportunityId() { return opportunityId; }
        public void setOpportunityId(Long opportunityId) { this.opportunityId = opportunityId; }
        public String getOpportunityTitle() { return opportunityTitle; }
        public void setOpportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public Integer getOverallMatchScore() { return overallMatchScore; }
        public void setOverallMatchScore(Integer overallMatchScore) { this.overallMatchScore = overallMatchScore; }
        public Integer getSkillMatchScore() { return skillMatchScore; }
        public void setSkillMatchScore(Integer skillMatchScore) { this.skillMatchScore = skillMatchScore; }
        public Integer getEligibilityScore() { return eligibilityScore; }
        public void setEligibilityScore(Integer eligibilityScore) { this.eligibilityScore = eligibilityScore; }
        public Integer getLocationScore() { return locationScore; }
        public void setLocationScore(Integer locationScore) { this.locationScore = locationScore; }
        public Boolean getIsEligible() { return isEligible; }
        public void setIsEligible(Boolean isEligible) { this.isEligible = isEligible; }
        public String getEligibilityReason() { return eligibilityReason; }
        public void setEligibilityReason(String eligibilityReason) { this.eligibilityReason = eligibilityReason; }
        public List<SkillMatchDetailDto> getSkillBreakdown() { return skillBreakdown; }
        public void setSkillBreakdown(List<SkillMatchDetailDto> skillBreakdown) { this.skillBreakdown = skillBreakdown; }
        public String getBiggestGapSkillName() { return biggestGapSkillName; }
        public void setBiggestGapSkillName(String biggestGapSkillName) { this.biggestGapSkillName = biggestGapSkillName; }
        public Long getBiggestGapSkillId() { return biggestGapSkillId; }
        public void setBiggestGapSkillId(Long biggestGapSkillId) { this.biggestGapSkillId = biggestGapSkillId; }
    }

    public static class ApplicationDto {
        private Long id;
        private Long opportunityId;
        private String opportunityTitle;
        private String companyName;
        private Long studentProfileId;
        private String studentName;
        private ApplicationStatus status;
        private String appliedAt;
        private String coverNote;

        public ApplicationDto() {}
        public ApplicationDto(Long id, Long opportunityId, String opportunityTitle, String companyName, Long studentProfileId, String studentName, ApplicationStatus status, String appliedAt, String coverNote) {
            this.id = id;
            this.opportunityId = opportunityId;
            this.opportunityTitle = opportunityTitle;
            this.companyName = companyName;
            this.studentProfileId = studentProfileId;
            this.studentName = studentName;
            this.status = status;
            this.appliedAt = appliedAt;
            this.coverNote = coverNote;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private Long opportunityId;
            private String opportunityTitle;
            private String companyName;
            private Long studentProfileId;
            private String studentName;
            private ApplicationStatus status;
            private String appliedAt;
            private String coverNote;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder opportunityId(Long opportunityId) { this.opportunityId = opportunityId; return this; }
            public Builder opportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; return this; }
            public Builder companyName(String companyName) { this.companyName = companyName; return this; }
            public Builder studentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder status(ApplicationStatus status) { this.status = status; return this; }
            public Builder appliedAt(String appliedAt) { this.appliedAt = appliedAt; return this; }
            public Builder coverNote(String coverNote) { this.coverNote = coverNote; return this; }

            public ApplicationDto build() {
                return new ApplicationDto(id, opportunityId, opportunityTitle, companyName, studentProfileId, studentName, status, appliedAt, coverNote);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getOpportunityId() { return opportunityId; }
        public void setOpportunityId(Long opportunityId) { this.opportunityId = opportunityId; }
        public String getOpportunityTitle() { return opportunityTitle; }
        public void setOpportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public Long getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        public ApplicationStatus getStatus() { return status; }
        public void setStatus(ApplicationStatus status) { this.status = status; }
        public String getAppliedAt() { return appliedAt; }
        public void setAppliedAt(String appliedAt) { this.appliedAt = appliedAt; }
        public String getCoverNote() { return coverNote; }
        public void setCoverNote(String coverNote) { this.coverNote = coverNote; }
    }

    public static class CandidateSearchResultDto {
        private Long studentId;
        private String studentName;
        private String targetRole;
        private String gitHubUsername;
        private Integer overallMatchScore;
        private Integer verifiedSkillCount;
        private List<String> topSkills;
        private Boolean isEligible;

        public CandidateSearchResultDto() {}
        public CandidateSearchResultDto(Long studentId, String studentName, String targetRole, String gitHubUsername, Integer overallMatchScore, Integer verifiedSkillCount, List<String> topSkills, Boolean isEligible) {
            this.studentId = studentId;
            this.studentName = studentName;
            this.targetRole = targetRole;
            this.gitHubUsername = gitHubUsername;
            this.overallMatchScore = overallMatchScore;
            this.verifiedSkillCount = verifiedSkillCount;
            this.topSkills = topSkills;
            this.isEligible = isEligible;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long studentId;
            private String studentName;
            private String targetRole;
            private String gitHubUsername;
            private Integer overallMatchScore;
            private Integer verifiedSkillCount;
            private List<String> topSkills;
            private Boolean isEligible;

            public Builder studentId(Long studentId) { this.studentId = studentId; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder targetRole(String targetRole) { this.targetRole = targetRole; return this; }
            public Builder gitHubUsername(String gitHubUsername) { this.gitHubUsername = gitHubUsername; return this; }
            public Builder overallMatchScore(Integer overallMatchScore) { this.overallMatchScore = overallMatchScore; return this; }
            public Builder verifiedSkillCount(Integer verifiedSkillCount) { this.verifiedSkillCount = verifiedSkillCount; return this; }
            public Builder topSkills(List<String> topSkills) { this.topSkills = topSkills; return this; }
            public Builder isEligible(Boolean isEligible) { this.isEligible = isEligible; return this; }

            public CandidateSearchResultDto build() {
                return new CandidateSearchResultDto(studentId, studentName, targetRole, gitHubUsername, overallMatchScore, verifiedSkillCount, topSkills, isEligible);
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
        public Integer getOverallMatchScore() { return overallMatchScore; }
        public void setOverallMatchScore(Integer overallMatchScore) { this.overallMatchScore = overallMatchScore; }
        public Integer getVerifiedSkillCount() { return verifiedSkillCount; }
        public void setVerifiedSkillCount(Integer verifiedSkillCount) { this.verifiedSkillCount = verifiedSkillCount; }
        public List<String> getTopSkills() { return topSkills; }
        public void setTopSkills(List<String> topSkills) { this.topSkills = topSkills; }
        public Boolean getIsEligible() { return isEligible; }
        public void setIsEligible(Boolean isEligible) { this.isEligible = isEligible; }
    }

    public static class JobDescriptionParseRequestDto {
        private String rawJobDescription;

        public JobDescriptionParseRequestDto() {}
        public JobDescriptionParseRequestDto(String rawJobDescription) {
            this.rawJobDescription = rawJobDescription;
        }
        public String getRawJobDescription() { return rawJobDescription; }
        public void setRawJobDescription(String rawJobDescription) { this.rawJobDescription = rawJobDescription; }
    }
}
