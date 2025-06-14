import { CheckCircledIcon, StarIcon } from "@radix-ui/react-icons"
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
    <div className={`relative rounded-2xl p-8 w-full max-w-sm transition-all duration-300 hover:scale-105 ${
      data.popular 
        ? 'bg-white/10 backdrop-blur-sm border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20' 
        : 'bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10'
    }`}>
      {/* Popular Badge */}
      {data.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <StarIcon className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{data.planName}</h3>
        {data.description && (
          <p className="text-slate-400 text-sm">{data.description}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">${data.price}</span>
          <span className="text-slate-400">
            /{data.planType === "ANNUALLY" ? "year" : data.planType.toLowerCase()}
          </span>
        </div>
        {data.planType === "ANNUALLY" && (
          <div className="mt-2">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              30% off
            </span>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button  
        onClick={handleUpgrade} 
        disabled={isButtonDisabled}
        className={`w-full h-12 font-medium transition-all duration-200 ${
          isCurrentPlan 
            ? 'bg-slate-600 text-slate-300 cursor-not-allowed' 
            : data.popular
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
            : 'bg-white text-slate-900 hover:bg-white/90'
        }`}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
        )}
        {getButtonText()}
      </Button>

      {/* Features List */}
      <div className="mt-8 space-y-4">
        <h4 className="text-white font-medium text-sm uppercase tracking-wide">What's included:</h4>
        <div className="space-y-3">
          {data.features.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircledIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { SubscriptionCard }
