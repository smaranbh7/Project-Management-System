package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.Chat;
import com.smaran.projectmanagementsystem.model.Message;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.repo.MessageRepository;
import com.smaran.projectmanagementsystem.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new Exception("User not found with id: "+ senderId));

        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);
        Message savedMessage= messageRepository.save(message);

        chat.getMessages().add(savedMessage);
        return savedMessage;
    }

    @Override
    public List<Message> getMessageByProjectId(Long projectId) throws Exception {
        Chat chat = projectService.getChatByProjectId(projectId);
        if (chat == null) {
            throw new Exception("Chat not found for project ID: " + projectId);
        }
        List<Message> findByChatIdOrderByCreatedAtAsc = messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
        return findByChatIdOrderByCreatedAtAsc;
    }

    @Override
    public List<Message> getMessageByChatId(Long chatId) throws Exception {
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chatId);
    }
}
