import {AUTH_TOKEN_LS_KEY} from '../consts/auth';
import {IAction} from '../common/interfaces/action';

export interface IAuthStore {
    authenticated: boolean;
    authError: string | null;
}

const initialState = {
    authenticated: localStorage.getItem(AUTH_TOKEN_LS_KEY) ? true : false,
    authError: null
};


const authReducer  = (state: IAuthStore = initialState, action: IAction): IAuthStore => {
    switch (action.type) {
        default:
            return state;
    }
}

export default authReducer;
