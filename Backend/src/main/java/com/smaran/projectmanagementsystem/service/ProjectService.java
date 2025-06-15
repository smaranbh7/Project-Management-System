package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.Chat;
import com.smaran.projectmanagementsystem.model.Project;
import com.smaran.projectmanagementsystem.model.ProjectStatus;
import com.smaran.projectmanagementsystem.model.User;

import java.util.List;

public interface ProjectService {

    Project createProject(Project project, User User) throws Exception;

    List<Project> getProjectByTeam(User user, String category, String tag) throws Exception;

    Project getProjectById(Long projectId) throws Exception;

    void deleteProject(Long projectId, User user) throws Exception;

    Project updateProject(Project upadtedProject, Long projectId) throws Exception;

    void addUserToProject(Long projectId, Long userId) throws Exception;

    void removeUserToProject(Long projectId, Long userId) throws Exception;

    Chat getChatByProjectId(Long projectId) throws Exception;

    List<Project> searchProject(String keyword, User user) throws Exception;

    public Project updateProjectStatus(ProjectStatus newStatus, Long projectId) throws Exception;
}
