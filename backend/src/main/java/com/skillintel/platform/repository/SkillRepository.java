package com.skillintel.platform.repository;

import com.skillintel.platform.domain.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByCategory(String category);
    Optional<Skill> findByName(String name);
    Optional<Skill> findByNameIgnoreCase(String name);
}
