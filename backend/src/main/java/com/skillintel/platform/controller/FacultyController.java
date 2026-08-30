package com.skillintel.platform.controller;

import com.skillintel.platform.domain.Academician;
import com.skillintel.platform.dto.CollaborationDtos.AcademicianDto;
import com.skillintel.platform.dto.CollaborationDtos.FacultyMatchResultDto;
import com.skillintel.platform.repository.AcademicianRepository;
import com.skillintel.platform.service.FacultyMatchingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final AcademicianRepository academicianRepository;
    private final FacultyMatchingService facultyMatchingService;

    public FacultyController(AcademicianRepository academicianRepository,
                             FacultyMatchingService facultyMatchingService) {
        this.academicianRepository = academicianRepository;
        this.facultyMatchingService = facultyMatchingService;
    }

    @GetMapping
    public ResponseEntity<List<AcademicianDto>> getAllFaculty() {
        List<AcademicianDto> list = academicianRepository.findAll().stream().map(a -> AcademicianDto.builder()
                .id(a.getId())
                .name(a.getUser() != null ? a.getUser().getFullName() : "Dr. Academician")
                .email(a.getUser() != null ? a.getUser().getEmail() : "faculty@institution.edu")
                .institutionName(a.getInstitutionName())
                .department(a.getDepartment())
                .expertise(a.getExpertise())
                .researchAreas(a.getResearchAreas())
                .publications(a.getPublications())
                .projects(a.getProjects())
                .yearsExperience(a.getYearsExperience())
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicianDto> getFacultyById(@PathVariable Long id) {
        Academician a = academicianRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(AcademicianDto.builder()
                .id(a.getId())
                .name(a.getUser() != null ? a.getUser().getFullName() : "Dr. Academician")
                .email(a.getUser() != null ? a.getUser().getEmail() : "faculty@institution.edu")
                .institutionName(a.getInstitutionName())
                .department(a.getDepartment())
                .expertise(a.getExpertise())
                .researchAreas(a.getResearchAreas())
                .publications(a.getPublications())
                .projects(a.getProjects())
                .yearsExperience(a.getYearsExperience())
                .build());
    }

    @GetMapping("/match")
    public ResponseEntity<List<FacultyMatchResultDto>> matchFaculty(@RequestParam(required = false, defaultValue = "Machine Learning Healthcare") String query) {
        return ResponseEntity.ok(facultyMatchingService.matchFaculty(query));
    }
}
