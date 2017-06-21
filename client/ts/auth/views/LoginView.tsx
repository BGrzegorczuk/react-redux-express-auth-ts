'use strict';

import * as React from 'react';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import {IAuthLoginCreds} from '../interfaces/auth';
import {loginUser, resetAuthForm} from '../actions/auth';
import {bindActionCreators, Dispatch as IDispatch} from 'redux';
import {IStore} from '../../reducer';
import {connect} from 'react-redux';
import LoginForm, {IFormData} from '../components/LoginForm';


interface IStateProps {
    authError: string | null;
    loading: boolean;
}

interface IActionProps {
    loginUser: typeof loginUser;
    resetAuthForm: typeof resetAuthForm;
}

interface IOwnProps {}

interface ILoginViewProps extends IStateProps, IActionProps, IOwnProps, IRouteComponentProps<any> {
    dispatch: IDispatch<IStore>;
}

// NOTE: logic is very similar to SignupView, I think but it's better to
// keep them separated as business logic can differ in near future
class LoginViewC extends React.Component<ILoginViewProps, {}> {

    public componentWillUnmount(): void {
        this.props.resetAuthForm();
    }

    private onSubmit = (formData: IFormData): void => {
        this.props.loginUser(formData as IAuthLoginCreds, this.onSuccess);
    };

    private onSuccess = () => {
        this.props.history.push('/');
    };

    public render(): JSX.Element {
        return (
            <div className="auth-form-holder p-xl pt-xxxl">
                <LoginForm
                    onSubmit={this.onSubmit}
                    loading={this.props.loading}
                    authError={this.props.authError}
                />
            </div>
        );
    }

}


function mapStateToProps(store: IStore, ownProps: IOwnProps): IStateProps {
    return {
        authError: store.auth.authError,
        loading: store.auth.loading
    };
}

function mapActionsToProps(dispatch: IDispatch<IStore>): IActionProps {
    return bindActionCreators({
        loginUser,
        resetAuthForm
    }, dispatch);
}

const LoginView = connect(mapStateToProps, mapActionsToProps)(LoginViewC);

export default LoginView;
