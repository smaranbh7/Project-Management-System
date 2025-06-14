import { Card } from '../../components/ui/card'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserSubscription, upgradeSubscription } from '../../redux/Subscription/Action';

function UpgradeSuccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subscription } = useSelector(store => store);
    const queryParams = new URLSearchParams(window.location.search);

    const planType = queryParams.get("planType");
    const userId = queryParams.get("userId");

    useEffect(() => {
        if (planType) {
            dispatch(upgradeSubscription({ planType }));
            dispatch(getUserSubscription());
        }
    }, [dispatch, planType]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

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
            
            <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircledIcon className="w-10 h-10 text-green-400" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-3">
                            Plan Upgraded Successfully!
                        </h1>
                        <p className="text-slate-400">
                            Welcome to your new subscription plan. You now have access to all premium features.
                        </p>
                    </div>

                    {/* Plan Details */}
                    <div className="space-y-4 mb-8">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400 text-sm">Plan Type</span>
                                <span className="text-white font-medium">
                                    {subscription.userSubscription?.planType || planType}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400 text-sm">Start Date</span>
                                <span className="text-green-400 text-sm">
                                    {formatDate(subscription.userSubscription?.subscriptionStartDate)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">End Date</span>
                                <span className="text-orange-400 text-sm">
                                    {formatDate(subscription.userSubscription?.subscriptionEndDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                        onClick={() => navigate("/")} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium"
                    >
                        Continue to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpgradeSuccess
