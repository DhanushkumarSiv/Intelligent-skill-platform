package com.skillintel.platform.repository;

import com.skillintel.platform.domain.TargetRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TargetRoleRepository extends JpaRepository<TargetRole, Long> {
    Optional<TargetRole> findByNameIgnoreCase(String name);
}
