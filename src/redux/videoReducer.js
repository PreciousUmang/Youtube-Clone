import { FETCH_VIDEOS, SET_LOADING, FILTER_BY_CATEGORY, FILTER_VIDEOS } from "./videoActions";

const initialState = {
    videos: [], 
    filteredVideos: [], 
    loading: false,
    categories: ["All", "Education", "Entertainment", "Music", "Sports"], 
};

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIDEOS:
            return {
                ...state,
                videos: action.payload,
                filteredVideos: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case FILTER_VIDEOS:
            return {
                ...state,
                filteredVideos: state.videos.filter((video) =>
                    video.title.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        case FILTER_BY_CATEGORY:
            return {
                ...state,
                filteredVideos:
                    action.payload === "All"? state.videos: state.videos.filter((video) => video.category === action.payload),
            };
        default:
            return state;
    }
};

export default videoReducer;
