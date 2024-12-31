import axios from "axios";

export const FETCH_VIDEOS = 'FETCH_VIDEOS';
export const SET_LOADING = 'SET_LOADING';

// Fetching Videos
export const fetchVideos = () => async (dispatch) =>{
    dispatch({
        type : SET_LOADING,
        payload: true
    })


try {
    const response = await axios.get('http://localhost:2309/api/videos')
    dispatch({
        type: FETCH_VIDEOS,
        payload: response.data
    })
} catch (error) {
    console.error('Can not load videos :', error)
    alert('Can not load videos. Please try later')
} finally {
    dispatch({
        type : SET_LOADING,
        payload: false
    })
}
}