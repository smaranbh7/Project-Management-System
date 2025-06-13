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
        <div className='flex justify-center'>
            <Card className="mt-20 p-5 space-y-5 flex flex-col items-center max-w-md w-full">
                <div className='flex items-center gap-4'>
                    <CheckCircledIcon className='h-9 w-9 text-green-500'/>
                    <p className='text-xl'>Plan Upgraded Successfully!</p>
                </div>
                <div className='space-y-3 text-center'>
                    <p className='text-green-500'>
                        Start date: {formatDate(subscription.userSubscription?.subscriptionStartDate)}
                    </p>
                    <p className='text-red-500'>
                        End date: {formatDate(subscription.userSubscription?.subscriptionEndDate)}
                    </p>
                    <p>
                        Plan Type: {subscription.userSubscription?.planType || planType}
                    </p>
                </div>
                <Button onClick={() => navigate("/")} className="w-full">
                    Go to Home
                </Button>
            </Card>
        </div>
    )
}

export default UpgradeSuccess
