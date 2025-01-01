import axios from "axios";

export const FETCH_VIDEOS = "FETCH_VIDEOS";
export const SET_LOADING = "SET_LOADING";
export const FILTER_VIDEOS = "FILTER_VIDEOS"; 
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY"

// Fetch all videos from API
export const fetchVideos = () => async (dispatch) => {
    dispatch(setLoading(true)); 

    try {
        const response = await axios.get("http://localhost:2309/api/videos");
        dispatch({
            type: FETCH_VIDEOS,
            payload: response.data,
        });
    } catch (error) {
        console.error("Failed to fetch videos:", error);
        alert("Could not load videos. Please try again later.");
    } finally {
        dispatch(setLoading(false)); 
    }
};

// Set loading state
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// Filter videos by category
export const filterByCategory = (category) => ({
    type: FILTER_BY_CATEGORY,
    payload: category,
});

export const filterVideos = (query) => ({
    type: FILTER_VIDEOS,
    payload: query,
});