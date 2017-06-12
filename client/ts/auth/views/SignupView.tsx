import * as React from 'react';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';

interface ISignupViewProps extends IRouteComponentProps<any> {}

class SignupView extends React.Component<ISignupViewProps, {}> {

    public render(): JSX.Element {
        return (
            <div>SignupView</div>
        );
    }
}

export default SignupView;
