package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Collaboration;
import com.skillintel.platform.domain.enums.CollaborationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
    List<Collaboration> findByType(CollaborationType type);
    List<Collaboration> findByCompanyId(Long companyId);
}
