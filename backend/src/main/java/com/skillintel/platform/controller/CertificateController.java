package com.skillintel.platform.controller;

import com.skillintel.platform.domain.CertificateEvidence;
import com.skillintel.platform.domain.Skill;
import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.dto.CertificateDtos.CertificateDto;
import com.skillintel.platform.repository.CertificateEvidenceRepository;
import com.skillintel.platform.repository.SkillRepository;
import com.skillintel.platform.repository.StudentProfileRepository;
import com.skillintel.platform.service.CertificateParsingService;
import com.skillintel.platform.service.EvidenceEngineService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    private final CertificateParsingService pdfParsingService;
    private final CertificateEvidenceRepository certificateRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final SkillRepository skillRepository;
    private final EvidenceEngineService evidenceEngineService;

    public CertificateController(CertificateParsingService pdfParsingService,
                                 CertificateEvidenceRepository certificateRepository,
                                 StudentProfileRepository studentProfileRepository,
                                 SkillRepository skillRepository,
                                 EvidenceEngineService evidenceEngineService) {
        this.pdfParsingService = pdfParsingService;
        this.certificateRepository = certificateRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.evidenceEngineService = evidenceEngineService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CertificateDto> uploadCertificate(
            @RequestParam(defaultValue = "1") Long studentProfileId,
            @RequestParam("file") MultipartFile file) {

        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        CertificateDto parsed;
        try {
            parsed = pdfParsingService.parsePdfCertificate(file.getInputStream(), file.getOriginalFilename());
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse certificate PDF: " + e.getMessage());
        }

        CertificateEvidence cert = CertificateEvidence.builder()
                .studentProfile(student)
                .issuer(parsed.getIssuer())
                .courseName(parsed.getCourseName())
                .studentName(parsed.getStudentName())
                .credentialId(parsed.getCredentialId())
                .issueDate(parsed.getIssueDate())
                .verificationStatus(parsed.getVerificationStatus())
                .extractedText(parsed.getExtractedText())
                .fileUrl(file.getOriginalFilename())
                .build();

        cert = certificateRepository.save(cert);
        parsed.setId(cert.getId());

        for (String skillName : parsed.getMatchedSkills()) {
            Skill skill = skillRepository.findByNameIgnoreCase(skillName).orElse(null);
            if (skill != null) {
                evidenceEngineService.recordCertificateEvidence(studentProfileId, skill.getId(), 75, cert.getCourseName());
            }
        }

        return ResponseEntity.ok(parsed);
    }

    @GetMapping("/student/{studentProfileId}")
    public ResponseEntity<List<CertificateDto>> getStudentCertificates(@PathVariable Long studentProfileId) {
        List<CertificateDto> list = certificateRepository.findByStudentProfileId(studentProfileId).stream()
                .map(c -> CertificateDto.builder()
                        .id(c.getId())
                        .issuer(c.getIssuer())
                        .courseName(c.getCourseName())
                        .studentName(c.getStudentName())
                        .credentialId(c.getCredentialId())
                        .issueDate(c.getIssueDate())
                        .verificationStatus(c.getVerificationStatus())
                        .extractedText(c.getExtractedText())
                        .createdAt(c.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}
