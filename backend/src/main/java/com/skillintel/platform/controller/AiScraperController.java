package com.skillintel.platform.controller;

import com.skillintel.platform.domain.Academician;
import com.skillintel.platform.domain.Course;
import com.skillintel.platform.domain.Opportunity;
import com.skillintel.platform.service.AiDataScraperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiScraperController {

    private final AiDataScraperService scraperService;

    public AiScraperController(AiDataScraperService scraperService) {
        this.scraperService = scraperService;
    }

    @PostMapping("/configure-key")
    public ResponseEntity<Map<String, String>> configureKey(@RequestBody Map<String, String> payload) {
        String apiKey = payload.get("apiKey");
        if (apiKey != null && !apiKey.isBlank()) {
            scraperService.setAiApiKey(apiKey);
        }
        Map<String, String> res = new HashMap<>();
        res.put("status", "SUCCESS");
        res.put("message", "AI API Key configured successfully for live web scraping.");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/scrape/jobs")
    public ResponseEntity<List<Opportunity>> scrapeJobs() {
        List<Opportunity> jobs = scraperService.scrapeRealWorldJobs();
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/scrape/courses")
    public ResponseEntity<List<Course>> scrapeCourses() {
        List<Course> courses = scraperService.scrapeRealWorldCourses();
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/scrape/faculty")
    public ResponseEntity<List<Academician>> scrapeFaculty() {
        List<Academician> faculty = scraperService.scrapeRealWorldFaculty();
        return ResponseEntity.ok(faculty);
    }
}
