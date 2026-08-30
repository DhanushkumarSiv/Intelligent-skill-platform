package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.PriorityLevel;
import com.skillintel.platform.dto.LearningDtos.GapAnalysisResultDto;
import com.skillintel.platform.dto.LearningDtos.SkillGapDto;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class SkillGapService {

    private final StudentProfileRepository studentProfileRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final RoleSkillRepository roleSkillRepository;

    public SkillGapService(StudentProfileRepository studentProfileRepository,
                           StudentSkillRepository studentSkillRepository,
                           RoleSkillRepository roleSkillRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.roleSkillRepository = roleSkillRepository;
    }

    public GapAnalysisResultDto analyzeSkillGaps(Long studentProfileId) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        TargetRole role = student.getTargetRole();
        if (role == null) {
            throw new RuntimeException("Student has no target role assigned");
        }

        List<RoleSkill> roleSkills = roleSkillRepository.findByRoleId(role.getId());
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentProfileId(studentProfileId);

        List<SkillGapDto> gapList = new ArrayList<>();
        int urgentCount = 0;

        for (RoleSkill rs : roleSkills) {
            Skill skill = rs.getSkill();
            int minLevel = rs.getMinimumLevel() != null ? rs.getMinimumLevel() : 70;
            int importance = rs.getImportance() != null ? rs.getImportance() : 80;

            StudentSkill ss = studentSkills.stream()
                    .filter(s -> s.getSkill().getId().equals(skill.getId()))
                    .findFirst()
                    .orElse(null);

            int verifiedScore = (ss != null && ss.getVerifiedScore() != null) ? ss.getVerifiedScore() : 0;
            int gap = Math.max(0, minLevel - verifiedScore);
            int priorityScore = importance * gap;

            PriorityLevel priorityLevel;
            if (priorityScore >= 1800) {
                priorityLevel = PriorityLevel.URGENT;
                urgentCount++;
            } else if (priorityScore >= 1000) {
                priorityLevel = PriorityLevel.HIGH;
            } else if (priorityScore >= 400) {
                priorityLevel = PriorityLevel.MEDIUM;
            } else {
                priorityLevel = PriorityLevel.LOW;
            }

            if (gap > 0 || verifiedScore < minLevel) {
                gapList.add(SkillGapDto.builder()
                        .skillId(skill.getId())
                        .skillName(skill.getName())
                        .category(skill.getCategory())
                        .requiredLevel(minLevel)
                        .verifiedScore(verifiedScore)
                        .gap(gap)
                        .importance(importance)
                        .priorityScore(priorityScore)
                        .priorityLevel(priorityLevel)
                        .build());
            }
        }

        // Sort gaps by priority score descending
        gapList.sort(Comparator.comparingInt(SkillGapDto::getPriorityScore).reversed());

        return GapAnalysisResultDto.builder()
                .studentId(student.getId())
                .targetRoleName(role.getName())
                .totalGaps(gapList.size())
                .urgentGaps(urgentCount)
                .gaps(gapList)
                .build();
    }
}
