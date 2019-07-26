import { SET_YAPS, LOADING_DATA, POST_YAP, LIKE_YAP, UNLIKE_YAP, DELETE_YAP, SUBMIT_COMMENT, STOP_LOADING_UI, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, SET_YAP } from '../types';
import axios from 'axios';

//get all yaps
export const getYaps = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/yaps')
    .then(res => {
        dispatch({
            type: SET_YAPS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_YAPS,
            payload: []
        })
    })
}

export const getYap = (yapId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/yap/${yapId}`)
    .then(res => {
        dispatch({
            type: SET_YAP,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err))
}
//Post a yap
export const postYap = (newYap) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/yap', newYap)
    .then(res => {
        dispatch({
            type: POST_YAP,
            payload: res.data
        });
        dispatch(clearErrors())
    })
    .catch(err=> {
        dispatch({
            type:SET_ERRORS,
            payload: err.response.data
        })
    })
}

//like yap
export const likeYap = (yapId) => (dispatch) => {
    axios.get(`/yap/${yapId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_YAP,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

//unlike yap
export const unlikeYap = (yapId) => (dispatch) => {
    axios.get(`/yap/${yapId}/unlike`)
    .then(res => {
        dispatch({
            type: UNLIKE_YAP,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

//delete a yap
export const deleteYap = (yapId) => (dispatch) => {
    axios.delete(`/yap/${yapId}`)
    .then(() => {
        dispatch({ 
            type: DELETE_YAP,
            payload: yapId  
        })
    })
    .catch(err=>console.log(err))
}
//submit comment
export const submitComment = (yapId, commentData) => dispatch => (
    axios.post(`/yap/${yapId}/comment`, commentData)
    .then(res => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors()); //action creator
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
)

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}