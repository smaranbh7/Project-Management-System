package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.*;
import com.smaran.projectmanagementsystem.repo.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Override
    public Project createProject(Project project, User user) throws Exception {
        Subscription subscription = subscriptionService.getUsersSubscription(user.getId());
        Project createdProject = new Project();

        if(subscription.getPlanType() == PlanType.FREE && user.getProjectSize() >= 3){
            throw new Exception("Free plan allows only 3 projects. Please upgrade to create more.");
        }else{
            createdProject.setOwner(user);
            createdProject.setTags(project.getTags());
            createdProject.setName(project.getName());
            createdProject.setCategory(project.getCategory());
            createdProject.setDescription(project.getDescription());
            createdProject.getTeam().add(user);
            userService.updateUsersProjectSize(user, 1);

            Project savedProject = projectRepository.save(createdProject);

            Chat chat = new Chat();
            chat.setProject(savedProject);  //link project to chat

            Chat projectChat = chatService.createChat(chat);
            savedProject.setChat(projectChat);  //link chat to project

            return savedProject;
        }

    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tag) throws Exception {
        List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);

        //filter category
        if(category!=null){
            projects= projects.stream() // Convert list of projects into a stream to process it
                    .filter(project -> project.getCategory().equals(category)) // Keep only projects where the category matches the given category
                    .collect(Collectors.toList());  // Convert the filtered stream back into a list
        }

        if(tag!=null){
            projects= projects.stream()
                    .filter(project -> project.getTags().contains(tag))
                    .collect(Collectors.toList());
        }

        return projects;
    }

    @Override
    public Project getProjectById(Long projectId) throws Exception {
        Optional<Project> optionalProject = projectRepository.findById(projectId);

        if(optionalProject.isEmpty()){
            throw new Exception("Project not found!");
        }

        return optionalProject.get();
    }

    @Override
    public void deleteProject(Long projectId, User user) throws Exception {
        getProjectById(projectId);
        projectRepository.deleteById(projectId);
        userService.updateUsersProjectSize(user,-1);
    }

    @Override
    public Project updateProject(Project upadtedProject, Long projectId) throws Exception {
        Project project =getProjectById(projectId);
        project.setName(upadtedProject.getName());
        project.setDescription(upadtedProject.getDescription());
        project.setTags(upadtedProject.getTags());

        return projectRepository.save(project);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if(!project.getTeam().contains(user)){
            project.getChat().getUsers().add(user);
            project.getTeam().add(user);
        };

        projectRepository.save(project);

    }

    @Override
    public void removeUserToProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if(project.getTeam().contains(user)){
            project.getChat().getUsers().remove(user);
            project.getTeam().remove(user);
        };

        projectRepository.save(project);

    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {
        Project project = getProjectById(projectId);

        return project.getChat();
    }

    @Override
    public List<Project> searchProject(String keyword, User user) throws Exception {
        List<Project> projects= projectRepository.findByNameContainingAndTeamContains(keyword, user);
        return projects;
    }


    public Project updateProjectStatus(ProjectStatus newStatus, Long projectId) throws Exception {
        Project project = getProjectById(projectId);
        project.setStatus(newStatus);
        return projectRepository.save(project);
    }

}
