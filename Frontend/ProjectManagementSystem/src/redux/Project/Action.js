import api from '../../config/api';
import {
    ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS,
    CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS,
    FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS,
    FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS,
    INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS,
    SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS,
    UPDATE_PROJECT_STATUS_REQUEST, UPDATE_PROJECT_STATUS_SUCCESS, 
    REMOVE_USER_FROM_PROJECT_SUCCESS,
    REMOVE_USER_FROM_PROJECT_REQUEST} from "./ActionTypes";

export const fetchProjects=({category, tag})=>async(dispatch) =>{
    dispatch({ type: FETCH_PROJECTS_REQUEST }); 
    try {
        const { data } = await api.get("/api/projects", {params: {category, tag }});
        console.log("All Projects:", data);
        dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

export const searchProjects=(keyword)=>async(dispatch) =>{
    dispatch({ type: SEARCH_PROJECT_REQUEST });
    try {
        const { data } = await api.get("/api/projects/search?keyword="+keyword);
        console.log("Searched Project:", data);
        dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

export const createProject=(projectData)=>async(dispatch) =>{
    dispatch({ type: CREATE_PROJECT_REQUEST });
    try {
        const { data } = await api.post("/api/projects", projectData);
        console.log("Projects:", data);
        dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
    } catch (error) {
        console.error("Error creating project:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to create project";
        dispatch({ type: CREATE_PROJECT_FAILURE, error: errorMessage });
    }
}

export const fetchProjectById=(projectId)=>async(dispatch) =>{
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
    try {
        const { data } = await api.get("/api/projects/"+projectId);
        console.log("Project:", data);
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

export const deleteProject=(projectId)=>async(dispatch) =>{
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
        const { data } = await api.delete("/api/projects/"+projectId);
        console.log("Deleted Project:", data);
        dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}


export const removeUserFromProject=(projectId, userId)=>async(dispatch) =>{
    dispatch({ type: REMOVE_USER_FROM_PROJECT_REQUEST });
    try {
        const { data } = await api.delete("/api/projects/"+projectId+"/userDelete", {
            data: { userId }
        });
        console.log("User removed from project:", data);
        dispatch({ type: REMOVE_USER_FROM_PROJECT_SUCCESS, project: data });
        return data;
    } catch (error) {
        console.error("Error removing user from project:", error);
        console.error("Error details:", error.response?.data || error.message);
        throw error;
    }
}    

export const inviteToProject=({email, projectId})=>async(dispatch) =>{
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
        const { data } = await api.post("/api/projects/invite", {email, projectId });
        console.log("Invitation sent:", data);
        dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error inviting to project:", error);
    }
}
export const acceptInvitation=({token, navigate})=>async(dispatch) =>{
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
        const { data } = await api.get("/api/projects/accept_invitation", {
             params: { 
                token 
            } 
        });
        navigate("/project/"+data.projectId)
        console.log("Invitation accepted:", data);
        dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error accepting invitation:", error);
    }
}
export const updateProjectStatus=(projectId, status)=>async(dispatch) =>{
    dispatch({ type: UPDATE_PROJECT_STATUS_REQUEST });
    try {
        const { data } = await api.put("/api/projects/"+projectId, { status });
        console.log("Project status updated:", data);
        dispatch({ type: UPDATE_PROJECT_STATUS_SUCCESS, project: data });
        return data;
    } catch (error) {
        console.error("Error updating project status:", error);
        console.error("Error details:", error.response?.data || error.message);
        throw error;
    }
}
    
