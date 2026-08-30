package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Mentorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipRepository extends JpaRepository<Mentorship, Long> {
    List<Mentorship> findByStudentProfileId(Long studentProfileId);
    List<Mentorship> findByMentorId(Long mentorId);
}
