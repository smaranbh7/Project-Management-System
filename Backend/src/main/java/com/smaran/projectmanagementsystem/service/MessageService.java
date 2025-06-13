package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.Message;

import java.util.List;

public interface MessageService {

    Message sendMessage(Long senderId, Long chatId, String content) throws Exception;

    List<Message> getMessageByProjectId(Long projectId) throws Exception;

    List<Message> getMessageByChatId(Long chatId) throws Exception;
}
