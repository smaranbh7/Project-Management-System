package com.smaran.projectmanagementsystem.controller;

import com.smaran.projectmanagementsystem.DTO.IssueDTO;
import com.smaran.projectmanagementsystem.model.Issue;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.repo.IssueRepository;
import com.smaran.projectmanagementsystem.request.IssueRequest;
import com.smaran.projectmanagementsystem.response.MessageResponse;
import com.smaran.projectmanagementsystem.service.IssueService;
import com.smaran.projectmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;
    @Autowired
    private IssueRepository issueRepository;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(
            @PathVariable Long issueId

    ) throws Exception{
        return ResponseEntity.ok(issueService.getIssueById(issueId));

    }

    @GetMapping("project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(
            @PathVariable Long projectId

    ) throws Exception{
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));

    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(
            @RequestBody IssueRequest issue,
            @RequestHeader("Authorization")String jwt
            ) throws Exception{
        User tokenUser = userService.findUserProfileByJwt(jwt);
        User user = userService.findUserById(tokenUser.getId());

        Issue createdIssue = issueService.createIssue(issue, tokenUser);
        //Coping response to DTO (filtered response)
        IssueDTO issueDTO = new IssueDTO();
        issueDTO.setDescription(createdIssue.getDescription());
        issueDTO.setDueDate(createdIssue.getDueDate());
        issueDTO.setId(createdIssue.getId());
        issueDTO.setPriority(createdIssue.getPriority());
        issueDTO.setProjectId(createdIssue.getProjectId());
        issueDTO.setStatus(createdIssue.getStatus());
        issueDTO.setTitle(createdIssue.getTitle());
        issueDTO.setAssignee(createdIssue.getAssignee());

        return ResponseEntity.ok(issueDTO);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(
            @PathVariable Long issueId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        issueService.deleteIssue(issueId, user.getId());

        MessageResponse res = new MessageResponse();
        res.setMessage("Issue deleted!");

        return ResponseEntity.ok(res);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(
            @PathVariable Long issueId,
            @PathVariable Long userId
    ) throws Exception{
        Issue issue = issueService.addUserToIssue(issueId, userId);

        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(
            @PathVariable Long issueId,
            @PathVariable String status
    ) throws Exception{
        Issue issue=issueService.updateStatus(issueId,status);

        return ResponseEntity.ok(issue);
    }
}
