'use strict';

import * as React from 'react';
import {bindActionCreators, Dispatch as IDispatch} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import {resetAuthForm, signupUser} from '../actions/auth';
import SignupForm, {IFormData} from '../components/SignupForm';
import {IStore} from '../../reducer';
import {IAuthSignupCreds} from '../interfaces/auth';


interface IStateProps {
    authError: string | null;
    loading: boolean;
}

interface IActionProps {
    signupUser: typeof signupUser;
    resetAuthForm: typeof resetAuthForm;
}

interface IOwnProps {}

interface ISignupViewProps extends IStateProps, IActionProps, IOwnProps, IRouteComponentProps<any> {
    dispatch: IDispatch<IStore>;
}

// NOTE: logic is very similar to LoginView, I think but it's better to
// keep them separated as business logic can differ in near future
class SignupViewC extends React.Component<ISignupViewProps, {}> {

    public componentWillUnmount(): void {
        this.props.resetAuthForm();
    }

    private onSubmit = (formData: IFormData): void => {
        this.props.signupUser(formData as IAuthSignupCreds, this.onSuccess);
    };

    private onSuccess = () => {
        this.props.history.push('/');
    };

    public render(): JSX.Element {
        return (
            <div className="auth-form-holder p-xl pt-xxxl">
                <SignupForm
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
        signupUser,
        resetAuthForm
    }, dispatch);
}

const SignupView = connect(mapStateToProps, mapActionsToProps)(SignupViewC);

export default SignupView;
