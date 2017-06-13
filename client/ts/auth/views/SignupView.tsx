import * as React from 'react';
import {bindActionCreators, Dispatch as IDispatch} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import {clearAuthError, signupUser} from '../actions/auth';
import SignupForm, {IFormData} from '../components/SignupForm';
import {IStore} from '../../reducer';
import {IAuthSignupCreds} from '../interfaces/auth';


interface IStateProps {
    authError: string | null;
}

interface IActionProps {
    signupUser: typeof signupUser;
    clearAuthError: typeof clearAuthError;
}

interface IOwnProps {}

interface ISignupViewProps extends IStateProps, IActionProps, IOwnProps, IRouteComponentProps<any> {
    dispatch: IDispatch<IStore>;
}


class SignupViewC extends React.Component<ISignupViewProps, {}> {

    public componentWillUnmount(): void {
        this.props.clearAuthError();
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
                <SignupForm onSubmit={this.onSubmit} authError={this.props.authError}/>
            </div>
        );
    }
}

function mapStateToProps(store: IStore, ownProps: IOwnProps): IStateProps {
    return {
        authError: store.auth.authError
    };
}

function mapActionsToProps(dispatch: IDispatch<IStore>): IActionProps {
    return bindActionCreators({
        signupUser,
        clearAuthError
    }, dispatch);
}

const SignupView = connect(mapStateToProps, mapActionsToProps)(SignupViewC);

export default SignupView;
