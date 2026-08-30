package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Application;
import com.skillintel.platform.domain.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentProfileId(Long studentProfileId);
    List<Application> findByOpportunityId(Long opportunityId);
    List<Application> findByOpportunityIdAndStatus(Long opportunityId, ApplicationStatus status);
}
