package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.domain.enums.EvidenceSource;
import com.skillintel.platform.domain.enums.VerificationStatus;
import com.skillintel.platform.dto.SkillDtos.*;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EvidenceEngineService {

    private final StudentProfileRepository studentProfileRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final SkillRepository skillRepository;
    private final SkillEvidenceRecordRepository evidenceRecordRepository;

    private static final double WEIGHT_ASSESSMENT = 0.40;
    private static final double WEIGHT_GITHUB = 0.30;
    private static final double WEIGHT_PROJECT = 0.15;
    private static final double WEIGHT_CERTIFICATE = 0.10;
    private static final double WEIGHT_INSTITUTION = 0.05;

    public EvidenceEngineService(StudentProfileRepository studentProfileRepository,
                                 StudentSkillRepository studentSkillRepository,
                                 SkillRepository skillRepository,
                                 SkillEvidenceRecordRepository evidenceRecordRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.skillRepository = skillRepository;
        this.evidenceRecordRepository = evidenceRecordRepository;
    }

    @Transactional
    public void recordAssessmentEvidence(Long studentProfileId, Long skillId, int assessmentScore) {
        StudentSkill studentSkill = getOrCreateStudentSkill(studentProfileId, skillId);
        studentSkill.setAssessmentScore(assessmentScore);

        saveEvidenceRecord(studentSkill, EvidenceSource.ASSESSMENT, assessmentScore, WEIGHT_ASSESSMENT,
                "Skill Assessment evaluation score: " + assessmentScore + "/100");

        recalculateVerifiedScore(studentSkill);
    }

    @Transactional
    public void recordGitHubEvidence(Long studentProfileId, Long skillId, int githubScore, String details) {
        StudentSkill studentSkill = getOrCreateStudentSkill(studentProfileId, skillId);
        studentSkill.setEvidenceScore(githubScore);

        saveEvidenceRecord(studentSkill, EvidenceSource.GITHUB_AST, githubScore, WEIGHT_GITHUB, details);

        recalculateVerifiedScore(studentSkill);
    }

    @Transactional
    public void recordProjectEvidence(Long studentProfileId, Long skillId, int projectScore, String projectName) {
        StudentSkill studentSkill = getOrCreateStudentSkill(studentProfileId, skillId);

        saveEvidenceRecord(studentSkill, EvidenceSource.PROJECT, projectScore, WEIGHT_PROJECT,
                "Project Evidence from '" + projectName + "' (score: " + projectScore + ")");

        recalculateVerifiedScore(studentSkill);
    }

    @Transactional
    public void recordCertificateEvidence(Long studentProfileId, Long skillId, int certScore, String certName) {
        StudentSkill studentSkill = getOrCreateStudentSkill(studentProfileId, skillId);

        saveEvidenceRecord(studentSkill, EvidenceSource.CERTIFICATE, certScore, WEIGHT_CERTIFICATE,
                "PDF Certificate Verified: " + certName + " (score: " + certScore + ")");

        recalculateVerifiedScore(studentSkill);
    }

    @Transactional
    public void recordMentorEvidence(Long studentProfileId, Long skillId, int mentorScore, String mentorNotes) {
        StudentSkill studentSkill = getOrCreateStudentSkill(studentProfileId, skillId);

        saveEvidenceRecord(studentSkill, EvidenceSource.MENTOR, mentorScore, WEIGHT_INSTITUTION,
                "Industry Mentor Feedback: " + mentorNotes + " (score: " + mentorScore + ")");

        recalculateVerifiedScore(studentSkill);
    }

    private void saveEvidenceRecord(StudentSkill studentSkill, EvidenceSource source, int score, double weight, String details) {
        SkillEvidenceRecord record = SkillEvidenceRecord.builder()
                .studentSkill(studentSkill)
                .source(source)
                .score(score)
                .weight(weight)
                .details(details)
                .build();
        evidenceRecordRepository.save(record);
    }

    @Transactional
    public void recalculateVerifiedScore(StudentSkill studentSkill) {
        List<SkillEvidenceRecord> records = evidenceRecordRepository.findByStudentSkillId(studentSkill.getId());

        double weightedSum = 0.0;
        double totalWeight = 0.0;

        for (SkillEvidenceRecord record : records) {
            weightedSum += record.getScore() * record.getWeight();
            totalWeight += record.getWeight();
        }

        int calculatedScore = totalWeight > 0 ? (int) Math.round(weightedSum / totalWeight) : 0;
        if (studentSkill.getSelfDeclaredScore() != null && records.isEmpty()) {
            calculatedScore = studentSkill.getSelfDeclaredScore();
        }

        studentSkill.setVerifiedScore(calculatedScore);

        long distinctSources = records.stream().map(SkillEvidenceRecord::getSource).distinct().count();

        if (calculatedScore >= 70 && distinctSources >= 2) {
            studentSkill.setVerificationStatus(VerificationStatus.VERIFIED);
        } else if (records.stream().anyMatch(r -> r.getSource() == EvidenceSource.GITHUB_AST || r.getSource() == EvidenceSource.PROJECT)) {
            studentSkill.setVerificationStatus(VerificationStatus.EVIDENCE_FOUND);
        } else if (studentSkill.getAssessmentScore() != null && studentSkill.getAssessmentScore() > 0) {
            studentSkill.setVerificationStatus(VerificationStatus.ASSESSED);
        } else {
            studentSkill.setVerificationStatus(VerificationStatus.SELF_DECLARED);
        }

        studentSkill.setLastVerifiedAt(LocalDateTime.now());
        studentSkillRepository.save(studentSkill);
    }

    public SkillPassportDto getDigitalSkillPassport(Long studentProfileId) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentProfileId(studentProfileId);

        List<StudentSkillDto> skillDtos = studentSkills.stream().map(ss -> {
            List<SkillEvidenceRecord> records = evidenceRecordRepository.findByStudentSkillId(ss.getId());
            List<SkillEvidenceDto> evidenceDtos = records.stream().map(r -> SkillEvidenceDto.builder()
                    .id(r.getId())
                    .source(r.getSource())
                    .score(r.getScore())
                    .weight(r.getWeight())
                    .details(r.getDetails())
                    .createdAt(r.getCreatedAt())
                    .build()).collect(Collectors.toList());

            return StudentSkillDto.builder()
                    .id(ss.getId())
                    .skillId(ss.getSkill().getId())
                    .skillName(ss.getSkill().getName())
                    .category(ss.getSkill().getCategory())
                    .selfDeclaredScore(ss.getSelfDeclaredScore())
                    .assessmentScore(ss.getAssessmentScore())
                    .evidenceScore(ss.getEvidenceScore())
                    .verifiedScore(ss.getVerifiedScore())
                    .verificationStatus(ss.getVerificationStatus())
                    .lastVerifiedAt(ss.getLastVerifiedAt())
                    .evidenceList(evidenceDtos)
                    .build();
        }).collect(Collectors.toList());

        int verifiedCount = (int) studentSkills.stream()
                .filter(s -> s.getVerificationStatus() == VerificationStatus.VERIFIED)
                .count();

        double avgScore = studentSkills.stream()
                .mapToInt(s -> s.getVerifiedScore() != null ? s.getVerifiedScore() : 0)
                .average()
                .orElse(0.0);

        return SkillPassportDto.builder()
                .studentId(student.getId())
                .studentName(student.getUser().getFullName())
                .targetRole(student.getTargetRole() != null ? student.getTargetRole().getName() : "Backend Developer")
                .gitHubUsername(student.getGitHubUsername())
                .overallPassportScore((int) Math.round(avgScore))
                .totalVerifiedSkills(verifiedCount)
                .skills(skillDtos)
                .lastUpdatedAt(LocalDateTime.now())
                .build();
    }

    private StudentSkill getOrCreateStudentSkill(Long studentProfileId, Long skillId) {
        return studentSkillRepository.findByStudentProfileIdAndSkillId(studentProfileId, skillId)
                .orElseGet(() -> {
                    StudentProfile profile = studentProfileRepository.findById(studentProfileId)
                            .orElseThrow(() -> new RuntimeException("Student not found"));
                    Skill skill = skillRepository.findById(skillId)
                            .orElseThrow(() -> new RuntimeException("Skill not found"));

                    StudentSkill newSkill = StudentSkill.builder()
                            .studentProfile(profile)
                            .skill(skill)
                            .selfDeclaredScore(40)
                            .verificationStatus(VerificationStatus.SELF_DECLARED)
                            .build();
                    return studentSkillRepository.save(newSkill);
                });
    }
}
