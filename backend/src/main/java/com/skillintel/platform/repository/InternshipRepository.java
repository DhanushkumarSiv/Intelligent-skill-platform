package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Internship;
import com.skillintel.platform.domain.enums.InternshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByStudentProfileId(Long studentProfileId);
    List<Internship> findByStatus(InternshipStatus status);
}
