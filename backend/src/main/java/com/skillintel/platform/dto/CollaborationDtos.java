package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.CollaborationType;
import com.skillintel.platform.domain.enums.InternshipStatus;

import java.util.List;

public class CollaborationDtos {

    public static class AcademicianDto {
        private Long id;
        private String name;
        private String email;
        private String institutionName;
        private String department;
        private String expertise;
        private String researchAreas;
        private String publications;
        private String projects;
        private Integer yearsExperience;

        public AcademicianDto() {}
        public AcademicianDto(Long id, String name, String email, String institutionName, String department, String expertise, String researchAreas, String publications, String projects, Integer yearsExperience) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.institutionName = institutionName;
            this.department = department;
            this.expertise = expertise;
            this.researchAreas = researchAreas;
            this.publications = publications;
            this.projects = projects;
            this.yearsExperience = yearsExperience;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String name;
            private String email;
            private String institutionName;
            private String department;
            private String expertise;
            private String researchAreas;
            private String publications;
            private String projects;
            private Integer yearsExperience;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder email(String email) { this.email = email; return this; }
            public Builder institutionName(String institutionName) { this.institutionName = institutionName; return this; }
            public Builder department(String department) { this.department = department; return this; }
            public Builder expertise(String expertise) { this.expertise = expertise; return this; }
            public Builder researchAreas(String researchAreas) { this.researchAreas = researchAreas; return this; }
            public Builder publications(String publications) { this.publications = publications; return this; }
            public Builder projects(String projects) { this.projects = projects; return this; }
            public Builder yearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; return this; }

            public AcademicianDto build() {
                return new AcademicianDto(id, name, email, institutionName, department, expertise, researchAreas, publications, projects, yearsExperience);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getInstitutionName() { return institutionName; }
        public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public String getExpertise() { return expertise; }
        public void setExpertise(String expertise) { this.expertise = expertise; }
        public String getResearchAreas() { return researchAreas; }
        public void setResearchAreas(String researchAreas) { this.researchAreas = researchAreas; }
        public String getPublications() { return publications; }
        public void setPublications(String publications) { this.publications = publications; }
        public String getProjects() { return projects; }
        public void setProjects(String projects) { this.projects = projects; }
        public Integer getYearsExperience() { return yearsExperience; }
        public void setYearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; }
    }

    public static class CollaborationDto {
        private Long id;
        private String companyName;
        private String title;
        private String description;
        private CollaborationType type;
        private String requirements;
        private String startDate;
        private String endDate;
        private String status;
        private List<String> skills;

        public CollaborationDto() {}
        public CollaborationDto(Long id, String companyName, String title, String description, CollaborationType type, String requirements, String startDate, String endDate, String status, List<String> skills) {
            this.id = id;
            this.companyName = companyName;
            this.title = title;
            this.description = description;
            this.type = type;
            this.requirements = requirements;
            this.startDate = startDate;
            this.endDate = endDate;
            this.status = status;
            this.skills = skills;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String companyName;
            private String title;
            private String description;
            private CollaborationType type;
            private String requirements;
            private String startDate;
            private String endDate;
            private String status;
            private List<String> skills;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder companyName(String companyName) { this.companyName = companyName; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder type(CollaborationType type) { this.type = type; return this; }
            public Builder requirements(String requirements) { this.requirements = requirements; return this; }
            public Builder startDate(String startDate) { this.startDate = startDate; return this; }
            public Builder endDate(String endDate) { this.endDate = endDate; return this; }
            public Builder status(String status) { this.status = status; return this; }
            public Builder skills(List<String> skills) { this.skills = skills; return this; }

            public CollaborationDto build() {
                return new CollaborationDto(id, companyName, title, description, type, requirements, startDate, endDate, status, skills);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public CollaborationType getType() { return type; }
        public void setType(CollaborationType type) { this.type = type; }
        public String getRequirements() { return requirements; }
        public void setRequirements(String requirements) { this.requirements = requirements; }
        public String getStartDate() { return startDate; }
        public void setStartDate(String startDate) { this.startDate = startDate; }
        public String getEndDate() { return endDate; }
        public void setEndDate(String endDate) { this.endDate = endDate; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public List<String> getSkills() { return skills; }
        public void setSkills(List<String> skills) { this.skills = skills; }
    }

    public static class FacultyMatchResultDto {
        private Long academicianId;
        private String facultyName;
        private String department;
        private String expertise;
        private String researchAreas;
        private Integer matchScore;
        private List<String> matchedSkills;
        private String reasoning;

        public FacultyMatchResultDto() {}
        public FacultyMatchResultDto(Long academicianId, String facultyName, String department, String expertise, String researchAreas, Integer matchScore, List<String> matchedSkills, String reasoning) {
            this.academicianId = academicianId;
            this.facultyName = facultyName;
            this.department = department;
            this.expertise = expertise;
            this.researchAreas = researchAreas;
            this.matchScore = matchScore;
            this.matchedSkills = matchedSkills;
            this.reasoning = reasoning;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long academicianId;
            private String facultyName;
            private String department;
            private String expertise;
            private String researchAreas;
            private Integer matchScore;
            private List<String> matchedSkills;
            private String reasoning;

            public Builder academicianId(Long academicianId) { this.academicianId = academicianId; return this; }
            public Builder facultyName(String facultyName) { this.facultyName = facultyName; return this; }
            public Builder department(String department) { this.department = department; return this; }
            public Builder expertise(String expertise) { this.expertise = expertise; return this; }
            public Builder researchAreas(String researchAreas) { this.researchAreas = researchAreas; return this; }
            public Builder matchScore(Integer matchScore) { this.matchScore = matchScore; return this; }
            public Builder matchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; return this; }
            public Builder reasoning(String reasoning) { this.reasoning = reasoning; return this; }

            public FacultyMatchResultDto build() {
                return new FacultyMatchResultDto(academicianId, facultyName, department, expertise, researchAreas, matchScore, matchedSkills, reasoning);
            }
        }

        public Long getAcademicianId() { return academicianId; }
        public void setAcademicianId(Long academicianId) { this.academicianId = academicianId; }
        public String getFacultyName() { return facultyName; }
        public void setFacultyName(String facultyName) { this.facultyName = facultyName; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public String getExpertise() { return expertise; }
        public void setExpertise(String expertise) { this.expertise = expertise; }
        public String getResearchAreas() { return researchAreas; }
        public void setResearchAreas(String researchAreas) { this.researchAreas = researchAreas; }
        public Integer getMatchScore() { return matchScore; }
        public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
        public List<String> getMatchedSkills() { return matchedSkills; }
        public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }
        public String getReasoning() { return reasoning; }
        public void setReasoning(String reasoning) { this.reasoning = reasoning; }
    }

    public static class MentorDto {
        private Long id;
        private String name;
        private String companyName;
        private String title;
        private String expertise;
        private String availability;
        private Integer yearsExperience;

        public MentorDto() {}
        public MentorDto(Long id, String name, String companyName, String title, String expertise, String availability, Integer yearsExperience) {
            this.id = id;
            this.name = name;
            this.companyName = companyName;
            this.title = title;
            this.expertise = expertise;
            this.availability = availability;
            this.yearsExperience = yearsExperience;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String name;
            private String companyName;
            private String title;
            private String expertise;
            private String availability;
            private Integer yearsExperience;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder companyName(String companyName) { this.companyName = companyName; return this; }
            public Builder title(String title) { this.title = title; return this; }
            public Builder expertise(String expertise) { this.expertise = expertise; return this; }
            public Builder availability(String availability) { this.availability = availability; return this; }
            public Builder yearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; return this; }

            public MentorDto build() {
                return new MentorDto(id, name, companyName, title, expertise, availability, yearsExperience);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getExpertise() { return expertise; }
        public void setExpertise(String expertise) { this.expertise = expertise; }
        public String getAvailability() { return availability; }
        public void setAvailability(String availability) { this.availability = availability; }
        public Integer getYearsExperience() { return yearsExperience; }
        public void setYearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; }
    }

    public static class MentorshipDto {
        private Long id;
        private String mentorName;
        private String companyName;
        private String studentName;
        private String skillName;
        private String status;
        private String startedAt;

        public MentorshipDto() {}
        public MentorshipDto(Long id, String mentorName, String companyName, String studentName, String skillName, String status, String startedAt) {
            this.id = id;
            this.mentorName = mentorName;
            this.companyName = companyName;
            this.studentName = studentName;
            this.skillName = skillName;
            this.status = status;
            this.startedAt = startedAt;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String mentorName;
            private String companyName;
            private String studentName;
            private String skillName;
            private String status;
            private String startedAt;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder mentorName(String mentorName) { this.mentorName = mentorName; return this; }
            public Builder companyName(String companyName) { this.companyName = companyName; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder status(String status) { this.status = status; return this; }
            public Builder startedAt(String startedAt) { this.startedAt = startedAt; return this; }

            public MentorshipDto build() {
                return new MentorshipDto(id, mentorName, companyName, studentName, skillName, status, startedAt);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getMentorName() { return mentorName; }
        public void setMentorName(String mentorName) { this.mentorName = mentorName; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getStartedAt() { return startedAt; }
        public void setStartedAt(String startedAt) { this.startedAt = startedAt; }
    }

    public static class MentorFeedbackDto {
        private Long id;
        private Long studentProfileId;
        private String studentName;
        private Long mentorId;
        private String mentorName;
        private Long skillId;
        private String skillName;
        private Integer score;
        private String comments;
        private String technicalEvaluation;
        private String softSkillEvaluation;
        private String createdAt;

        public MentorFeedbackDto() {}
        public MentorFeedbackDto(Long id, Long studentProfileId, String studentName, Long mentorId, String mentorName, Long skillId, String skillName, Integer score, String comments, String technicalEvaluation, String softSkillEvaluation, String createdAt) {
            this.id = id;
            this.studentProfileId = studentProfileId;
            this.studentName = studentName;
            this.mentorId = mentorId;
            this.mentorName = mentorName;
            this.skillId = skillId;
            this.skillName = skillName;
            this.score = score;
            this.comments = comments;
            this.technicalEvaluation = technicalEvaluation;
            this.softSkillEvaluation = softSkillEvaluation;
            this.createdAt = createdAt;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private Long studentProfileId;
            private String studentName;
            private Long mentorId;
            private String mentorName;
            private Long skillId;
            private String skillName;
            private Integer score;
            private String comments;
            private String technicalEvaluation;
            private String softSkillEvaluation;
            private String createdAt;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder studentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder mentorId(Long mentorId) { this.mentorId = mentorId; return this; }
            public Builder mentorName(String mentorName) { this.mentorName = mentorName; return this; }
            public Builder skillId(Long skillId) { this.skillId = skillId; return this; }
            public Builder skillName(String skillName) { this.skillName = skillName; return this; }
            public Builder score(Integer score) { this.score = score; return this; }
            public Builder comments(String comments) { this.comments = comments; return this; }
            public Builder technicalEvaluation(String technicalEvaluation) { this.technicalEvaluation = technicalEvaluation; return this; }
            public Builder softSkillEvaluation(String softSkillEvaluation) { this.softSkillEvaluation = softSkillEvaluation; return this; }
            public Builder createdAt(String createdAt) { this.createdAt = createdAt; return this; }

            public MentorFeedbackDto build() {
                return new MentorFeedbackDto(id, studentProfileId, studentName, mentorId, mentorName, skillId, skillName, score, comments, technicalEvaluation, softSkillEvaluation, createdAt);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        public Long getMentorId() { return mentorId; }
        public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
        public String getMentorName() { return mentorName; }
        public void setMentorName(String mentorName) { this.mentorName = mentorName; }
        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }
        public String getSkillName() { return skillName; }
        public void setSkillName(String skillName) { this.skillName = skillName; }
        public Integer getScore() { return score; }
        public void setScore(Integer score) { this.score = score; }
        public String getComments() { return comments; }
        public void setComments(String comments) { this.comments = comments; }
        public String getTechnicalEvaluation() { return technicalEvaluation; }
        public void setTechnicalEvaluation(String technicalEvaluation) { this.technicalEvaluation = technicalEvaluation; }
        public String getSoftSkillEvaluation() { return softSkillEvaluation; }
        public void setSoftSkillEvaluation(String softSkillEvaluation) { this.softSkillEvaluation = softSkillEvaluation; }
        public String getCreatedAt() { return createdAt; }
        public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    }

    public static class InternshipDto {
        private Long id;
        private Long studentProfileId;
        private String studentName;
        private String companyName;
        private String opportunityTitle;
        private String mentorName;
        private String startDate;
        private String endDate;
        private InternshipStatus status;
        private String completionStatus;

        public InternshipDto() {}
        public InternshipDto(Long id, Long studentProfileId, String studentName, String companyName, String opportunityTitle, String mentorName, String startDate, String endDate, InternshipStatus status, String completionStatus) {
            this.id = id;
            this.studentProfileId = studentProfileId;
            this.studentName = studentName;
            this.companyName = companyName;
            this.opportunityTitle = opportunityTitle;
            this.mentorName = mentorName;
            this.startDate = startDate;
            this.endDate = endDate;
            this.status = status;
            this.completionStatus = completionStatus;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private Long studentProfileId;
            private String studentName;
            private String companyName;
            private String opportunityTitle;
            private String mentorName;
            private String startDate;
            private String endDate;
            private InternshipStatus status;
            private String completionStatus;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder studentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; return this; }
            public Builder studentName(String studentName) { this.studentName = studentName; return this; }
            public Builder companyName(String companyName) { this.companyName = companyName; return this; }
            public Builder opportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; return this; }
            public Builder mentorName(String mentorName) { this.mentorName = mentorName; return this; }
            public Builder startDate(String startDate) { this.startDate = startDate; return this; }
            public Builder endDate(String endDate) { this.endDate = endDate; return this; }
            public Builder status(InternshipStatus status) { this.status = status; return this; }
            public Builder completionStatus(String completionStatus) { this.completionStatus = completionStatus; return this; }

            public InternshipDto build() {
                return new InternshipDto(id, studentProfileId, studentName, companyName, opportunityTitle, mentorName, startDate, endDate, status, completionStatus);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getOpportunityTitle() { return opportunityTitle; }
        public void setOpportunityTitle(String opportunityTitle) { this.opportunityTitle = opportunityTitle; }
        public String getMentorName() { return mentorName; }
        public void setMentorName(String mentorName) { this.mentorName = mentorName; }
        public String getStartDate() { return startDate; }
        public void setStartDate(String startDate) { this.startDate = startDate; }
        public String getEndDate() { return endDate; }
        public void setEndDate(String endDate) { this.endDate = endDate; }
        public InternshipStatus getStatus() { return status; }
        public void setStatus(InternshipStatus status) { this.status = status; }
        public String getCompletionStatus() { return completionStatus; }
        public void setCompletionStatus(String completionStatus) { this.completionStatus = completionStatus; }
    }
}
