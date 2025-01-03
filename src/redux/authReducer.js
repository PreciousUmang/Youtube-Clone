import { LOGIN_USER, LOGOUT_USER } from "./authActions";

const initialState = {
    user : null,
    isAuthenticated : false
};

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state, 
                user: action.payload,
                isAuthenticated: true,
            }
        case LOGOUT_USER:
            return {
                ...state,
                user : null,
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default authReducer;