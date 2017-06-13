import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import NotFoundView from './NotFoundView';
import IndexView from '../common/views/IndexView';
import LogoutView from '../auth/views/LogoutView';


export interface ILoggedInAppContainerProps {}

class LoggedInAppContainer extends React.Component<ILoggedInAppContainerProps, {}> {
    public render(): JSX.Element {
        return (
            <Switch>
                <Route path="/" exact component={IndexView}/>
                <Route path="/logout" exact component={LogoutView}/>

                <Redirect from="/login" to="/"/>
                <Redirect from="/signup" to="/"/>
                <Route path="/*" component={NotFoundView}/>
            </Switch>
        );
    }
}

export default LoggedInAppContainer;
