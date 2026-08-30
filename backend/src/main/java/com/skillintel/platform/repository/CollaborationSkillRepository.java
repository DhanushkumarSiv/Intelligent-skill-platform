package com.skillintel.platform.repository;

import com.skillintel.platform.domain.CollaborationSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollaborationSkillRepository extends JpaRepository<CollaborationSkill, Long> {
    List<CollaborationSkill> findByCollaborationId(Long collaborationId);
}
