package com.skillintel.platform.service;

import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.dto.OpportunityDtos.OpportunitySkillDto;
import com.skillintel.platform.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobDescriptionParsingService {

    private final SkillRepository skillRepository;

    public JobDescriptionParsingService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<OpportunitySkillDto> parseSkillsFromText(String rawJobDescription) {
        if (rawJobDescription == null || rawJobDescription.trim().isEmpty()) {
            return List.of();
        }

        String lowerText = rawJobDescription.toLowerCase();
        List<Skill> allSkills = skillRepository.findAll();
        List<OpportunitySkillDto> extractedSkills = new ArrayList<>();

        for (Skill skill : allSkills) {
            String nameLower = skill.getName().toLowerCase();
            boolean matchFound = lowerText.contains(nameLower);

            if (!matchFound && skill.getAliases() != null) {
                for (String alias : skill.getAliases().split(",")) {
                    if (!alias.trim().isEmpty() && lowerText.contains(alias.trim().toLowerCase())) {
                        matchFound = true;
                        break;
                    }
                }
            }

            if (matchFound) {
                int importance = nameLower.contains("java") || nameLower.contains("spring") ? 90 : 80;
                int minScore = nameLower.contains("java") ? 80 : (nameLower.contains("spring") ? 75 : 70);

                extractedSkills.add(OpportunitySkillDto.builder()
                        .skillId(skill.getId())
                        .skillName(skill.getName())
                        .category(skill.getCategory())
                        .importance(importance)
                        .minimumScore(minScore)
                        .build());
            }
        }

        return extractedSkills;
    }
}
