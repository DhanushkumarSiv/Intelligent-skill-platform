package com.skillintel.platform.seed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Static DataSeeder has been retired and replaced by LiveInternetScraperEngine.java.
 * Live internet data scraping and dynamic DB ingestion are executed autonomously via LiveInternetScraperEngine.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Override
    public void run(String... args) throws Exception {
        log.info("ℹ️ Static DataSeeder disabled. All live datasets are autonomously scraped and managed by LiveInternetScraperEngine.");
    }
}
