import {combineReducers} from 'redux';
import authReducer, {IAuthStore} from './auth/reducer';

export interface IStore {
    auth: IAuthStore
}

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
