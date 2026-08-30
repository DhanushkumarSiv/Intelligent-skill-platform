package com.skillintel.platform.repository;

import com.skillintel.platform.domain.MentorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorFeedbackRepository extends JpaRepository<MentorFeedback, Long> {
    List<MentorFeedback> findByStudentProfileId(Long studentProfileId);
}
