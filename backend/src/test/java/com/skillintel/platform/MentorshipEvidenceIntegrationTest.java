package com.skillintel.platform.test;

import com.skillintel.platform.domain.*;
import com.skillintel.platform.dto.CollaborationDtos.MentorFeedbackDto;
import com.skillintel.platform.repository.*;
import com.skillintel.platform.service.EvidenceEngineService;
import com.skillintel.platform.service.MentorshipService;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Proxy;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

import static org.junit.jupiter.api.Assertions.*;

class MentorshipEvidenceIntegrationTest {

    @Test
    void testMentorFeedbackGeneratesEvidenceInModule1() {
        AtomicBoolean evidenceRecorded = new AtomicBoolean(false);

        EvidenceEngineService fakeEvidenceEngine = new EvidenceEngineService(null, null, null, null) {
            @Override
            public void recordMentorEvidence(Long studentProfileId, Long skillId, int mentorScore, String mentorNotes) {
                evidenceRecorded.set(true);
            }
        };

        StudentProfileRepository studentRepo = createProxy(StudentProfileRepository.class, (proxy, method, args) -> {
            if ("findById".equals(method.getName())) {
                User u = User.builder().fullName("Alex Chen").build();
                return Optional.of(StudentProfile.builder().id((Long) args[0]).user(u).build());
            }
            return null;
        });

        MentorRepository mentorRepo = createProxy(MentorRepository.class, (proxy, method, args) -> {
            if ("findById".equals(method.getName())) {
                User u = User.builder().fullName("Marcus Vance").build();
                return Optional.of(Mentor.builder().id((Long) args[0]).user(u).build());
            }
            return null;
        });

        SkillRepository skillRepo = createProxy(SkillRepository.class, (proxy, method, args) -> {
            if ("findById".equals(method.getName())) {
                return Optional.of(Skill.builder().id((Long) args[0]).name("Java").build());
            }
            return null;
        });

        MentorFeedbackRepository feedbackRepo = createProxy(MentorFeedbackRepository.class, (proxy, method, args) -> {
            if ("save".equals(method.getName())) {
                MentorFeedback f = (MentorFeedback) args[0];
                f.setId(101L);
                return f;
            }
            return null;
        });

        MentorshipRepository mentorshipRepo = createProxy(MentorshipRepository.class, (proxy, method, args) -> null);

        MentorshipService service = new MentorshipService(mentorRepo, mentorshipRepo, feedbackRepo, studentRepo, skillRepo, fakeEvidenceEngine);
        MentorFeedbackDto dto = service.submitMentorFeedback(1L, 1L, 1L, 88, "Exceptional OOP architecture", "Strong REST design", "Great team communication");

        assertNotNull(dto);
        assertEquals(88, dto.getScore());
        assertTrue(evidenceRecorded.get(), "recordMentorEvidence should have been called on EvidenceEngineService");
    }

    @SuppressWarnings("unchecked")
    private <T> T createProxy(Class<T> interfaceClass, java.lang.reflect.InvocationHandler handler) {
        return (T) Proxy.newProxyInstance(interfaceClass.getClassLoader(), new Class<?>[]{interfaceClass}, handler);
    }
}
