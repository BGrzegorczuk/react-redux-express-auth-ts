'use strict';

import {Dispatch as IDispatch} from 'redux';
import {IAction} from '../../common/interfaces/action';
import {IAuthLoginCreds, IAuthResponse, IAuthSignupCreds} from '../interfaces/auth';
import {IStore} from '../../reducer';
import {apiPOST} from '../../common/helpers/request';
import {AUTH_TOKEN_LS_KEY} from '../../consts/auth';
import {createRequestActionTypes} from '../../common/helpers/actions';


/* TYPES */

export const AUTHENTICATE_USER = 'auth/AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'auth/UNAUTHENTICATE_USER';
export const RESET_AUTH_FORM = 'auth/RESET_AUTH_FORM';
export const authFormSubmitActionTypes = createRequestActionTypes('auth/FORM_SUBMIT');

/* ACTIONS */

export const authenticateUser = (): IAction => ({ type: AUTHENTICATE_USER });
export const unauthenticateUser = (): IAction => ({ type: UNAUTHENTICATE_USER });
export const resetAuthForm = (): IAction => ({ type: RESET_AUTH_FORM });
export const authRequestStart: IAction = { type: authFormSubmitActionTypes.start };
export const authRequestSuccess: IAction = { type: authFormSubmitActionTypes.success };
export const authRequestError = (error: string): IAction => ({
    type: authFormSubmitActionTypes.error,
    payload: error
});

export const loginUser = ({ email, password }: IAuthLoginCreds, onSuccess?: Function) => {
    return (dispatch: IDispatch<IStore>) => {
        dispatch<IAction>(authRequestStart);

        return apiPOST('/api/auth/login/', {email, password})
            .then((data: IAuthResponse) => {
                dispatch<IAction>(authRequestSuccess);
                dispatch<IAction>(authenticateUser());
                localStorage.setItem(AUTH_TOKEN_LS_KEY, data.token);
                onSuccess && onSuccess(data);
            })
            // TODO: catch only specific error
            .catch((err: any) => {
                dispatch<IAction>(authRequestError('Login failed, try again'));
            });
    }
};


export const logoutUser = (): IAction => {
    localStorage.removeItem(AUTH_TOKEN_LS_KEY);
    return unauthenticateUser();
};


export const signupUser = ({ email, password }: IAuthSignupCreds, onSuccess?: Function) => {
    return (dispatch: IDispatch<IStore>) => {
        dispatch<IAction>(authRequestStart);

        return apiPOST('/api/auth/signup/', {email, password})
            .then((data: IAuthResponse) => {
                dispatch<IAction>(authRequestSuccess);
                dispatch<IAction>(authenticateUser());
                localStorage.setItem(AUTH_TOKEN_LS_KEY, data.token);
                onSuccess && onSuccess(data);
            })
            // TODO: catch only specific error
            .catch((err: any) => {
                dispatch<IAction>(authRequestError('Signup failed, try again'));
            });
    }
};
