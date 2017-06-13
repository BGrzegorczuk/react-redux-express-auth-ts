import * as React from 'react';
import {Field, FormProps, reduxForm, SubmitHandler as ISubmitHandler} from 'redux-form';
import {Alert, Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';


export interface IFormData {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

interface IFormProps extends FormProps<IFormData, {}, {}> {}

interface ISignupFormProps extends IFormProps {
    onSubmit?: (data: IFormData) => void;
    authError: string | null;
}


@reduxForm<IFormData, ISignupFormProps, {}>({
    form: 'SignupForm'
})
class SignupFormC extends React.Component<ISignupFormProps, {}> {

    private renderAuthError(): JSX.Element {
        return <Alert>Signup Failed, try again.</Alert>;
    }

    private submit: ISubmitHandler<IFormData, ISignupFormProps, {}> = (formData: IFormData): void => {
        this.props.onSubmit && this.props.onSubmit(formData);
    };

    public render(): JSX.Element {
        const { handleSubmit, authError } = this.props;
        return (
            <Form horizontal onSubmit={ handleSubmit && handleSubmit(this.submit) }>
                { authError ? this.renderAuthError() : null }

                <Field name="email" label="Email" component="input"/>
                <Field name="password" label="Password" type="password" component="input"/>
                <Field name="passwordConfirm" label="Confirm password" type="password" component="input"/>
                <Button bsStyle="primary" bsSize="lg" type="submit">Submit</Button>
            </Form>
        )
    }
}



const SignupForm = connect(undefined, {})(SignupFormC);

export default SignupForm;
