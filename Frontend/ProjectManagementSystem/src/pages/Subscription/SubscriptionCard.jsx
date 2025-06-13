import { CheckCircledIcon } from "@radix-ui/react-icons"
import { Button } from "../../components/ui/button"
import { createPayment } from "../../redux/Payment/Action";
import { useState } from "react";
import { useSelector } from "react-redux";

function SubscriptionCard({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const { subscription, auth } = useSelector(store => store);
  
  const currentPlan = subscription?.userSubscription?.planType;
  const isCurrentPlan = currentPlan === data.planType;
  const isFreeAndCurrentlyFree = data.planType === "FREE" && currentPlan === "FREE";
  
  const handleUpgrade = async () => {
    if (isCurrentPlan || !auth?.user) {
      return;
    }
    
    if (data.planType === "FREE") {
      alert("You're already on a paid plan. Contact support to downgrade.");
      return;
    }
    
    try {
      setIsLoading(true);
      await createPayment({
        planType: data.planType
      });
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan) {
      return "Current Plan";
    }
    if (data.planType === "FREE") {
      return isFreeAndCurrentlyFree ? "Current Plan" : "Downgrade";
    }
    if (isLoading) {
      return "Processing...";
    }
    return data.buttonName || "Upgrade";
  };

  const isButtonDisabled = isCurrentPlan || isLoading || (data.planType === "FREE" && currentPlan !== "FREE");

  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
        <p className="text-lg font-semibold">{data.planName}</p>
        <p>
            <span className="text-xl font-semibold">${data.price}/</span>
            <span className="text-sm text-gray-400">{data.planType.toLowerCase()}</span>
        </p>
        {data.planType === "ANNUALLY" && <p className="text-green-500 text-sm">30% off</p>}

        <Button  
          onClick={handleUpgrade} 
          disabled={isButtonDisabled}
          className={`w-full ${isCurrentPlan ? 'bg-gray-600 text-gray-300' : 'bg-white text-black hover:bg-white/90'}`}
        >
            {getButtonText()}
        </Button>
        <div className="space-y-2">
           {data.features.map((item) => (
             <div key={item} className="flex items-center gap-2">
                <CheckCircledIcon className="h-4 w-4 text-green-500" />
                <p className="text-sm">{item}</p>
             </div>
           ))}
        </div>
    </div>
  )
}

export { SubscriptionCard }
