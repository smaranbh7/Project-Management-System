package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.Chat;
import com.smaran.projectmanagementsystem.repo.ChatRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService{

    private ChatRepository chatRepository;

    @Override
    public Chat createChat(Chat chat) {
        return chatRepository.save(chat);
    }
}
