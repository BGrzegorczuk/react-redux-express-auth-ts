'use strict';

import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer, {IAuthStore} from './auth/reducer';


export interface IStore {
    form: any; // TODO: typing,
    auth: IAuthStore
}

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer
});

export default rootReducer;
