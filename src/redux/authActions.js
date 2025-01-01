import axios from "axios";
// import {jwt-decode} from "jwt-decode";

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

const API = 'http://localhost:2309/api/auth'

// Login User Implementation Here
export const loginUser = (credentials) => async (dispatch) =>{
    try {
        await axios.post(`${API}/login`, credentials)
        const {token} = response.data;

        const user = jwtDecode(token);

        dispatch({
            type: LOGIN_USER,
            payload : user
        })

        // Saving token to local Storage
        localStorage.setItem('authToken', token)
    } catch (error) {
        console.error("Lognin Failed :", error)
        alert('Invalid Credentials. Please Try Again.')
    }
}

// User Logout Implementation here
const logoutUser = () => (dispatch) =>{
    localStorage.removeItem('authToken');
    dispatch({
        type: LOGOUT_USER,
    })
}