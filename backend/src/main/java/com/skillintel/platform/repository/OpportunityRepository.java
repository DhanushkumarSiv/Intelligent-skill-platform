package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.domain.enums.OpportunityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    List<Opportunity> findByStatus(String status);
    List<Opportunity> findByType(OpportunityType type);
    List<Opportunity> findByCompanyId(Long companyId);
}
