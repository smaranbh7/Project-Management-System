package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.Issue;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.request.IssueRequest;


import java.util.List;
import java.util.Optional;

public interface IssueService {

    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issue, User user) throws Exception;

    Optional<Issue> updateIssue(Long issueId, IssueRequest updatedIssue, Long userId) throws Exception;

    void deleteIssue(Long issueId, Long userId) throws Exception;;

    Issue addUserToIssue(Long issueId, Long userId) throws Exception;;

    Issue updateStatus(Long issueId, String status) throws Exception;

}
