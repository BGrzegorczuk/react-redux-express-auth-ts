'use strict';

import * as React from 'react';
import {bindActionCreators, Dispatch as IDispatch} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import {logoutUser} from '../actions/auth';
import {IStore} from '../../reducer';


interface IStateProps {}

interface IActionProps {
    logoutUser: typeof logoutUser;
}

interface IOwnProps {}

interface ILogoutViewProps extends IStateProps, IActionProps, IOwnProps, IRouteComponentProps<any> {}

class LogOutViewC extends React.Component<ILogoutViewProps, IStateProps> {

    public componentWillUnmount(): void {
        this.props.logoutUser();
    }

    public render(): JSX.Element {
        return (
            <div className="logout-container">
                <h2>Hope to see you soon!</h2>
            </div>
        );
    }
}


function mapActionsToProps(dispatch: IDispatch<IStore>): IActionProps {
    return bindActionCreators({
        logoutUser
    }, dispatch);
}

const LogoutView = connect(undefined, mapActionsToProps)(LogOutViewC);

export default LogoutView;
