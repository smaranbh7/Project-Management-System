package com.smaran.projectmanagementsystem.controller;

import com.smaran.projectmanagementsystem.model.PlanType;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.response.PaymentLinkResponse;
import com.smaran.projectmanagementsystem.service.UserService;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${stripe.api.secret}")
    private String apiSecret;

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        Stripe.apiKey = apiSecret;

        User user = userService.findUserProfileByJwt(jwt);

        int amount = 5 * 100;
        if (planType == PlanType.ANNUALLY) {
            amount *= 12;
            amount *= 0.7; // 30% off
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount((long) amount)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(planType.name() + " Plan")
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5454/upgrade_plan/success?planType=" + planType)
                .setCancelUrl("http://localhost:5454/upgrade_plan/cancel")
                .build();

        Session session = Session.create(params);

        PaymentLinkResponse response = new PaymentLinkResponse();
        response.setPayment_link_url(session.getUrl());
        response.setPayment_link_id(session.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
