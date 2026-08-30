package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Academician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicianRepository extends JpaRepository<Academician, Long> {
    List<Academician> findByDepartment(String department);
}
