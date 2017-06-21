'use strict';

export interface IAuthLoginCreds {
    email: string;
    password: string;
}

export interface IAuthSignupCreds extends IAuthLoginCreds {
    passwordConfirm: string;
}

export interface IAuthResponse {
    token: string;
}
