package com.skillintel.platform.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestApiController {

    @Value("${ai.api.key:GEMINI_API_KEY_PLACEHOLDER}")
    private String apiKey;

    @GetMapping("/test-openai")
    public Map<String, Object> testOpenAi() {
        Map<String, Object> response = new HashMap<>();

        try {
            HttpClient client = HttpClient.newHttpClient();
            String jsonPayload = """
                {
                    "model": "gemini-2.5-flash",
                    "messages": [{"role": "user", "content": "Say hello!"}]
                }
                """;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());

            response.put("status", httpResponse.statusCode());
            response.put("body", httpResponse.body());
            response.put("working", httpResponse.statusCode() == 200);

        } catch (Exception e) {
            response.put("working", false);
            response.put("error", e.getMessage());
        }

        return response;
    }
}
