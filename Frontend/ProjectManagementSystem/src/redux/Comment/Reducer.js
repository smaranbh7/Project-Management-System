import * as actionTypes from './ActionTypes';

const initialState = {
    comments: [],
    loading: false,
    error: null,
};
export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMMENT_REQUEST:
        case actionTypes.DELETE_COMMENT_REQUEST:
        case actionTypes.FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.comment],
                loading: false,
            };
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.commentId),
                loading: false,
            };
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                loading: false,
            };
        case actionTypes.CREATE_COMMENT_FAILURE:
        case actionTypes.DELETE_COMMENT_FAILURE:
        case actionTypes.FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};