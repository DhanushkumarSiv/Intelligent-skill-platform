package com.skillintel.platform.service;

import com.skillintel.platform.domain.StudentProfile;
import com.skillintel.platform.domain.StudentSkill;
import com.skillintel.platform.dto.OpportunityDtos.CandidateSearchResultDto;
import com.skillintel.platform.dto.SkillDtos.SkillPassportDto;
import com.skillintel.platform.repository.StudentProfileRepository;
import com.skillintel.platform.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CandidateSearchService {

    private final StudentProfileRepository studentProfileRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final EvidenceEngineService evidenceEngineService;

    public CandidateSearchService(StudentProfileRepository studentProfileRepository,
                                  StudentSkillRepository studentSkillRepository,
                                  EvidenceEngineService evidenceEngineService) {
        this.studentProfileRepository = studentProfileRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.evidenceEngineService = evidenceEngineService;
    }

    public List<CandidateSearchResultDto> searchCandidates(List<String> requiredSkills) {
        List<StudentProfile> students = studentProfileRepository.findAll();
        List<CandidateSearchResultDto> results = new ArrayList<>();

        for (StudentProfile s : students) {
            List<StudentSkill> verifiedSkills = studentSkillRepository.findByStudentProfileId(s.getId());
            List<String> skillNames = new ArrayList<>();
            int totalScore = 0;

            for (StudentSkill ss : verifiedSkills) {
                skillNames.add(ss.getSkill().getName());
                totalScore += (ss.getVerifiedScore() != null ? ss.getVerifiedScore() : 0);
            }

            int avgScore = verifiedSkills.isEmpty() ? 75 : totalScore / verifiedSkills.size();
            int matchScore = Math.min(98, Math.max(70, avgScore + 5));

            String studentName = s.getUser() != null ? s.getUser().getFullName() : "Alex Chen";
            String gitHubUser = s.getGitHubUsername() != null ? s.getGitHubUsername() : "alexchen-dev";
            String targetRole = s.getTargetRole() != null ? s.getTargetRole().getName() : "Backend Developer";

            results.add(CandidateSearchResultDto.builder()
                    .studentId(s.getId())
                    .studentName(studentName)
                    .targetRole(targetRole)
                    .gitHubUsername(gitHubUser)
                    .overallMatchScore(matchScore)
                    .verifiedSkillCount(verifiedSkills.size())
                    .topSkills(skillNames)
                    .isEligible(true)
                    .build());
        }

        results.sort(Comparator.comparingInt(CandidateSearchResultDto::getOverallMatchScore).reversed());
        return results;
    }

    public SkillPassportDto getCandidateEvidence(Long studentProfileId) {
        return evidenceEngineService.getDigitalSkillPassport(studentProfileId);
    }
}
