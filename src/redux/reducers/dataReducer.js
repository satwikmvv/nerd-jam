import { SET_YAPS, POST_YAP, LIKE_YAP, UNLIKE_YAP, LOADING_DATA, DELETE_YAP } from '../types';

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
        case POST_YAP:
            return {
                ...state,
                yaps: [
                    action.payload,
                    ...state.yaps
                ]
            }
        case LIKE_YAP:
        case UNLIKE_YAP:
            let index = state.yaps.findIndex((yap) => yap.yapId === action.payload.yapId);
            state.yaps[index] = action.payload;
            return {
                ...state
            }
        case DELETE_YAP:
            let delIndex = state.yaps.findIndex(yap => yap.yapId === action.payload);
            state.yaps.splice(delIndex,1);
            return {
                ...state
            }
        default:
            return state
    }
}