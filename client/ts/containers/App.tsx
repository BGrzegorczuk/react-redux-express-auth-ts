import * as React from 'react';
import {Store as IReduxStore} from 'redux';
import {connect, Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import LoggedInAppContainer from './LoggedInAppContainer';
import LoggedOutAppContainer from './LoggedOutAppContainers';
import {IStore} from '../reducer';


interface IStateProps {
    isUserAuthorized: boolean;
}

interface IActionProps {}

interface IOwnProps {
    store: IReduxStore<any>;
}

export interface IAppProps extends IStateProps, IActionProps, IOwnProps {}

class AppC extends React.Component<IAppProps, {}> {

    private renderContent(): JSX.Element {
        const { isUserAuthorized } = this.props;
        return isUserAuthorized ? <LoggedInAppContainer/> : <LoggedOutAppContainer/>
    }

    public render(): JSX.Element {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <main className="app">
                        { this.renderContent() }
                    </main>
                </Router>
            </Provider>
        );
    }
}


function mapStateToProps(store: IStore, ownProps: IOwnProps): IStateProps {
    return {
        isUserAuthorized: store.auth.authenticated
    };
}

const App = connect(mapStateToProps, {})(AppC);

export default App;
