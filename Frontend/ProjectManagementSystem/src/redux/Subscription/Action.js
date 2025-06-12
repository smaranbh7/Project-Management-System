import * as actionTypes from './ActionTypes';
import api from '../../config/api';

export const getUserSubscription = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_SUBSCRIPTION_REQUEST });
    try {
        const response = await api.get('api/subscriptions/user', {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        });
        dispatch({
            type: actionTypes.GET_USER_SUBSCRIPTION_SUCCESS,
            payload: response.data,
        });
        console.log('Fetched user subscription:', response.data);
    } catch (error) {
        console.log('Error fetching user subscription:', error);
        dispatch({
            type: actionTypes.GET_USER_SUBSCRIPTION_FAILURE,
            payload: error.message,
        });
    }
}

export const upgradeSubscription = ({planType}) => async (dispatch) => {
    dispatch({ type: actionTypes.UPGRADE_SUBSCRIPTION_REQUEST });
    try {
        const response = await api.patch('api/subscriptions/upgrade',null,  { 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("jwt")}` 
            },
            params : {
                planType: planType,
             },
        });
        dispatch({
            type: actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS,
            payload: response.data,
        });
        console.log('Subscription upgraded successfully:', response.data);
    } catch (error) {
        console.log('Error upgrading subscription:', error);
        dispatch({
            type: actionTypes.UPGRADE_SUBSCRIPTION_FAILURE,
            payload: error.message,
        });
    }
}
