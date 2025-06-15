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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>
            
            {/* Blue accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 p-6 lg:p-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Unlock the full potential of your project management with our flexible pricing options
                    </p>
                </div>

                {/* Current Plan Badge */}
            {currentPlan && (
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                            <p className="text-slate-300">
                                Current Plan: <span className="text-blue-400 font-semibold">{currentPlan}</span>
                    </p>
                        </div>
                </div>
            )}

                {/* Pricing Cards */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-7xl mx-auto">
                <SubscriptionCard 
                    data={{
                        planName: "Free",
                        features: freePlan,
                        planType: "FREE",
                        price: 0,
                            buttonName: "Get Started",
                            description: "Perfect for getting started"
                    }}
                />
                <SubscriptionCard 
                    data={{
                            planName: "Monthly Pro",
                        features: paidPlan,
                        planType: "MONTHLY",
                        price: 8,
                            buttonName: "Upgrade Now",
                            description: "Best for small teams",
                            popular: true
                    }}
                />
                <SubscriptionCard
                    data={{
                            planName: "Annual Pro",
                        features: annualPlan,
                        planType: "ANNUALLY",
                        price: 67.20,
                            buttonName: "Upgrade Now",
                            description: "Best value for growing teams"
                    }}
                />
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Need a custom solution?
                        </h3>
                        <p className="text-slate-400 mb-6">
                            Contact our sales team for enterprise pricing and custom features tailored to your organization's needs.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
