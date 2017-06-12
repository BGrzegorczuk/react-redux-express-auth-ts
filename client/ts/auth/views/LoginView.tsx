import * as React from 'react';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';

interface ILoginViewProps extends IRouteComponentProps<any> {}

class LoginView extends React.Component<ILoginViewProps, {}> {

    public render(): JSX.Element {
        return (
            <div>LoginForm</div>
        );
    }
}

export default LoginView;
