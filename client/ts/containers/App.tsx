import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginView from '../auth/views/LoginView';
import SignupView from '../auth/views/SignupView';
import NotFoundView from './NotFoundView';

const App = () => (
    <Router>
        <main className="app">
            <Switch>
                <Route path="/login" exact component={LoginView}/>
                <Route path="/signup" exact component={SignupView}/>
                <Route path="/*" component={NotFoundView}/>
            </Switch>
        </main>
    </Router>
);

export default App
