import { SET_YAPS, LOADING_DATA, LIKE_YAP, UNLIKE_YAP, DELETE_YAP } from '../types';
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