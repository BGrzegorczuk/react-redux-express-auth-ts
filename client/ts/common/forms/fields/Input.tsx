'use strict';

import * as React from 'react';
import {Field, WrappedFieldProps} from 'redux-form';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import {IStore} from '../../../reducer';


interface IInputFieldProps extends IInputProps, WrappedFieldProps<IStore> {}

class InputField extends React.Component<IInputFieldProps, {}> {

    private renderLabel(label: string): JSX.Element {
        return <ControlLabel>{label}</ControlLabel>;
    }

    private renderError(error: string): JSX.Element {
        return <HelpBlock>{error}</HelpBlock>;
    }

    public render(): JSX.Element {
        const { input: inputProps, meta: { error, touched }, ...customProps } = this.props;
        return (
            <FormGroup controlId={name} validationState={touched && error ? 'error' : undefined}>
                { customProps.label && this.renderLabel(customProps.label) }
                <FormControl {...inputProps} {...customProps}/>
                { touched && error && this.renderError(error) }
            </FormGroup>
        );
    }
}


interface IInputProps {
    name: string;
    id?: string;
    type?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

class Input extends React.Component<IInputProps, {}> {

    public render(): JSX.Element {
        const { name, ...customProps } = this.props;
        return <Field name={name} props={customProps} component={InputField}/>;
    }
}

export default Input;
