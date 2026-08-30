package com.skillintel.platform.repository;

import com.skillintel.platform.domain.StudentAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAssessmentRepository extends JpaRepository<StudentAssessment, Long> {
    List<StudentAssessment> findByStudentProfileId(Long studentProfileId);
}
