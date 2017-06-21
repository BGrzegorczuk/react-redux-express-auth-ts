'use strict';

import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LoginView from '../auth/views/LoginView';
import SignupView from '../auth/views/SignupView';


export interface ILoggedOutAppContainerProps {}

class LoggedOutAppContainer extends React.Component<ILoggedOutAppContainerProps, {}> {
    public render(): JSX.Element {
        return (
            <Switch>
                <Route path="/login" exact component={LoginView}/>
                <Route path="/signup" exact component={SignupView}/>

                <Redirect from="/*" to="/login"/>
            </Switch>
        );
    }
}

export default LoggedOutAppContainer;
