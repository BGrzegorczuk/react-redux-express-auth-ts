'use strict';

import * as React from 'react';
import {FormErrors, FormProps, reduxForm, SubmitHandler as ISubmitHandler} from 'redux-form';
import {Alert, Button, Form, Panel} from 'react-bootstrap';
import Input from '../../common/forms/fields/Input';
import * as validators from '../../common/forms/validators';


export interface IFormData {
    email?: string;
    password?: string;
}

interface IFormProps extends FormProps<IFormData, {}, {}> {}

interface ILoginFormProps extends IFormProps {
    onSubmit?: (data: IFormData) => void;
    authError: string | null;
    loading: boolean;
}


function validate(formData: IFormData): FormErrors<IFormData> {
    const { email, password } = formData;
    let errors: IFormData = {};

    errors.email = validators.email(email);
    errors.password = validators.required(password);

    return errors;
}


@reduxForm<IFormData, ILoginFormProps, {}>({
    form: 'LoginForm',
    validate
})
class LoginForm extends React.Component<ILoginFormProps, {}> {

    private submit: ISubmitHandler<IFormData, ILoginFormProps, {}> = (formData: IFormData): void => {
        this.props.onSubmit && this.props.onSubmit(formData);
    };

    private renderAuthError(error: string): JSX.Element {
        return <Alert bsStyle="warning">{error}</Alert>;
    }

    public render(): JSX.Element {
        const { handleSubmit, authError, loading } = this.props;

        return (
            <Panel header="Login">
                <Form onSubmit={ handleSubmit && handleSubmit(this.submit) }>
                    { authError ? this.renderAuthError(authError) : null }

                    <Input name="email" label="Email" disabled={loading}/>
                    <Input name="password" label="Password" type="password" disabled={loading}/>

                    <div className="tac">
                        <Button
                            bsStyle="primary" bsSize="lg" type="submit"
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Panel>
        );
    }
}

export default LoginForm;
