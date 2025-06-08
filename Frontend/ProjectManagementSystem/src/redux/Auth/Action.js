import { API_BASE_URL } from "../../config/api"
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGEISTER_REQUEST, REGEISTER_SUCCESS } from "./ActionTypes"
import axios from "axios"

export const register=userData=>async(dispatch) =>{
    dispatch({type:REGEISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt)
            dispatch({type:REGEISTER_SUCCESS, payload:data})
        }
        console.log("Register success", data)
    } catch (error) {
        console.log(error)
    }
}

export const login=userData=>async(dispatch) =>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, userData)
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt)
            dispatch({type:LOGIN_SUCCESS, payload:data})
        }
        console.log("Login success", data)
    } catch (error) {
        console.log(error)
    }
}

export const getUser=()=>async(dispatch) =>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwt")}`
            }
        })
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt)
            dispatch({type:GET_USER_SUCCESS, payload:data})
        }
        console.log("Login success", data)
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => async(dispatch)=>{
    dispatch({type:LOGOUT})
    localStorage.clear();
}