package com.skillintel.platform.service;

import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.dto.LearningDtos.CourseDto;

import java.util.List;

public interface AiLearningPathService {
    List<LearningStepPlan> generateSequence(Skill skill, int verifiedScore, int requiredLevel, List<CourseDto> availableCourses);

    class LearningStepPlan {
        private int stepNumber;
        private String moduleTitle;
        private CourseDto recommendedCourse;

        public LearningStepPlan(int stepNumber, String moduleTitle, CourseDto recommendedCourse) {
            this.stepNumber = stepNumber;
            this.moduleTitle = moduleTitle;
            this.recommendedCourse = recommendedCourse;
        }

        public int getStepNumber() { return stepNumber; }
        public String getModuleTitle() { return moduleTitle; }
        public CourseDto getRecommendedCourse() { return recommendedCourse; }
    }
}
