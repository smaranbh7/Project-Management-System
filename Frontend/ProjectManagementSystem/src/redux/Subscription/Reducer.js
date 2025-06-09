import * as actionTypes from './ActionTypes';

initialState = {
    userSubscription: null,
    loading: false,
    error: null,
};

export const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_SUBSCRIPTION_REQUEST:
        case actionTypes.UPGRADE_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.GET_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                userSubscription: action.payload,
            };
        case actionTypes.UPGRADE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                userSubscription: action.payload,
            };
        case actionTypes.GET_USER_SUBSCRIPTION_FAILURE:
        case actionTypes.UPGRADE_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
