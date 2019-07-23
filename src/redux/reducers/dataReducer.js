import { SET_YAPS, LIKE_YAP, UNLIKE_YAP, LOADING_DATA } from '../types';

const initialState = {
    yaps: [],
    yap: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            }
        case SET_YAPS:
            return {
                ...state,
                yaps: action.payload,
                loading: false
            }
        case LIKE_YAP:
        case UNLIKE_YAP:
            let index = state.yaps.findIndex((yap) => yap.yapId === action.payload.yapId);
            state.yaps[index] = action.payload;
            return {
                ...state
            }

        default:
            return state
    }
}