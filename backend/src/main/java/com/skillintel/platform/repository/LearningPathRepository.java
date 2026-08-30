package com.skillintel.platform.repository;

import com.skillintel.platform.domain.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
    List<LearningPath> findByStudentProfileId(Long studentProfileId);
    List<LearningPath> findByStudentProfileIdAndSkillId(Long studentProfileId, Long skillId);
}
