import { FETCH_VIDEOS, SET_LOADING, FILTER_VIDEOS } from "./videoActions";

const initialState = {
    videos : [],
    filteredVideos : [],
    loading : false
}


const videoReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_VIDEOS:
            return{
                ...state,
                videos : action.payload,
                filteredVideos : action.payload,
            }
        case SET_LOADING:
            return {
                ...state,
                loading:action.payload
            }
        case FILTER_VIDEOS:{
            return{
                ...state,
                filteredVideos: state.videos.filter(video => video.title.toLowerCase().includes(action.payload.toLowerCase()))
            }
        }
        default:
            return state;
    }
}

export default videoReducer;