import * as React from 'react';
import {Field, FormProps, reduxForm, SubmitHandler as ISubmitHandler} from 'redux-form';
import {Alert, Button, Form} from 'react-bootstrap';


export interface IFormData {
    email?: string;
    password?: string;
}

interface IFormProps extends FormProps<IFormData, {}, {}> {}

interface ILoginFormProps extends IFormProps {
    onSubmit?: (data: IFormData) => void;
    authError: string | null;
}


@reduxForm<IFormData, ILoginFormProps, {}>({
    form: 'LoginForm'
})

class LoginForm extends React.Component<ILoginFormProps, {}> {

    private renderAuthError(msg: string): JSX.Element {
        return <Alert>{msg}</Alert>;
    }

    private submit: ISubmitHandler<IFormData, ILoginFormProps, {}> = (formData: IFormData): void => {
        this.props.onSubmit && this.props.onSubmit(formData);
    };

    public render(): JSX.Element {
        const { handleSubmit, authError } = this.props;
        return (
            <Form horizontal onSubmit={ handleSubmit && handleSubmit(this.submit) }>
                { authError ? this.renderAuthError(authError) : null }

                <Field name="email" label="Email" component="input"/>
                <Field name="password" label="Password" type="password" component="input"/>
                <Button bsStyle="primary" bsSize="lg" type="submit">Submit</Button>
            </Form>
        )

    }
}

export default LoginForm;
