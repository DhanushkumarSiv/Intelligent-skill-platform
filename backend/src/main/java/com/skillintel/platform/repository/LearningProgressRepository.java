package com.skillintel.platform.repository;

import com.skillintel.platform.domain.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {
    List<LearningProgress> findByLearningPathIdOrderByStepNumberAsc(Long learningPathId);
}
