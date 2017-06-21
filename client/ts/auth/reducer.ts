'use strict';

import {IAction} from '../common/interfaces/action';
import {AUTH_TOKEN_LS_KEY} from '../consts/auth';
import {AUTHENTICATE_USER, authFormSubmitActionTypes, RESET_AUTH_FORM, UNAUTHENTICATE_USER} from './actions/auth';


export interface IAuthStore {
    authenticated: boolean;
    authError: string | null;
    loading: boolean;
}

const initialState = {
    authenticated: !!localStorage.getItem(AUTH_TOKEN_LS_KEY),
    authError: null,
    loading: false
};


const authReducer  = (state: IAuthStore = initialState, action: IAction): IAuthStore => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, authenticated: true };
        case UNAUTHENTICATE_USER:
            return { ...state, authenticated: false };
        case RESET_AUTH_FORM:
            return { ...state, authError: null, loading: false };

        case authFormSubmitActionTypes.start:
            return { ...state, loading: true };
        case authFormSubmitActionTypes.success:
            return { ...state, loading: false, authError: null };
        case authFormSubmitActionTypes.error:
            return { ...state, loading: false, authError: action.payload };

        default:
            return state;
    }
};

export default authReducer;
