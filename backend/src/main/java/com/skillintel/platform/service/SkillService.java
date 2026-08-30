package com.skillintel.platform.service;

import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.dto.SkillDtos.SkillDto;
import com.skillintel.platform.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public SkillDto createSkill(SkillDto dto) {
        Skill skill = Skill.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .parentSkillId(dto.getParentSkillId())
                .aliases(dto.getAliases() != null ? String.join(",", dto.getAliases()) : "")
                .build();
        skill = skillRepository.save(skill);
        return mapToDto(skill);
    }

    private SkillDto mapToDto(Skill skill) {
        List<String> aliases = skill.getAliases() != null && !skill.getAliases().isBlank()
                ? Arrays.asList(skill.getAliases().split(","))
                : List.of();

        return SkillDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .description(skill.getDescription())
                .parentSkillId(skill.getParentSkillId())
                .aliases(aliases)
                .build();
    }
}
