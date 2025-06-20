import api from '../../config/api';
import * as actionTypes from './ActionTypes'

export const sendMessage=(messageData)=> async (dispatch) => {
        dispatch({type: actionTypes.SEND_MESSAGE_REQUEST});
        try{
            const response = await api.post("/api/messages/send", messageData);
            dispatch({
                type: actionTypes.SEND_MESSAGE_SUCCESS,
                message: response.data
            });
            console.log("Message sent successfully:", response.data);
        }catch(error){
            console.error("Error sending message:", error);
            dispatch({
                type: actionTypes.SEND_MESSAGE_FAILURE,
                error: error.message,
            });
        }
} 

export const fetchChatByProject = (projectId) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });
    try {
        const response = await api.get(`/api/projects/${projectId}/chat`);
        dispatch({
            type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
            chat: response.data
        });
    } catch (error) {
        console.error("Error fetching chat by project ID:", error);
        dispatch({
            type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
            error: error.message,
        });
    }
}

export const fetchChatMessages = (chatId) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });
    try {
        const token = localStorage.getItem('token');
        if (!chatId) {
            throw new Error('Chat ID is required');
        }
        const response = await api.get(`/api/messages/chat/${chatId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Chat Messages:", response.data);
        dispatch({
            type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
            messages: response.data
        });
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        dispatch({
            type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
            error: error.message,
        });
    }
}
