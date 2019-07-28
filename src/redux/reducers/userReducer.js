import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, MARK_NOTIFICATIONS_READ, LOADING_USER, LIKE_YAP, UNLIKE_YAP } from '../types';

const initialState = {
    authenticated: false,
    loading:false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action){
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated:true,
                loading: false,
                ...action.payload
            };
        case LIKE_YAP:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        yapId: action.payload.yapId
                    }
                ]
            }
        case UNLIKE_YAP:
            return {
                ...state,
                likes: state.likes.filter(like => like.yapId !== action.payload.yapId)
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((notification) => (notification.read = true))
            return {
                ...state
            }
        default:
            return state;
    }
}