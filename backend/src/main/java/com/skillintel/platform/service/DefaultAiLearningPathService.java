package com.skillintel.platform.service;

import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.dto.LearningDtos.CourseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DefaultAiLearningPathService implements AiLearningPathService {

    @Override
    public List<LearningStepPlan> generateSequence(Skill skill, int verifiedScore, int requiredLevel, List<CourseDto> availableCourses) {
        List<LearningStepPlan> plans = new ArrayList<>();
        String skillName = skill.getName();

        CourseDto bestCourse = availableCourses.isEmpty() ? null : availableCourses.get(0);
        CourseDto secondCourse = availableCourses.size() > 1 ? availableCourses.get(1) : bestCourse;

        plans.add(new LearningStepPlan(1, skillName + " Fundamentals & Core Concepts", bestCourse));
        plans.add(new LearningStepPlan(2, "Applied " + skillName + " with Enterprise Frameworks", secondCourse));
        plans.add(new LearningStepPlan(3, skillName + " Containerization & Orchestration", bestCourse));
        plans.add(new LearningStepPlan(4, "Practical " + skillName + " Real-World Capstone Project", secondCourse));
        plans.add(new LearningStepPlan(5, skillName + " Post-Learning Skill Reassessment", null));

        return plans;
    }
}
