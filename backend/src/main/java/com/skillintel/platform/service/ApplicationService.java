package com.skillintel.platform.service;

import com.skillintel.platform.domain.Application;
import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.domain.enums.ApplicationStatus;
import com.skillintel.platform.dto.OpportunityDtos.ApplicationDto;
import com.skillintel.platform.repository.ApplicationRepository;
import com.skillintel.platform.repository.OpportunityRepository;
import com.skillintel.platform.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final OpportunityRepository opportunityRepository;
    private final StudentProfileRepository studentProfileRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                              OpportunityRepository opportunityRepository,
                              StudentProfileRepository studentProfileRepository) {
        this.applicationRepository = applicationRepository;
        this.opportunityRepository = opportunityRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    @Transactional
    public ApplicationDto applyForOpportunity(Long studentProfileId, Long opportunityId, String coverNote) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        Application app = Application.builder()
                .studentProfile(student)
                .opportunity(opportunity)
                .status(ApplicationStatus.APPLIED)
                .coverNote(coverNote)
                .build();

        app = applicationRepository.save(app);
        return mapToDto(app);
    }

    public List<ApplicationDto> getStudentApplications(Long studentProfileId) {
        return applicationRepository.findByStudentProfileId(studentProfileId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getOpportunityApplications(Long opportunityId) {
        return applicationRepository.findByOpportunityId(opportunityId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationDto updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        app = applicationRepository.save(app);
        return mapToDto(app);
    }

    private ApplicationDto mapToDto(Application app) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return ApplicationDto.builder()
                .id(app.getId())
                .opportunityId(app.getOpportunity().getId())
                .opportunityTitle(app.getOpportunity().getTitle())
                .companyName(app.getOpportunity().getCompany() != null ? app.getOpportunity().getCompany().getName() : "Industry Partner")
                .studentProfileId(app.getStudentProfile().getId())
                .studentName(app.getStudentProfile().getUser() != null ? app.getStudentProfile().getUser().getFullName() : "Student Candidate")
                .status(app.getStatus())
                .appliedAt(app.getAppliedAt() != null ? app.getAppliedAt().format(formatter) : "")
                .coverNote(app.getCoverNote())
                .build();
    }
}
