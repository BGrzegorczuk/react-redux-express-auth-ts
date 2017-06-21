'use strict';

import * as React from 'react';
import {FormErrors, FormProps, reduxForm, SubmitHandler as ISubmitHandler} from 'redux-form';
import {Alert, Button, Form, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import Input from '../../common/forms/fields/Input';
import * as validators from '../../common/forms/validators';


export interface IFormData {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

interface IFormProps extends FormProps<IFormData, {}, {}> {}

interface ISignupFormProps extends IFormProps {
    onSubmit?: (data: IFormData) => void;
    loading: boolean;
    authError: string | null;
}

function validate(formData: IFormData): FormErrors<IFormData> {
    const { email, password, passwordConfirm } = formData;
    let errors: IFormData = {};

    errors.email = validators.email(email);
    errors.password = validators.required(password);
    errors.passwordConfirm = validators.equal(password, passwordConfirm, 'Passwords are not identical');

    return errors;
}


@reduxForm<IFormData, ISignupFormProps, {}>({
    form: 'SignupForm',
    validate
})
class SignupFormC extends React.Component<ISignupFormProps, {}> {

    private submit: ISubmitHandler<IFormData, ISignupFormProps, {}> = (formData: IFormData): void => {
        this.props.onSubmit && this.props.onSubmit(formData);
    };

    private renderAuthError(error: string): JSX.Element {
        return <Alert bsStyle="warning">{error}</Alert>;
    }

    public render(): JSX.Element {
        const { handleSubmit, authError, loading } = this.props;
        return (
            <Panel header="Signup">
                <Form onSubmit={ handleSubmit && handleSubmit(this.submit) }>
                    { authError ? this.renderAuthError(authError) : null }

                    <Input name="email" label="Email" disabled={loading}/>
                    <Input name="password" label="Password" type="password" disabled={loading}/>
                    <Input name="passwordConfirm" label="Confirm password" type="password" disabled={loading}/>

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
        )
    }
}



const SignupForm = connect(undefined, {})(SignupFormC);

export default SignupForm;
