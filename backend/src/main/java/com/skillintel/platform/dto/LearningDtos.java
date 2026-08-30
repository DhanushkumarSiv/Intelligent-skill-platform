package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.LearningStatus;
import com.skillintel.platform.domain.enums.PriorityLevel;
import com.skillintel.platform.domain.enums.VerificationStatus;

import java.util.List;

public class LearningDtos {

    public static class SkillGapDto {
        private Long skillId;
        private String skillName;
        private String category;
        private Integer requiredLevel;
        private Integer verifiedScore;
        private Integer gap;
        private Integer importance;
        private Integer priorityScore;
        private PriorityLevel priorityLevel;

        public SkillGapDto() {}
        public SkillGapDto(Long skillId, String skillName, String category, Integer requiredLevel, Integer verifiedScore, Integer gap, Integer importance, Integer priorityScore, PriorityLevel priorityLevel) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.category = category;
            this.requiredLevel = requiredLevel;
            this.verifiedScore = verifiedScore;
            this.gap = gap;
            this.importance = importance;
            this.priorityScore = priorityScore;
            this.priorityLevel = priorityLevel;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long skillId;
            private String skillName;
            private String category;
            private Integer requiredLevel;
            private Integer verifiedScore;
            private Integer gap;
            private Integer importance;
            private Integer priorityScore;
            private PriorityLevel priorityLevel;

            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder category(String category) { this.category = category; return this; }
            public Builder requiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; return this; }
            public Builder verifiedScore(Integer verifiedScore) { this.verifiedScore = verifiedScore; return this; }
            public Builder gap(Integer gap) { this.gap = gap; return this; }
            public Builder importance(Integer importance) { this.importance = importance; return this; }
            public Builder priorityScore(Integer priorityScore) { this.priorityScore = priorityScore; return this; }
            public Builder priorityLevel(PriorityLevel priorityLevel) { this.priorityLevel = priorityLevel; return this; }

            public SkillGapDto build() {
                return new SkillGapDto(skillId, skillName, category, requiredLevel, verifiedScore, gap, importance, priorityScore, priorityLevel);
            }
        }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Integer getRequiredLevel() { return requiredLevel; }
        public void setRequiredLevel(Integer requiredLevel) { this.requiredLevel = requiredLevel; }
        public Integer getVerifiedScore() { return verifiedScore; }
        public void setVerifiedScore(Integer verifiedScore) { this.verifiedScore = verifiedScore; }
        public Integer getGap() { return gap; }
        public void setGap(Integer gap) { this.gap = gap; }
        public Integer getImportance() { return importance; }
        public void setImportance(Integer importance) { this.importance = importance; }
        public Integer getPriorityScore() { return priorityScore; }
        public void setPriorityScore(Integer priorityScore) { this.priorityScore = priorityScore; }
        public PriorityLevel getPriorityLevel() { return priorityLevel; }
        public void setPriorityLevel(PriorityLevel priorityLevel) { this.priorityLevel = priorityLevel; }
    }

    public static class GapAnalysisResultDto {
        private Long studentId;
        private String targetRoleName;
        private Integer totalGaps;
        private Integer urgentGaps;
        private List<SkillGapDto> gaps;

        public GapAnalysisResultDto() {}
        public GapAnalysisResultDto(Long studentId, String targetRoleName, Integer totalGaps, Integer urgentGaps, List<SkillGapDto> gaps) {
            this.studentId = studentId;
            this.targetRoleName = targetRoleName;
            this.totalGaps = totalGaps;
            this.urgentGaps = urgentGaps;
            this.gaps = gaps;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long studentId;
            private String targetRoleName;
            private Integer totalGaps;
            private Integer urgentGaps;
            private List<SkillGapDto> gaps;

            public Builder studentId(Long studentId) { this.studentId = studentId; return this; }
            public Builder targetRoleName(String targetRoleName) { this.targetRoleName = targetRoleName; return this; }
            public Builder totalGaps(Integer totalGaps) { this.totalGaps = totalGaps; return this; }
            public Builder urgentGaps(Integer urgentGaps) { this.urgentGaps = urgentGaps; return this; }
            public Builder gaps(List<SkillGapDto> gaps) { this.gaps = gaps; return this; }

            public GapAnalysisResultDto build() {
                return new GapAnalysisResultDto(studentId, targetRoleName, totalGaps, urgentGaps, gaps);
            }
        }

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        public String getTargetRoleName() { return targetRoleName; }
        public void setTargetRoleName(String targetRoleName) { this.targetRoleName = targetRoleName; }
        public Integer getTotalGaps() { return totalGaps; }
        public void setTotalGaps(Integer totalGaps) { this.totalGaps = totalGaps; }
        public Integer getUrgentGaps() { return urgentGaps; }
        public void setUrgentGaps(Integer urgentGaps) { this.urgentGaps = urgentGaps; }
        public List<SkillGapDto> getGaps() { return gaps; }
        public void setGaps(List<SkillGapDto> gaps) { this.gaps = gaps; }
    }

    public static class CourseDto {
        private Long id;
        private String title;
        private String provider;
        private String url;
        private String description;
        private String difficulty;
        private Integer durationHours;
        private Integer qualityScore;
        private Integer coverageLevel;

        public CourseDto() {}
        public CourseDto(Long id, String title, String provider, String url, String description, String difficulty, Integer durationHours, Integer qualityScore, Integer coverageLevel) {
            this.id = id;
            this.title = title;
            this.provider = provider;
            this.url = url;
            this.description = description;
            this.difficulty = difficulty;
            this.durationHours = durationHours;
            this.qualityScore = qualityScore;
            this.coverageLevel = coverageLevel;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String title;
            private String provider;
            private String url;
            private String description;
            private String difficulty;
            private Integer durationHours;
            private Integer qualityScore;
            private Integer coverageLevel;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder provider(String provider) { this.provider = provider; return this; }
            public Builder url(String url) { this.url = url; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder difficulty(String difficulty) { this.difficulty = difficulty; return this; }
            public Builder durationHours(Integer durationHours) { this.durationHours = durationHours; return this; }
            public Builder qualityScore(Integer qualityScore) { this.qualityScore = qualityScore; return this; }
            public Builder coverageLevel(Integer coverageLevel) { this.coverageLevel = coverageLevel; return this; }

            public CourseDto build() {
                return new CourseDto(id, title, provider, url, description, difficulty, durationHours, qualityScore, coverageLevel);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getProvider() { return provider; }
        public void setProvider(String provider) { this.provider = provider; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
        public Integer getDurationHours() { return durationHours; }
        public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }
        public Integer getQualityScore() { return qualityScore; }
        public void setQualityScore(Integer qualityScore) { this.qualityScore = qualityScore; }
        public Integer getCoverageLevel() { return coverageLevel; }
        public void setCoverageLevel(Integer coverageLevel) { this.coverageLevel = coverageLevel; }
    }

    public static class LearningProgressDto {
        private Long id;
        private Long learningPathId;
        private Integer stepNumber;
        private String moduleTitle;
        private CourseDto course;
        private LearningStatus status;
        private Integer progress;

        public LearningProgressDto() {}
        public LearningProgressDto(Long id, Long learningPathId, Integer stepNumber, String moduleTitle, CourseDto course, LearningStatus status, Integer progress) {
            this.id = id;
            this.learningPathId = learningPathId;
            this.stepNumber = stepNumber;
            this.moduleTitle = moduleTitle;
            this.course = course;
            this.status = status;
            this.progress = progress;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private Long learningPathId;
            private Integer stepNumber;
            private String moduleTitle;
            private CourseDto course;
            private LearningStatus status;
            private Integer progress;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder learningPathId(Long learningPathId) { this.learningPathId = learningPathId; return this; }
            public Builder stepNumber(Integer stepNumber) { this.stepNumber = stepNumber; return this; }
            public Builder moduleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; return this; }
            public Builder course(CourseDto course) { this.course = course; return this; }
            public Builder status(LearningStatus status) { this.status = status; return this; }
            public Builder progress(Integer progress) { this.progress = progress; return this; }

            public LearningProgressDto build() {
                return new LearningProgressDto(id, learningPathId, stepNumber, moduleTitle, course, status, progress);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getLearningPathId() { return learningPathId; }
        public void setLearningPathId(Long learningPathId) { this.learningPathId = learningPathId; }
        public Integer getStepNumber() { return stepNumber; }
        public void setStepNumber(Integer stepNumber) { this.stepNumber = stepNumber; }
        public String getModuleTitle() { return moduleTitle; }
        public void setModuleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; }
        public CourseDto getCourse() { return course; }
        public void setCourse(CourseDto course) { this.course = course; }
        public LearningStatus getStatus() { return status; }
        public void setStatus(LearningStatus status) { this.status = status; }
        public Integer getProgress() { return progress; }
        public void setProgress(Integer progress) { this.progress = progress; }
    }

    public static class LearningPathDto {
        private Long id;
        private Long skillId;
        private String skillName;
        private String title;
        private Integer totalSteps;
        private LearningStatus status;
        private Integer initialScore;
        private Integer currentScore;
        private List<LearningProgressDto> steps;

        public LearningPathDto() {}
        public LearningPathDto(Long id, Long skillId, String skillName, String title, Integer totalSteps, LearningStatus status, Integer initialScore, Integer currentScore, List<LearningProgressDto> steps) {
            this.id = id;
            this.skillId = skillId;
            this.skillName = skillName;
            this.title = title;
            this.totalSteps = totalSteps;
            this.status = status;
            this.initialScore = initialScore;
            this.currentScore = currentScore;
            this.steps = steps;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private Long skillId;
            private String skillName;
            private String title;
            private Integer totalSteps;
            private LearningStatus status;
            private Integer initialScore;
            private Integer currentScore;
            private List<LearningProgressDto> steps;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder totalSteps(Integer totalSteps) { this.totalSteps = totalSteps; return this; }
            public Builder status(LearningStatus status) { this.status = status; return this; }
            public Builder initialScore(Integer initialScore) { this.initialScore = initialScore; return this; }
            public Builder currentScore(Integer currentScore) { this.currentScore = currentScore; return this; }
            public Builder steps(List<LearningProgressDto> steps) { this.steps = steps; return this; }

            public LearningPathDto build() {
                return new LearningPathDto(id, skillId, skillName, title, totalSteps, status, initialScore, currentScore, steps);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public Integer getTotalSteps() { return totalSteps; }
        public void setTotalSteps(Integer totalSteps) { this.totalSteps = totalSteps; }
        public LearningStatus getStatus() { return status; }
        public void setStatus(LearningStatus status) { this.status = status; }
        public Integer getInitialScore() { return initialScore; }
        public void setInitialScore(Integer initialScore) { this.initialScore = initialScore; }
        public Integer getCurrentScore() { return currentScore; }
        public void setCurrentScore(Integer currentScore) { this.currentScore = currentScore; }
        public List<LearningProgressDto> getSteps() { return steps; }
        public void setSteps(List<LearningProgressDto> steps) { this.steps = steps; }
    }

    public static class ReassessmentRequestDto {
        private Long studentProfileId;
        private Long skillId;
        private Long learningPathId;
        private Integer scoreAchieved;

        public ReassessmentRequestDto() {}
        public ReassessmentRequestDto(Long studentProfileId, Long skillId, Long learningPathId, Integer scoreAchieved) {
            this.studentProfileId = studentProfileId;
            this.skillId = skillId;
            this.learningPathId = learningPathId;
            this.scoreAchieved = scoreAchieved;
        }

        public Long getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public Long getLearningPathId() { return learningPathId; }
        public void setLearningPathId(Long learningPathId) { this.learningPathId = learningPathId; }
        public Integer getScoreAchieved() { return scoreAchieved; }
        public void setScoreAchieved(Integer scoreAchieved) { this.scoreAchieved = scoreAchieved; }
    }

    public static class ReassessmentResultDto {
        private Long skillId;
        private String skillName;
        private Integer previousScore;
        private Integer newScore;
        private Integer improvement;
        private VerificationStatus updatedStatus;

        public ReassessmentResultDto() {}
        public ReassessmentResultDto(Long skillId, String skillName, Integer previousScore, Integer newScore, Integer improvement, VerificationStatus updatedStatus) {
            this.skillId = skillId;
            this.skillName = skillName;
            this.previousScore = previousScore;
            this.newScore = newScore;
            this.improvement = improvement;
            this.updatedStatus = updatedStatus;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long skillId;
            private String skillName;
            private Integer previousScore;
            private Integer newScore;
            private Integer improvement;
            private VerificationStatus updatedStatus;

            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder previousScore(Integer previousScore) { this.previousScore = previousScore; return this; }
            public Builder newScore(Integer newScore) { this.newScore = newScore; return this; }
            public Builder improvement(Integer improvement) { this.improvement = improvement; return this; }
            public Builder updatedStatus(VerificationStatus updatedStatus) { this.updatedStatus = updatedStatus; return this; }

            public ReassessmentResultDto build() {
                return new ReassessmentResultDto(skillId, skillName, previousScore, newScore, improvement, updatedStatus);
            }
        }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public Integer getPreviousScore() { return previousScore; }
        public void setPreviousScore(Integer previousScore) { this.previousScore = previousScore; }
        public Integer getNewScore() { return newScore; }
        public void setNewScore(Integer newScore) { this.newScore = newScore; }
        public Integer getImprovement() { return improvement; }
        public void setImprovement(Integer improvement) { this.improvement = improvement; }
        public VerificationStatus getUpdatedStatus() { return updatedStatus; }
        public void setUpdatedStatus(VerificationStatus updatedStatus) { this.updatedStatus = updatedStatus; }
    }
}
