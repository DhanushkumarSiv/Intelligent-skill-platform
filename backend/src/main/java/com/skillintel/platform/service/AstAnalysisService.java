package com.skillintel.platform.service;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.expr.AnnotationExpr;
import com.skillintel.platform.dto.GitHubDtos.AstEvidenceDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AstAnalysisService {

    public List<AstEvidenceDto> analyzeJavaCode(String filePath, String sourceCode) {
        List<AstEvidenceDto> findings = new ArrayList<>();
        try {
            CompilationUnit cu = StaticJavaParser.parse(sourceCode);

            // Check class declarations
            cu.findAll(ClassOrInterfaceDeclaration.class).forEach(cid -> {
                boolean hasController = false;
                boolean hasService = false;
                boolean hasRepository = false;
                boolean hasEntity = false;

                for (AnnotationExpr annotation : cid.getAnnotations()) {
                    String name = annotation.getNameAsString();
                    if ("RestController".equals(name) || "Controller".equals(name)) {
                        hasController = true;
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("@RestController")
                                .mappedSkill("REST API")
                                .codeDepthLevel(30)
                                .detail("REST API controller endpoint class detected: " + cid.getNameAsString())
                                .build());
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("@RestController")
                                .mappedSkill("Spring Boot")
                                .codeDepthLevel(30)
                                .detail("Spring Web Controller class: " + cid.getNameAsString())
                                .build());
                    } else if ("Service".equals(name)) {
                        hasService = true;
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("@Service")
                                .mappedSkill("Spring Boot")
                                .codeDepthLevel(20)
                                .detail("Business service component: " + cid.getNameAsString())
                                .build());
                    } else if ("Repository".equals(name)) {
                        hasRepository = true;
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("@Repository")
                                .mappedSkill("SQL")
                                .codeDepthLevel(20)
                                .detail("Spring Data Data Access Repository: " + cid.getNameAsString())
                                .build());
                    } else if ("Entity".equals(name) || "Table".equals(name)) {
                        hasEntity = true;
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("@Entity")
                                .mappedSkill("SQL")
                                .codeDepthLevel(20)
                                .detail("JPA Database Entity mapping: " + cid.getNameAsString())
                                .build());
                    }
                }

                // Check implemented interfaces e.g. JpaRepository
                cid.getExtendedTypes().forEach(extendedType -> {
                    String typeName = extendedType.getNameAsString();
                    if (typeName.contains("JpaRepository") || typeName.contains("CrudRepository")) {
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("JpaRepository")
                                .mappedSkill("Spring Boot")
                                .codeDepthLevel(25)
                                .detail("JpaRepository interface abstraction implemented: " + cid.getNameAsString())
                                .build());
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("JpaRepository")
                                .mappedSkill("SQL")
                                .codeDepthLevel(25)
                                .detail("ORM JPA Repository interface mapping: " + cid.getNameAsString())
                                .build());
                    }
                });
            });

            // Check method declarations for Security or Transactional
            cu.findAll(MethodDeclaration.class).forEach(md -> {
                md.getAnnotations().forEach(ann -> {
                    String name = ann.getNameAsString();
                    if ("Transactional".equals(name)) {
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("@Transactional")
                                .mappedSkill("SQL")
                                .codeDepthLevel(15)
                                .detail("ACID Database transaction boundary: " + md.getNameAsString())
                                .build());
                    } else if ("Bean".equals(name) && md.getTypeAsString().contains("SecurityFilterChain")) {
                        findings.add(AstEvidenceDto.builder()
                                .filePath(filePath)
                                .annotationOrConstruct("SecurityFilterChain")
                                .mappedSkill("Java")
                                .codeDepthLevel(35)
                                .detail("Spring Security Authorization filter chain configured in " + md.getNameAsString())
                                .build());
                    }
                });
            });

        } catch (Exception e) {
            // Non-parseable Java snippet fallback
        }
        return findings;
    }

    /**
     * Calculates code depth level deterministically across detected AST patterns.
     * Only Dependency: 10
     * Controller: 30
     * Controller + Service: 50
     * Controller + Service + Repository + Entity: 70
     * Controller + Service + Repository + Entity + Security: 90+
     */
    public Map<String, Integer> calculateDepthScores(List<AstEvidenceDto> astFindings) {
        Map<String, Integer> scores = new HashMap<>();
        Map<String, Boolean> controllerFound = new HashMap<>();
        Map<String, Boolean> serviceFound = new HashMap<>();
        Map<String, Boolean> repoFound = new HashMap<>();
        Map<String, Boolean> securityFound = new HashMap<>();

        for (AstEvidenceDto f : astFindings) {
            String skill = f.getMappedSkill();
            String construct = f.getAnnotationOrConstruct();

            if ("@RestController".equals(construct)) controllerFound.put(skill, true);
            if ("@Service".equals(construct)) serviceFound.put(skill, true);
            if ("@Repository".equals(construct) || "JpaRepository".equals(construct) || "@Entity".equals(construct)) repoFound.put(skill, true);
            if ("SecurityFilterChain".equals(construct)) securityFound.put(skill, true);
        }

        // Compute scores
        List<String> targetSkills = List.of("Java", "Spring Boot", "REST API", "SQL");
        for (String skill : targetSkills) {
            int score = 0;
            boolean c = controllerFound.getOrDefault(skill, false);
            boolean s = serviceFound.getOrDefault(skill, false);
            boolean r = repoFound.getOrDefault(skill, false);
            boolean sec = securityFound.getOrDefault(skill, false);

            if (c) score += 30;
            if (s) score += 20;
            if (r) score += 20;
            if (sec) score += 20;

            if (score > 0) {
                scores.put(skill, Math.min(score, 95));
            }
        }
        return scores;
    }
}
