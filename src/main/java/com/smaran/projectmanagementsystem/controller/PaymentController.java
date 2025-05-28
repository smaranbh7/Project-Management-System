package com.smaran.projectmanagementsystem.controller;

import com.smaran.projectmanagementsystem.model.PlanType;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.response.PaymentLinkResponse;
import com.smaran.projectmanagementsystem.service.UserService;
import com.stripe.Stripe;
import com.stripe.model.PaymentLink;
import com.stripe.param.PaymentLinkCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Value("${stripe.api.key}")
    private String apiKey;

    @Value("${stripe.api.secret}")
    private String apiSecret;

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        int amount = 5 * 100;
        if (planType.equals(PlanType.ANNUALLY)) {
            amount = amount * 12;
            amount = (int) (amount * .7); // 30% off
        }

        Stripe.apiKey = apiSecret;

        PaymentLinkCreateParams params = PaymentLinkCreateParams.builder()
                .addLineItem(
                        PaymentLinkCreateParams.LineItem.builder()
                                .setPrice("price_H5ggYwtDq4fbrJ")  // You'll need to create this price in your Stripe dashboard
                                .setQuantity(1L)
                                .build()
                )
                .setCustomerCreation(PaymentLinkCreateParams.CustomerCreation.ALWAYS)
                .setAfterCompletion(
                        PaymentLinkCreateParams.AfterCompletion.builder()
                                .setType(PaymentLinkCreateParams.AfterCompletion.Type.REDIRECT)
                                .setRedirect(
                                        PaymentLinkCreateParams.AfterCompletion.Redirect.builder()
                                                .setUrl("http://localhost:5454/upgrade_plan/success?planType=" + planType)
                                                .build()
                                )
                                .build()
                )
                .build();

        PaymentLink paymentLink = PaymentLink.create(params);

        PaymentLinkResponse res = new PaymentLinkResponse();
        res.setPayment_link_url(paymentLink.getUrl());
        res.setPayment_link_id(paymentLink.getId());

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}