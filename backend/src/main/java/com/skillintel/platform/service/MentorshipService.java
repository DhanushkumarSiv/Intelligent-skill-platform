package com.skillintel.platform.service;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.dto.CollaborationDtos.MentorDto;
import com.skillintel.platform.dto.CollaborationDtos.MentorFeedbackDto;
import com.skillintel.platform.dto.CollaborationDtos.MentorshipDto;
import com.skillintel.platform.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MentorshipService {

    private final MentorRepository mentorRepository;
    private final MentorshipRepository mentorshipRepository;
    private final MentorFeedbackRepository mentorFeedbackRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final SkillRepository skillRepository;
    private final EvidenceEngineService evidenceEngineService;

    public MentorshipService(MentorRepository mentorRepository,
                             MentorshipRepository mentorshipRepository,
                             MentorFeedbackRepository mentorFeedbackRepository,
                             StudentProfileRepository studentProfileRepository,
                             SkillRepository skillRepository,
                             EvidenceEngineService evidenceEngineService) {
        this.mentorRepository = mentorRepository;
        this.mentorshipRepository = mentorshipRepository;
        this.mentorFeedbackRepository = mentorFeedbackRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.skillRepository = skillRepository;
        this.evidenceEngineService = evidenceEngineService;
    }

    public List<MentorDto> getAllMentors() {
        return mentorRepository.findAll().stream().map(m -> MentorDto.builder()
                .id(m.getId())
                .name(m.getUser() != null ? m.getUser().getFullName() : "Industry Mentor")
                .companyName(m.getCompany() != null ? m.getCompany().getName() : "Enterprise Partner")
                .title(m.getTitle())
                .expertise(m.getExpertise())
                .availability(m.getAvailability())
                .yearsExperience(m.getYearsExperience())
                .build()).collect(Collectors.toList());
    }

    public List<MentorshipDto> getStudentMentorships(Long studentProfileId) {
        return mentorshipRepository.findByStudentProfileId(studentProfileId).stream().map(m -> MentorshipDto.builder()
                .id(m.getId())
                .mentorName(m.getMentor().getUser() != null ? m.getMentor().getUser().getFullName() : "Mentor")
                .companyName(m.getMentor().getCompany() != null ? m.getMentor().getCompany().getName() : "Company")
                .studentName(m.getStudentProfile().getUser() != null ? m.getStudentProfile().getUser().getFullName() : "Student")
                .skillName(m.getSkill() != null ? m.getSkill().getName() : "General Engineering")
                .status(m.getStatus())
                .startedAt(m.getStartedAt() != null ? m.getStartedAt().toString().substring(0, 10) : "")
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public MentorFeedbackDto submitMentorFeedback(Long studentProfileId, Long mentorId, Long skillId, int score, String comments, String techEval, String softEval) {
        StudentProfile student = studentProfileRepository.findById(studentProfileId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        MentorFeedback feedback = MentorFeedback.builder()
                .studentProfile(student)
                .mentor(mentor)
                .skill(skill)
                .score(score)
                .comments(comments)
                .technicalEvaluation(techEval)
                .softSkillEvaluation(softEval)
                .build();

        feedback = mentorFeedbackRepository.save(feedback);

        // Crucial Integration: Pass new mentor feedback through Module 1 Evidence Engine!
        evidenceEngineService.recordMentorEvidence(studentProfileId, skillId, score, comments);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return MentorFeedbackDto.builder()
                .id(feedback.getId())
                .studentProfileId(student.getId())
                .studentName(student.getUser() != null ? student.getUser().getFullName() : "Alex Chen")
                .mentorId(mentor.getId())
                .mentorName(mentor.getUser() != null ? mentor.getUser().getFullName() : "Industry Mentor")
                .skillId(skill.getId())
                .skillName(skill.getName())
                .score(feedback.getScore())
                .comments(feedback.getComments())
                .technicalEvaluation(feedback.getTechnicalEvaluation())
                .softSkillEvaluation(feedback.getSoftSkillEvaluation())
                .createdAt(feedback.getCreatedAt() != null ? feedback.getCreatedAt().format(formatter) : "")
                .build();
    }

    public List<MentorFeedbackDto> getStudentMentorFeedback(Long studentProfileId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return mentorFeedbackRepository.findByStudentProfileId(studentProfileId).stream().map(f -> MentorFeedbackDto.builder()
                .id(f.getId())
                .studentProfileId(f.getStudentProfile().getId())
                .studentName(f.getStudentProfile().getUser() != null ? f.getStudentProfile().getUser().getFullName() : "Student")
                .mentorId(f.getMentor().getId())
                .mentorName(f.getMentor().getUser() != null ? f.getMentor().getUser().getFullName() : "Mentor")
                .skillId(f.getSkill().getId())
                .skillName(f.getSkill().getName())
                .score(f.getScore())
                .comments(f.getComments())
                .technicalEvaluation(f.getTechnicalEvaluation())
                .softSkillEvaluation(f.getSoftSkillEvaluation())
                .createdAt(f.getCreatedAt() != null ? f.getCreatedAt().format(formatter) : "")
                .build()).collect(Collectors.toList());
    }
}
