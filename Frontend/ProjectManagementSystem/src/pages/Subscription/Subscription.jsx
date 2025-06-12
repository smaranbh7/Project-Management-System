import { SubscriptionCard } from "./SubscriptionCard"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscription } from "../../redux/Subscription/Action";

const paidPlan = [
    "Add unlimited project",
    "Access to live chat",
    "Add unlimited team member",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Advanced Security"
]

const annualPlan = [
    "Add unlimited project",
    "Access to live chat",
    "Add unlimited team member",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Advanced Security",
    "30% Cost Savings"
]

const freePlan = [
    "Add only 3 projects",
    "Basic Task Management",
    "Project Collaboration",
    "Email Notifications",
    "Basic Access Control"
]

function Subscription() {
    const dispatch = useDispatch();
    const { subscription, auth } = useSelector(store => store);
    
    useEffect(() => {
        if (auth?.user) {
            dispatch(getUserSubscription());
        }
    }, [dispatch, auth?.user]);

    const currentPlan = subscription?.userSubscription?.planType;

    return (
        <div className="p-10">
            <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
            {currentPlan && (
                <div className="text-center mb-8">
                    <p className="text-lg text-gray-400">
                        Current Plan: <span className="text-white font-semibold">{currentPlan}</span>
                    </p>
                </div>
            )}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
                <SubscriptionCard 
                    data={{
                        planName: "Free",
                        features: freePlan,
                        planType: "FREE",
                        price: 0,
                        buttonName: "Get Started"
                    }}
                />
                <SubscriptionCard 
                    data={{
                        planName: "Monthly Paid Plan",
                        features: paidPlan,
                        planType: "MONTHLY",
                        price: 8,
                        buttonName: "Upgrade Now"
                    }}
                />
                <SubscriptionCard
                    data={{
                        planName: "Annual Paid Plan",
                        features: annualPlan,
                        planType: "ANNUALLY",
                        price: 67.20,
                        buttonName: "Upgrade Now"
                    }}
                />
            </div>
        </div>
    )
}

export default Subscription
