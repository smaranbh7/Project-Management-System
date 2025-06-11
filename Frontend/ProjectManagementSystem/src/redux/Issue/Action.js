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

export const createIssue = (issueData) => async (dispatch) => {
    dispatch({ type: ActionTypes.CREATE_ISSUE_REQUEST });
    try {
        const response = await api.post('api/issues', issueData);
        dispatch({
            type: ActionTypes.CREATE_ISSUE_SUCCESS,
            issue: response.data,
        });
        console.log('Issue created:', response.data);
    } catch (error) {
        console.log('Error creating issue:', error);
        dispatch({
            type: ActionTypes.CREATE_ISSUE_FAILURE,
            error: error.message,
        });
    }
}

export const deleteIssue = (issueId) => async (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_ISSUE_REQUEST });
    try {
        await api.delete(`api/issues/${issueId}`);
        dispatch({
            type: ActionTypes.DELETE_ISSUE_SUCCESS,
            issueId,
        });
        console.log('Issue deleted:', issueId);
    } catch (error) {
        console.log('Error deleting issue:', error);
        dispatch({
            type: ActionTypes.DELETE_ISSUE_FAILURE,
            error: error.message,
        });
    }
}