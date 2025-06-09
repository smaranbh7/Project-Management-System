import * as actionTypes from './ActionTypes';
import api from '../../config/api';

export const createComment = (commentData) =>async(dispatch) => {
    dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });
    try {
        const response = await api.post('api/comments', commentData);
        console.log('Comment created :', response.data);
        dispatch({
            type: actionTypes.CREATE_COMMENT_SUCCESS,
            comment: response.data,
        });
    } catch (error) {
        console.log('Error creating comment:', error);
        dispatch({
            type: actionTypes.CREATE_COMMENT_FAILURE,
            error: error.message,
        });
    }
}

const deleteComment = (commentId) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_COMMENT_REQUEST });
    try {
        const response = await api.delete(`api/comments/${commentId}`); 
        dispatch({
            type: actionTypes.DELETE_COMMENT_SUCCESS,
             commentId
        });
    } catch (error) {
        console.log('Error deleting comment:', error);
        dispatch({
            type: actionTypes.DELETE_COMMENT_FAILURE,
            error: error.message,
        });
    }
}

export const fetchComments = (issueId) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COMMENTS_REQUEST });
    try {
        const response = await api.get(`api/comments/${issueId}`);
        dispatch({
            type: actionTypes.FETCH_COMMENTS_SUCCESS,
            comments: response.data,
        });
        console.log('Fetched comments:', response.data);
    } catch (error) {
        console.log('Error fetching comments:', error);
        dispatch({
            type: actionTypes.FETCH_COMMENTS_FAILURE,
            error: error.message,
        });
    }
}