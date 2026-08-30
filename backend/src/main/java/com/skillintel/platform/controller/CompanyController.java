package com.skillintel.platform.controller;

import com.skillintel.platform.domain.Company;
import com.skillintel.platform.dto.OpportunityDtos.CompanyDto;
import com.skillintel.platform.repository.CompanyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {
        List<CompanyDto> list = companyRepository.findAll().stream().map(c -> CompanyDto.builder()
                .id(c.getId())
                .name(c.getName())
                .industry(c.getIndustry())
                .description(c.getDescription())
                .website(c.getWebsite())
                .location(c.getLocation())
                .verified(c.getVerified())
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<CompanyDto> createCompany(@RequestBody Company company) {
        Company saved = companyRepository.save(company);
        return ResponseEntity.ok(CompanyDto.builder()
                .id(saved.getId())
                .name(saved.getName())
                .industry(saved.getIndustry())
                .description(saved.getDescription())
                .website(saved.getWebsite())
                .location(saved.getLocation())
                .verified(saved.getVerified())
                .build());
    }
}
