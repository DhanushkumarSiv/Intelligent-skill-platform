package com.skillintel.platform.repository;

import com.skillintel.platform.domain.SkillEvidenceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillEvidenceRecordRepository extends JpaRepository<SkillEvidenceRecord, Long> {
    List<SkillEvidenceRecord> findByStudentSkillId(Long studentSkillId);
    List<SkillEvidenceRecord> findByStudentSkillStudentProfileId(Long studentProfileId);
}
