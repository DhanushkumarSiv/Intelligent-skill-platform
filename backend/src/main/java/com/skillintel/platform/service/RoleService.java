package com.skillintel.platform.service;

import com.skillintel.platform.domain.RoleSkill;
import com.skillintel.platform.domain.TargetRole;
import com.skillintel.platform.dto.SkillDtos.RoleSkillDto;
import com.skillintel.platform.dto.SkillDtos.TargetRoleDto;
import com.skillintel.platform.repository.RoleSkillRepository;
import com.skillintel.platform.repository.TargetRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final TargetRoleRepository roleRepository;
    private final RoleSkillRepository roleSkillRepository;

    public RoleService(TargetRoleRepository roleRepository, RoleSkillRepository roleSkillRepository) {
        this.roleRepository = roleRepository;
        this.roleSkillRepository = roleSkillRepository;
    }

    public List<TargetRoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(role -> getRoleById(role.getId()))
                .collect(Collectors.toList());
    }

    public TargetRoleDto getRoleById(Long roleId) {
        TargetRole role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found with ID " + roleId));

        List<RoleSkill> roleSkills = roleSkillRepository.findByRoleId(roleId);

        List<RoleSkillDto> reqSkills = roleSkills.stream().map(rs -> RoleSkillDto.builder()
                .skillId(rs.getSkill().getId())
                .skillName(rs.getSkill().getName())
                .category(rs.getSkill().getCategory())
                .importance(rs.getImportance())
                .minimumLevel(rs.getMinimumLevel())
                .build()).collect(Collectors.toList());

        return TargetRoleDto.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .category(role.getCategory())
                .requiredSkills(reqSkills)
                .build();
    }
}
