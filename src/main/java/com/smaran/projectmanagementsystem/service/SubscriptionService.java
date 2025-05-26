package com.smaran.projectmanagementsystem.service;

import com.smaran.projectmanagementsystem.model.PlanType;
import com.smaran.projectmanagementsystem.model.Subscription;
import com.smaran.projectmanagementsystem.model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    Boolean isValid(Subscription subscription);
}
