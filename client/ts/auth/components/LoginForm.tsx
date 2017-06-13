import * as React from 'react';
import {FormErrors, FormProps, reduxForm, SubmitHandler as ISubmitHandler} from 'redux-form';
import {Alert, Button, Form} from 'react-bootstrap';
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

                <Input name="email" label="Email"/>
                <Input name="password" label="Password" type="password"/>
                <Button bsStyle="primary" bsSize="lg" type="submit">Submit</Button>
            </Form>
        )

    }
}

export default LoginForm;
