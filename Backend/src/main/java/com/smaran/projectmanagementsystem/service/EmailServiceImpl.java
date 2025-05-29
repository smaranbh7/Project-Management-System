package com.smaran.projectmanagementsystem.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmailWithToken(String userEmail, String link) throws MessagingException {
        // creates a blank email message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        //creates helper object to set up the subject, body, recipient, attachments
        //UTF-8 encoding for support of special characters and symbols
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String subject = "Join Project Team Invitation";
        String text = "Click the link to join the project team: "+ link;

        helper.setSubject(subject);
        helper.setText(text, true);
        helper.setTo(userEmail);  //send to particular email

        try{
            javaMailSender.send(mimeMessage);
        }catch (MailSendException e){
            throw new MailSendException("Failed to send email");
        }
    }
}
