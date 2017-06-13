import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';


interface IStateProps {}

interface IActionProps {}

interface ILogoutViewProps extends IStateProps, IActionProps, IRouteComponentProps<any> {}

class LogOutViewC extends React.Component<ILogoutViewProps, IStateProps> {

    public render(): JSX.Element {
        return (
            <div className="logout-container">
                <h2>Hope to see you soon!</h2>
            </div>
        );
    }
}

const LogoutView = connect(undefined, {})(LogOutViewC);

export default LogoutView;
