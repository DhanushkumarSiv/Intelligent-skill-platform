package com.skillintel.platform.controller;

import com.skillintel.platform.dto.SkillDtos.RoleSkillDto;
import com.skillintel.platform.dto.SkillDtos.TargetRoleDto;
import com.skillintel.platform.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<TargetRoleDto>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TargetRoleDto> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @GetMapping("/{id}/skills")
    public ResponseEntity<List<RoleSkillDto>> getRoleSkills(@PathVariable Long id) {
        TargetRoleDto role = roleService.getRoleById(id);
        return ResponseEntity.ok(role.getRequiredSkills());
    }
}
