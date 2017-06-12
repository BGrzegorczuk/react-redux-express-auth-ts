import * as React from 'react';
import {Store as IReduxStore} from 'redux';
import {connect, Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginView from '../auth/views/LoginView';
import SignupView from '../auth/views/SignupView';
import NotFoundView from './NotFoundView';


interface IStateProps {
    isUserAuthorized: boolean;
}

interface IActionProps {}

export interface IAppProps extends IStateProps, IActionProps {
    store: IReduxStore<any>;
}

class App extends React.Component<IAppProps, {}> {
    public render(): JSX.Element {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <main className="app">
                        <Switch>
                            <Route path="/login" exact component={LoginView}/>
                            <Route path="/signup" exact component={SignupView}/>
                            <Route path="/*" component={NotFoundView}/>
                        </Switch>
                    </main>
                </Router>
            </Provider>
        );
    }
}


export default connect(undefined, {})(App);
