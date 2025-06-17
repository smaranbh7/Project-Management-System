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

    @Value("${stripe.price.monthly}")
    private String monthlyPriceId;

    @Value("${stripe.price.annual}")
    private String annualPriceId;

    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Payment controller is working!");
    }

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        try {
            User user = userService.findUserProfileByJwt(jwt);

            // Use the correct price ID for each plan
            String priceId;
            if (planType.equals(PlanType.ANNUALLY)) {
                priceId = annualPriceId;
            } else if (planType.equals(PlanType.MONTHLY)) {
                priceId = monthlyPriceId;
            } else {
                throw new Exception("Invalid plan type: " + planType);
            }

            Stripe.apiKey = apiSecret;

            PaymentLinkCreateParams params = PaymentLinkCreateParams.builder()
                    .addLineItem(
                            PaymentLinkCreateParams.LineItem.builder()
                                    .setPrice(priceId)
                                    .setQuantity(1L)
                                    .build()
                    )
                    .putMetadata("userId", user.getId().toString())
                    .putMetadata("userEmail", user.getEmail())
                    .putMetadata("planType", planType.toString())
                    .setAfterCompletion(
                            PaymentLinkCreateParams.AfterCompletion.builder()
                                    .setType(PaymentLinkCreateParams.AfterCompletion.Type.REDIRECT)
                                    .setRedirect(
                                            PaymentLinkCreateParams.AfterCompletion.Redirect.builder()
                                                    .setUrl("http://localhost:5173/upgrade_plan/success?planType=" + planType + "&userId=" + user.getId())
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
        } catch (Exception e) {
            throw new Exception("Failed to create payment link: " + e.getMessage());
        }
    }
}