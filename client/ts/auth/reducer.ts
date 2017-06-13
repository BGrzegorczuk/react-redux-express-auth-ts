import {IAction} from '../common/interfaces/action';
import {AUTH_TOKEN_LS_KEY} from '../consts/auth';
import {AUTHENTICATE_USER, CLEAR_AUTH_ERROR, SHOW_AUTH_ERROR} from './actions/auth';


export interface IAuthStore {
    authenticated: boolean;
    authError: string | null;
}

const initialState = {
    authenticated: !!localStorage.getItem(AUTH_TOKEN_LS_KEY),
    authError: null
};


const authReducer  = (state: IAuthStore = initialState, action: IAction): IAuthStore => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, authenticated: true };
        case SHOW_AUTH_ERROR:
            return { ...state, authError: action.payload };
        case CLEAR_AUTH_ERROR:
            return { ...state, authError: null };

        default:
            return state;
    }
};

export default authReducer;
