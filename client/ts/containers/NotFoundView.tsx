'use strict';

import * as React from 'react';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';

export interface INotFoundViewProps extends IRouteComponentProps<any> {}

class NotFoundView extends React.Component<INotFoundViewProps, {}> {
    public render(): JSX.Element {
        return (
            <h2>NotFound</h2>
        );
    }
}

export default NotFoundView;
