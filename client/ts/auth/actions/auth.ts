import {Dispatch as IDispatch} from 'redux';
import {IAction} from '../../common/interfaces/action';
import {IAuthLoginCreds, IAuthResponse, IAuthSignupCreds} from '../interfaces/auth';
import {IStore} from '../../reducer';
import {apiPOST} from '../../common/helpers/request';
import {AUTH_TOKEN_LS_KEY} from '../../consts/auth';


/* TYPES */
export const AUTHENTICATE_USER = 'auth/AUTHENTICATE_USER';
export const SHOW_AUTH_ERROR = 'auth/SHOW_AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'auth/CLEAR_AUTH_ERROR';


export const authenticateUser = (): IAction => {
    return {
        type: AUTHENTICATE_USER
    }
};

export const showAuthError = (error: string): IAction => {
    return {
        type: SHOW_AUTH_ERROR,
        payload: error
    }
};

export const clearAuthError = (): IAction => {
    return {
        type: CLEAR_AUTH_ERROR
    }
};

export const loginUser = ({ email, password }: IAuthLoginCreds, onSuccess?: Function) => {
    return (dispatch: IDispatch<IStore>) => {
        return apiPOST('/api/auth/login/', {email, password})
            .then((data: IAuthResponse) => {
                dispatch(clearAuthError());
                dispatch(authenticateUser());
                localStorage.setItem(AUTH_TOKEN_LS_KEY, data.token);
                onSuccess && onSuccess(data);
            })
            // TODO: catch only specific error
            .catch((err: any) => {
                dispatch(showAuthError('Login failed, try again'));
                console.log('err', err);
            });
    }
};


export const logoutUser = (): IAction => {
    localStorage.removeItem(AUTH_TOKEN_LS_KEY);
    return clearAuthError();
};


export const signupUser = ({ email, password }: IAuthSignupCreds, onSuccess?: Function) => {
    return (dispatch: IDispatch<IStore>) => {
        return apiPOST('/api/auth/signup/', {email, password})
            .then((data: IAuthResponse) => {
                dispatch(clearAuthError());
                dispatch(authenticateUser());
                localStorage.setItem(AUTH_TOKEN_LS_KEY, data.token);
                onSuccess && onSuccess(data);
            })
            // TODO: catch only specific error
            .catch((err: any) => {
                dispatch(showAuthError('Signup failed, try again'));
                console.log('err', err);
            });
    }
};
