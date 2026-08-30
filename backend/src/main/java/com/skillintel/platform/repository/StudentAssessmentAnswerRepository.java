package com.skillintel.platform.repository;

import com.skillintel.platform.domain.StudentAssessmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAssessmentAnswerRepository extends JpaRepository<StudentAssessmentAnswer, Long> {
    List<StudentAssessmentAnswer> findByStudentAssessmentId(Long studentAssessmentId);
}
