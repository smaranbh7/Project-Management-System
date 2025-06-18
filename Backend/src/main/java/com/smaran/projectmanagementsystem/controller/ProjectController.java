package com.smaran.projectmanagementsystem.controller;

import com.smaran.projectmanagementsystem.DTO.ProjectStatusDTO;
import com.smaran.projectmanagementsystem.model.Chat;
import com.smaran.projectmanagementsystem.model.Invitation;
import com.smaran.projectmanagementsystem.model.Project;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.request.InviteRequest;
import com.smaran.projectmanagementsystem.request.UserDeleteRequest;
import com.smaran.projectmanagementsystem.response.MessageResponse;
import com.smaran.projectmanagementsystem.service.InvitationService;
import com.smaran.projectmanagementsystem.service.ProjectService;
import com.smaran.projectmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")

public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(required = false)String category,
            @RequestParam(required = false)String tag,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        List<Project> projects= projectService.getProjectByTeam(user, category, tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        Project project= projectService.getProjectById(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestHeader("Authorization")String jwt,
            @RequestBody Project project

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        Project createdProject= projectService.createProject(project, user);
        return new ResponseEntity<>(createdProject, HttpStatus.OK);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project updatedProject= projectService.updateProject(project, projectId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping ("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        projectService.deleteProject(projectId, user);
        MessageResponse res = new MessageResponse("Project deleted successfully!");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}/userDelete")
    public ResponseEntity<Project> deleteUserFromProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt,
            @RequestBody UserDeleteRequest request
            )throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project project = projectService.getProjectById(projectId);
        
        // Only project owner can remove users
        if (!project.getOwner().getId().equals(user.getId())) {
            throw new Exception("Only project owner can remove team members");
        }
        
        // Prevent owner from removing themselves
        if (request.getUserId().equals(user.getId())) {
            throw new Exception("Project owner cannot remove themselves from the project");
        }
        
        projectService.removeUserToProject(projectId, request.getUserId());
        Project updatedProject = projectService.getProjectById(projectId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(
            @RequestParam(required = false)String keyword,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        List<Project> projects= projectService.searchProject(keyword, user);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatProjectId(
            @PathVariable Long projectId,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        Chat projectChat= projectService.getChatByProjectId(projectId);
        return new ResponseEntity<>(projectChat, HttpStatus.OK);
    }

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(
            @RequestBody InviteRequest req,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        invitationService.sendInvitation(req.getEmail(), req.getProjectId());
        MessageResponse res = new MessageResponse("User invitation sent!");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInviteProject(
            @RequestParam String token,
            @RequestHeader("Authorization")String jwt

    ) throws Exception {
        User user =userService.findUserProfileByJwt(jwt);
        Invitation invitation =invitationService.acceptInvitation(token, user.getId());
        projectService.addUserToProject(invitation.getProjectId(), user.getId());
        return new ResponseEntity<>(invitation, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProjectStatus(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt,
            @RequestBody ProjectStatusDTO statusDTO
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Project updatedProject = projectService.updateProjectStatus(statusDTO.getStatus(), projectId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }


}
