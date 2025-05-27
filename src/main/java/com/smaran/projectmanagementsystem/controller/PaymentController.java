
package com.smaran.projectmanagementsystem.controller;

import com.smaran.projectmanagementsystem.model.PlanType;
import com.smaran.projectmanagementsystem.model.User;
import com.smaran.projectmanagementsystem.response.PaymentLinkResponse;
import com.smaran.projectmanagementsystem.service.UserService;
import com.stripe.StripeClient;
import com.stripe.model.PaymentLink;
import org.json.JSONObject;
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
    ) throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        int amount = 5*100;
        if(planType.equals(PlanType.ANNUALLY)){
            amount = amount *12;
            amount = (int)(amount*.7); //30% off
        }

        StripeClient stripe = new StripeClient(apiSecret);
        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", amount);
        paymentLinkRequest.put("currency", "USD");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail());
        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);
        paymentLinkRequest.put("notify", notify);

        paymentLinkRequest.put("callback_url", "http://localhost:5454/upgrade_plan/success?planType"+planType);

        PaymentLink payment = stripe.paymentLink.create(paymentLinkRequest);


        String paymentLinkId = payment.get("id");
        String paymentLinkUrl= payment("short_url");

        PaymentLinkResponse res = new PaymentLinkResponse();
        res.setPayment_link_url(paymentLinkUrl);
        res.setPayment_link_id(paymentLinkId);

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }
}