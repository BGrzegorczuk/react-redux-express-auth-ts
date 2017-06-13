import * as React from 'react';
import {Store as IReduxStore} from 'redux';
import {connect, Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import LoggedInAppContainer from './LoggedInAppContainer';
import LoggedOutAppContainer from './LoggedOutAppContainers';


interface IStateProps {}

interface IActionProps {}

export interface IAppProps extends IStateProps, IActionProps {
    store: IReduxStore<any>;
}

class App extends React.Component<IAppProps, {}> {
    private renderContent(): JSX.Element {
        const isUserAuthorized = false;
        return isUserAuthorized ? <LoggedInAppContainer/> : <LoggedOutAppContainer/>
    }

    public render(): JSX.Element {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <main className="app">
                        {this.renderContent()}
                    </main>
                </Router>
            </Provider>
        );
    }
}


export default connect(undefined, {})(App);
