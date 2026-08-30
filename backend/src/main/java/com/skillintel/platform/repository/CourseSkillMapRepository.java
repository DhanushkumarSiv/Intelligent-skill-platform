package com.skillintel.platform.repository;

import com.skillintel.platform.domain.CourseSkillMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseSkillMapRepository extends JpaRepository<CourseSkillMap, Long> {
    List<CourseSkillMap> findBySkillId(Long skillId);
    List<CourseSkillMap> findByCourseId(Long courseId);
}
