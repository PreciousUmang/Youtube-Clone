import { FETCH_VIDEOS, SET_LOADING } from "./videoActions";

const initialState = {
    videos : [],
    loading : false
}


const videoReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_VIDEOS:
            return{
                ...state,
                videos : action.payload,
            }
        case SET_LOADING:
            return {
                ...state,
                loading:action.payload
            }
        default:
            return state;
    }
}

export default videoReducer;