package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    Optional<Assessment> findByTargetRoleId(Long targetRoleId);
}
