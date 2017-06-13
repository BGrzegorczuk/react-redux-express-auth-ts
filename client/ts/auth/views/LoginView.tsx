import * as React from 'react';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import {IAuthLoginCreds} from '../interfaces/auth';
import {clearAuthError, loginUser} from '../actions/auth';
import {bindActionCreators, Dispatch as IDispatch} from 'redux';
import {IStore} from '../../reducer';
import {connect} from 'react-redux';
import LoginForm, {IFormData} from '../components/LoginForm';


interface IStateProps {
    authenticated: boolean;
    authError: string | null;
}

interface IActionProps {
    loginUser: typeof loginUser;
    clearAuthError: typeof clearAuthError;
}

interface IOwnProps {}

interface ILoginViewProps extends IStateProps, IActionProps, IOwnProps, IRouteComponentProps<any> {
    dispatch: IDispatch<IStore>;
}

class LoginViewC extends React.Component<ILoginViewProps, {}> {

    public componentWillUnmount(): void {
        this.props.clearAuthError();
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
                <LoginForm onSubmit={this.onSubmit} authError={this.props.authError}/>
            </div>
        );
    }

}


function mapStateToProps(store: IStore, ownProps: IOwnProps): IStateProps {
    return {
        authenticated: true,
        authError: store.auth.authError
    };
}

function mapActionsToProps(dispatch: IDispatch<IStore>): IActionProps {
    return bindActionCreators({
        loginUser,
        clearAuthError
    }, dispatch);
}

const LoginView = connect(mapStateToProps, mapActionsToProps)(LoginViewC);

export default LoginView;
