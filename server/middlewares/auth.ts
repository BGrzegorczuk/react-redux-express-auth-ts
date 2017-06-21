'use strict';

import * as passport from 'passport';
import User, {IUserModel} from '../models/UserModel';
import {JWT_SECRET} from '../config';
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    StrategyOptions as IJwtStrategyOptions,
    VerifiedCallback
} from 'passport-jwt';
import {IStrategyOptions as ILocalStrategyOptions, Strategy as LocalStrategy} from 'passport-local';


// Authorization Strategy

export interface IJwtStrategyPayload {
    sub: string | number;
    iat: number;
}

const authorizationStrategyOpts: IJwtStrategyOptions = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

const authorizationStrategy: JwtStrategy = new JwtStrategy(
    authorizationStrategyOpts, function(payload: IJwtStrategyPayload, done: VerifiedCallback) {

        User.findById(payload.sub)
            .then( (user: IUserModel) => {

                if (user) {
                    return done(null, user); // user found
                } else {
                    return done(null, false); // user not found in DB
                }
            })
            .catch( (err: any) => done(err, null) );
    });

passport.use(authorizationStrategy);


// Login Strategy

const localStrategyOpts: ILocalStrategyOptions = {
    usernameField: 'email'
};

const loginStrategy: LocalStrategy = new LocalStrategy(
    localStrategyOpts, function(email: string, password: string, done: Function) {

        User.findOne({ email })
            .then( (user: IUserModel) => {
                if (user) {
                    // check if password is valid
                    user.checkPassword(password, function(err: any, isMatch: boolean) {
                        if (err) { return done(err, false); }
                        if (!isMatch) { return done(null ,false); }

                        return done(null, user);
                    });
                } else {
                    return done(null, false); // user not found in DB
                }
            })
            .catch( (err: any) => done(err, null) );
    }
);

passport.use(loginStrategy);
