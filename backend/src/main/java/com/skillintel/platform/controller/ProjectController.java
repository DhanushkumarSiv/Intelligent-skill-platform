package com.skillintel.platform.controller;

import com.skillintel.platform.domain.ProjectEvidence;
import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.dto.ProjectDtos.*;
import com.skillintel.platform.repository.ProjectEvidenceRepository;
import com.skillintel.platform.repository.SkillRepository;
import com.skillintel.platform.repository.StudentProfileRepository;
import com.skillintel.platform.service.EvidenceEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectEvidenceRepository projectRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final SkillRepository skillRepository;
    private final EvidenceEngineService evidenceEngineService;

    public ProjectController(ProjectEvidenceRepository projectRepository,
                             StudentProfileRepository studentProfileRepository,
                             SkillRepository skillRepository,
                             EvidenceEngineService evidenceEngineService) {
        this.projectRepository = projectRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.evidenceEngineService = evidenceEngineService;
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(
            @RequestParam(defaultValue = "1") Long studentProfileId,
            @RequestBody ProjectCreateRequest request) {

        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        ProjectEvidence project = ProjectEvidence.builder()
                .studentProfile(student)
                .name(request.getName())
                .description(request.getDescription())
                .repositoryUrl(request.getRepositoryUrl())
                .technologies(request.getTechnologies())
                .studentRole(request.getStudentRole())
                .durationMonths(request.getDurationMonths())
                .build();

        project = projectRepository.save(project);

        if (request.getTechnologies() != null) {
            String[] techList = request.getTechnologies().split(",");
            for (String tech : techList) {
                String cleanTech = tech.trim();
                Skill skill = skillRepository.findByNameIgnoreCase(cleanTech).orElse(null);
                if (skill != null) {
                    evidenceEngineService.recordProjectEvidence(studentProfileId, skill.getId(), 80, project.getName());
                }
            }
        }

        return ResponseEntity.ok(mapToDto(project));
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<ProjectDto>> getStudentProjects(@PathVariable Long studentProfileId) {
        List<ProjectDto> list = projectRepository.findByStudentProfileId(studentProfileId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    private ProjectDto mapToDto(ProjectEvidence project) {
        List<String> techList = project.getTechnologies() != null
                ? Arrays.stream(project.getTechnologies().split(",")).map(String::trim).collect(Collectors.toList())
                : List.of();

        return ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .repositoryUrl(project.getRepositoryUrl())
                .technologies(techList)
                .studentRole(project.getStudentRole())
                .durationMonths(project.getDurationMonths())
                .createdAt(project.getCreatedAt())
                .build();
    }
}
