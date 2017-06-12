import * as passport from 'passport';
import User, {IUserModel} from '../models/UserModel';
import {JWT_SECRET} from '../config';
import {IStrategyOptions as ILocalStrategyOptions, Strategy as LocalStrategy} from 'passport-local';

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
