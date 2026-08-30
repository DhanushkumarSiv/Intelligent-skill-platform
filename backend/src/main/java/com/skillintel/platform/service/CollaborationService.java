package com.skillintel.platform.service;

import com.skillintel.platform.domain.Collaboration;
import com.skillintel.platform.domain.CollaborationSkill;
import com.skillintel.platform.domain.Company;
import com.skillintel.platform.dto.CollaborationDtos.CollaborationDto;
import com.skillintel.platform.repository.CollaborationRepository;
import com.skillintel.platform.repository.CollaborationSkillRepository;
import com.skillintel.platform.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollaborationService {

    private final CollaborationRepository collaborationRepository;
    private final CollaborationSkillRepository collaborationSkillRepository;
    private final CompanyRepository companyRepository;

    public CollaborationService(CollaborationRepository collaborationRepository,
                                CollaborationSkillRepository collaborationSkillRepository,
                                CompanyRepository companyRepository) {
        this.collaborationRepository = collaborationRepository;
        this.collaborationSkillRepository = collaborationSkillRepository;
        this.companyRepository = companyRepository;
    }

    public List<CollaborationDto> getAllCollaborations() {
        return collaborationRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CollaborationDto createCollaboration(Collaboration col) {
        if (col.getCompany() != null && col.getCompany().getId() != null) {
            Company company = companyRepository.findById(col.getCompany().getId()).orElse(null);
            col.setCompany(company);
        }
        Collaboration saved = collaborationRepository.save(col);
        return mapToDto(saved);
    }

    private CollaborationDto mapToDto(Collaboration col) {
        List<CollaborationSkill> skills = collaborationSkillRepository.findByCollaborationId(col.getId());
        List<String> skillNames = skills.stream().map(s -> s.getSkill().getName()).collect(Collectors.toList());

        return CollaborationDto.builder()
                .id(col.getId())
                .companyName(col.getCompany() != null ? col.getCompany().getName() : "Industry Partner")
                .title(col.getTitle())
                .description(col.getDescription())
                .type(col.getType())
                .requirements(col.getRequirements())
                .startDate(col.getStartDate())
                .endDate(col.getEndDate())
                .status(col.getStatus())
                .skills(skillNames)
                .build();
    }
}
