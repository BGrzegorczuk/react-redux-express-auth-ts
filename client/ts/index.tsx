'use strict';

import 'bluebird';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './containers/App';
import appReducer from './reducer';


// configure store
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>,
        document.getElementById('root')
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => { render(App) })
}
