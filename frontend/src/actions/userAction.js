import axios from "axios"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, CLEAR_ERRORS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_FAIL } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        let link = `/api/v1/login`;
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(link, { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        let link = `/api/v1/register`;
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(link, userData, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//loading the user

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        let link = `/api/v1/me`;
        const { data } = await axios.get(link);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        let link = `/api/v1/logout`;
        const { data } = await axios.get(link);
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    }
    catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


//update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        let link = `/api/v1/me/update`;
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(link, userData, config);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}





export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });

}