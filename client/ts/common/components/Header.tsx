'use strict';

import * as React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


interface IStateProps {
    authenticated: boolean;
}

interface IActionProps {}

interface IOwnProps {}

interface IHeaderProps extends IStateProps, IActionProps, IOwnProps {}

class Header extends React.Component<IHeaderProps, {}> {

    private renderLinks(): JSX.Element {
        const { authenticated } = this.props;

        const loginBtn = !authenticated ? (
            <LinkContainer to="/login" activeClassName="">
                <NavItem eventKey={1}>LogIn</NavItem>
            </LinkContainer>
        ) : null;
        const logoutBtn = authenticated ? (
            <LinkContainer to="/logout" activeClassName="">
                <NavItem eventKey={2}>LogOut</NavItem>
            </LinkContainer>
        ) : null;
        const signupBtn = !authenticated ? (
            <LinkContainer to="/signup" activeClassName="">
                <NavItem eventKey={3}>SignUp</NavItem>
            </LinkContainer>
        ) : null;

        return (
            <Nav pullRight>
                {loginBtn}
                {signupBtn}
                {logoutBtn}
            </Nav>
        );
    }

    public render(): JSX.Element {
        return (
            <Navbar inverse className="m-0 fg-0 fs-0 fb-a">
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/" exact activeClassName="">
                            <span>MyApp</span>
                        </LinkContainer>
                    </Navbar.Brand>
                </Navbar.Header>

                { this.renderLinks() }
            </Navbar>
        )
    }
}

export default Header;
