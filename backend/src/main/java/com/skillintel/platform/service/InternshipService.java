package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.InternshipStatus;
import com.skillintel.platform.dto.CollaborationDtos.InternshipDto;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final EvidenceEngineService evidenceEngineService;

    public InternshipService(InternshipRepository internshipRepository,
                             StudentProfileRepository studentProfileRepository,
                             CompanyRepository companyRepository,
                             SkillRepository skillRepository,
                             EvidenceEngineService evidenceEngineService) {
        this.internshipRepository = internshipRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.companyRepository = companyRepository;
        this.skillRepository = skillRepository;
        this.evidenceEngineService = evidenceEngineService;
    }

    public List<InternshipDto> getStudentInternships(Long studentProfileId) {
        return internshipRepository.findByStudentProfileId(studentProfileId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public InternshipDto completeInternship(Long internshipId, String completionStatus) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        internship.setStatus(InternshipStatus.COMPLETED);
        internship.setCompletionStatus(completionStatus != null ? completionStatus : "Completed with Distinction");
        internship = internshipRepository.save(internship);

        // Crucial Integration: Completion generates real-world project evidence in Module 1!
        Long studentProfileId = internship.getStudentProfile().getId();
        Skill javaSkill = skillRepository.findByName("Java").orElse(null);
        Skill springSkill = skillRepository.findByName("Spring Boot").orElse(null);

        if (javaSkill != null) {
            evidenceEngineService.recordProjectEvidence(studentProfileId, javaSkill.getId(), 92, "Industry Internship at " + internship.getCompany().getName());
        }
        if (springSkill != null) {
            evidenceEngineService.recordProjectEvidence(studentProfileId, springSkill.getId(), 88, "Industry Internship at " + internship.getCompany().getName());
        }

        return mapToDto(internship);
    }

    private InternshipDto mapToDto(Internship i) {
        return InternshipDto.builder()
                .id(i.getId())
                .studentProfileId(i.getStudentProfile().getId())
                .studentName(i.getStudentProfile().getUser() != null ? i.getStudentProfile().getUser().getFullName() : "Alex Chen")
                .companyName(i.getCompany() != null ? i.getCompany().getName() : "Enterprise Partner")
                .opportunityTitle(i.getOpportunity() != null ? i.getOpportunity().getTitle() : "Backend Engineering Intern")
                .mentorName(i.getMentor() != null && i.getMentor().getUser() != null ? i.getMentor().getUser().getFullName() : "Industry Mentor")
                .startDate(i.getStartDate())
                .endDate(i.getEndDate())
                .status(i.getStatus())
                .completionStatus(i.getCompletionStatus())
                .build();
    }
}
