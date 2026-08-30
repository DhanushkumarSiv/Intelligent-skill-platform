package com.skillintel.platform.repository;

import com.skillintel.platform.domain.CertificateEvidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateEvidenceRepository extends JpaRepository<CertificateEvidence, Long> {
    List<CertificateEvidence> findByStudentProfileId(Long studentProfileId);
}
