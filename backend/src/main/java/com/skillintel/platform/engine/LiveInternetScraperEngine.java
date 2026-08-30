package com.skillintel.platform.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * LiveInternetScraperEngine delegates to GeminiLiveScraperService for Gemini API ingestion.
 */
@Component
public class LiveInternetScraperEngine implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(LiveInternetScraperEngine.class);

    @Override
    public void run(String... args) throws Exception {
        log.info("ℹ️ Live internet data scraping and Supabase PostgreSQL ingestion handled by GeminiLiveScraperService.");
    }
}
