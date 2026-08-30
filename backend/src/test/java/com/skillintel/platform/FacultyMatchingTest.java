package com.skillintel.platform.test;

import com.skillintel.platform.domain.Academician;
import com.skillintel.platform.domain.User;
import com.skillintel.platform.dto.CollaborationDtos.FacultyMatchResultDto;
import com.skillintel.platform.repository.AcademicianRepository;
import com.skillintel.platform.service.FacultyMatchingService;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Proxy;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class FacultyMatchingTest {

    @Test
    void testFacultyMatchingScoreAndReasoning() {
        AcademicianRepository repository = (AcademicianRepository) Proxy.newProxyInstance(
                AcademicianRepository.class.getClassLoader(),
                new Class<?>[]{AcademicianRepository.class},
                (proxy, method, args) -> {
                    if ("findAll".equals(method.getName())) {
                        User user = User.builder().fullName("Dr. Sarah Jenkins").email("sarah.jenkins@nit.edu").build();
                        Academician sarah = Academician.builder()
                                .id(1L)
                                .user(user)
                                .department("Computer Science")
                                .expertise("Machine Learning, Healthcare Analytics")
                                .researchAreas("Distributed AI")
                                .yearsExperience(14)
                                .build();
                        return List.of(sarah);
                    }
                    return null;
                }
        );

        FacultyMatchingService service = new FacultyMatchingService(repository);
        List<FacultyMatchResultDto> matches = service.matchFaculty("Healthcare AI Machine Learning");

        assertNotNull(matches);
        assertEquals(1, matches.size());
        assertEquals(91, matches.get(0).getMatchScore());
        assertTrue(matches.get(0).getMatchedSkills().contains("Machine Learning"));
    }
}
