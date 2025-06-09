import * as ActionTypes from './ActionTypes';
import api from '../../config/api';

export const fetchIssues = (id) => async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_ISSUES_REQUEST });
    try {
        const response = await api.get(`api/issues/project/${id}`);
        dispatch({
            type: ActionTypes.FETCH_ISSUES_SUCCESS,
            issues: response.data,
        });
        console.log('Fetched issues:', response.data);
    } catch (error) {
        console.log('Error fetching issues:', error);
        dispatch({
            type: ActionTypes.FETCH_ISSUES_FAILURE,
            error: error.message,
        });
    }
}

export const fetchIssueById = (id) => async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_ISSUES_BY_ID_REQUEST });
    try {
        const response = await api.get(`api/issues/${id}`);
        dispatch({
            type: ActionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
            issues: response.data,
        });
        console.log('Fetched issue by ID:', response.data);
    } catch (error) {
        console.log('Error fetching issue by ID:', error);
        dispatch({
            type: ActionTypes.FETCH_ISSUES_BY_ID_FAILURE,
            error: error.message,
        });
    }
}

export const updateIssueStatus =({id, status}) => async (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
        const response = await api.put(`api/issues/${id}/status/${ status }`);
        dispatch({
            type: ActionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
            issues: response.data,
        });
        console.log('Issue status updated:', response.data);
    } catch (error) {
        console.log('Error updating issue status:', error);
        dispatch({
            type: ActionTypes.UPDATE_ISSUE_STATUS_FAILURE,
            error: error.message,
        });
    }
}

export const assignedUserToIssue = ({issueId, userId}) => async (dispatch) => {
    dispatch({ type: ActionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
        const response = await api.put(`api/issues/${issueId}/assignee/${userId}`);
        dispatch({
            type: ActionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
            issue: response.data,
        });
        console.log('User assigned to issue:', response.data);
    } catch (error) {
        console.log('Error assigning user to issue:', error);
        dispatch({
            type: ActionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
            error: error.message,
        });
    }
}