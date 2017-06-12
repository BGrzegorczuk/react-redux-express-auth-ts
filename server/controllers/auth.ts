import * as express from 'express';
import * as jwt from 'jwt-simple';
import User, {IUserModel} from '../models/UserModel';
import {JWT_SECRET} from '../config';


const createToken = (user: IUserModel) => {
    const payload = { sub: user._id, iat: new Date().getTime() };
    return jwt.encode(payload , JWT_SECRET);
};

// TODO: Consider errors format - return more human readable errors from forms in general
// TODO: separate common responses interfaces for both server & client
export function signup(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    // see if user with given email already exists in DB
    User.findByEmail(email)
        .then( (user: IUserModel) => {
            if (user) {
                return res.status(422).send({ error: 'Email is in use' });
            } else {
                const newUser = new User({
                    email,
                    password
                });

                newUser.save()
                    .then( () => {
                        return res.send({ token: createToken(newUser) });
                    })
                    .catch( (err: any) => {

                        return res.status(401).send({ error: err });
                    });
            }
        })
        .catch( (err: any) => console.log('err', err) );
}


export function login(req: express.Request, res: express.Response) {
    const { user } = req;

    res.send({ token: createToken(user) });
}
