package com.skillintel.platform.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectDtos {

    public static class ProjectCreateRequest {
        private String name;
        private String description;
        private String repositoryUrl;
        private String technologies;
        private String studentRole;
        private Integer durationMonths;

        public ProjectCreateRequest() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getRepositoryUrl() { return repositoryUrl; }
        public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }
        public String getTechnologies() { return technologies; }
        public void setTechnologies(String technologies) { this.technologies = technologies; }
        public String getStudentRole() { return studentRole; }
        public void setStudentRole(String studentRole) { this.studentRole = studentRole; }
        public Integer getDurationMonths() { return durationMonths; }
        public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
    }

    public static class ProjectDto {
        private Long id;
        private String name;
        private String description;
        private String repositoryUrl;
        private List<String> technologies;
        private String studentRole;
        private Integer durationMonths;
        private LocalDateTime createdAt;

        public ProjectDto() {}
        public ProjectDto(Long id, String name, String description, String repositoryUrl, List<String> technologies, String studentRole, Integer durationMonths, LocalDateTime createdAt) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.repositoryUrl = repositoryUrl;
            this.technologies = technologies;
            this.studentRole = studentRole;
            this.durationMonths = durationMonths;
            this.createdAt = createdAt;
        }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private Long id;
            private String name;
            private String description;
            private String repositoryUrl;
            private List<String> technologies;
            private String studentRole;
            private Integer durationMonths;
            private LocalDateTime createdAt;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder name(String name) { this.name = name; return this; }
            public Builder description(String description) { this.description = description; return this; }
            public Builder repositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; return this; }
            public Builder technologies(List<String> technologies) { this.technologies = technologies; return this; }
            public Builder studentRole(String studentRole) { this.studentRole = studentRole; return this; }
            public Builder durationMonths(Integer durationMonths) { this.durationMonths = durationMonths; return this; }
            public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

            public ProjectDto build() {
                return new ProjectDto(id, name, description, repositoryUrl, technologies, studentRole, durationMonths, createdAt);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getRepositoryUrl() { return repositoryUrl; }
        public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }
        public List<String> getTechnologies() { return technologies; }
        public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
        public String getStudentRole() { return studentRole; }
        public void setStudentRole(String studentRole) { this.studentRole = studentRole; }
        public Integer getDurationMonths() { return durationMonths; }
        public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
