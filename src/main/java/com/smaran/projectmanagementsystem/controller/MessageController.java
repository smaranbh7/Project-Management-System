package com.smaran.projectmanagementsystem.controller;

import com.smaran.projectmanagementsystem.model.Chat;
import com.smaran.projectmanagementsystem.model.Message;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.request.CreateMessageRequest;
import com.smaran.projectmanagementsystem.service.MessageService;
import com.smaran.projectmanagementsystem.service.ProjectService;
import com.smaran.projectmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestBody CreateMessageRequest request,
            @RequestHeader("Authorization") String jwt
            ) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();
        if(chats == null){
            throw  new Exception("Chats not found");
        }

        Message sendMessage = messageService.sendMessage(user.getId(), request.getProjectId(), request.getContent());
        return ResponseEntity.ok(sendMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(
            @PathVariable Long projectId
    ) throws Exception{
        List<Message> messages = messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}
