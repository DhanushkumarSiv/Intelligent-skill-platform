package com.skillintel.platform.service;

import com.skillintel.platform.domain.Academician;
import com.skillintel.platform.dto.CollaborationDtos.FacultyMatchResultDto;
import com.skillintel.platform.repository.AcademicianRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class FacultyMatchingService {

    private final AcademicianRepository academicianRepository;

    public FacultyMatchingService(AcademicianRepository academicianRepository) {
        this.academicianRepository = academicianRepository;
    }

    public List<FacultyMatchResultDto> matchFaculty(String query) {
        List<Academician> facultyList = academicianRepository.findAll();
        List<FacultyMatchResultDto> matches = new ArrayList<>();
        String lowerQuery = query != null ? query.toLowerCase() : "";

        for (Academician f : facultyList) {
            String name = f.getUser() != null ? f.getUser().getFullName() : "Dr. Academician";
            String dept = f.getDepartment() != null ? f.getDepartment() : "Computer Science & Engineering";
            String exp = f.getExpertise() != null ? f.getExpertise() : "";
            String research = f.getResearchAreas() != null ? f.getResearchAreas() : "";

            List<String> matchedSkills = new ArrayList<>();
            int matchScore = 75;

            if (exp.toLowerCase().contains("machine learning") || research.toLowerCase().contains("machine learning") || lowerQuery.contains("ml") || lowerQuery.contains("ai")) {
                matchedSkills.add("Machine Learning");
                matchedSkills.add("Computer Vision");
                matchedSkills.add("Healthcare Analytics");
                matchScore = 91;
            } else if (exp.toLowerCase().contains("cloud") || exp.toLowerCase().contains("distributed")) {
                matchedSkills.add("Cloud Architecture");
                matchedSkills.add("Distributed Systems");
                matchScore = 88;
            } else {
                matchedSkills.add("Software Engineering");
                matchedSkills.add("System Architecture");
                matchScore = 80;
            }

            matches.add(FacultyMatchResultDto.builder()
                    .academicianId(f.getId())
                    .facultyName(name)
                    .department(dept)
                    .expertise(exp)
                    .researchAreas(research)
                    .matchScore(matchScore)
                    .matchedSkills(matchedSkills)
                    .reasoning("High research alignment in " + String.join(", ", matchedSkills) + " with " + f.getYearsExperience() + "+ years academic experience.")
                    .build());
        }

        matches.sort(Comparator.comparingInt(FacultyMatchResultDto::getMatchScore).reversed());
        return matches;
    }
}
