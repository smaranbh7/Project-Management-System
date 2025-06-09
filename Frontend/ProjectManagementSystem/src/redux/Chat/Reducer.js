import * as acttionTypes from './ActionTypes';
const initialState = {
    messages: [],
    chat: null,
    loading: false,
    error: null,
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case acttionTypes.FETCH_MESSAGES_REQUEST:
        case acttionTypes.FETCH_CHAT_MESSAGES_REQUEST:
        case acttionTypes.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case acttionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS:
            return {
                ...state,
                chat: action.chat,
                loading: false,
            };
        case acttionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
        case acttionTypes.FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.messages,
                loading: false,
            };
        case acttionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.message],
                loading: false,
            };
        case acttionTypes.FETCH_CHAT_BY_PROJECT_FAILURE:
        case acttionTypes.FETCH_CHAT_MESSAGES_FAILURE:
        case acttionTypes.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
export default chatReducer;