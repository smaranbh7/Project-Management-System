import api from "../../config/api";

export const createPayment = async ({ planType }) => {
    try {
        console.log("Creating payment for plan:", planType);
        
        const jwt = localStorage.getItem("jwt");
        console.log("JWT from localStorage:", jwt ? "Present" : "Missing");
        console.log("JWT prefix check:", jwt ? jwt.substring(0, 10) + "..." : "N/A");
        
        if (!jwt) {
            throw new Error("Authentication required. Please log in.");
        }

        if (!planType || (planType !== "MONTHLY" && planType !== "ANNUALLY")) {
            throw new Error("Invalid plan type. Please select a valid plan.");
        }

        console.log("Making API call to:", `/api/payment/${planType}`);
        
        const { data } = await api.post(
            `/api/payment/${planType}`,
            {},
            { 
                timeout: 10000 // 10 second timeout
            }
        );

        console.log("API Response:", data);

        if (data.payment_link_url) {
            console.log("Redirecting to Stripe checkout:", data.payment_link_url);
            window.location.href = data.payment_link_url;
        } else {
            throw new Error("Payment link not received from server.");
        }
    } catch (error) {
        console.error("Full error object:", error);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
        
        let errorMessage = "Failed to create payment. Please try again.";
        
        if (error.response) {
            // Server responded with error
            console.log("Server error status:", error.response.status);
            console.log("Server error data:", error.response.data);
            errorMessage = error.response.data?.message || 
                          `Server error: ${error.response.status}`;
        } else if (error.request) {
            // Network error
            console.log("Network error - no response received");
            errorMessage = "Network error. Please check your connection.";
        } else if (error.message) {
            // Custom error message
            errorMessage = error.message;
        }
        
        alert(errorMessage); // You can replace this with a better notification system
        throw error;
    }
}