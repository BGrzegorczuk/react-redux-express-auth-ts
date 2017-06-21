'use strict';

import * as React from 'react';
import {FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

interface InputProps {
    id: string;
    className?: string;
    placeholder?: string;
    help?: string;
    value: string|number;

    onChange?: React.FormEventHandler<SearchInput>;
}

interface InputState {}


class SearchInput extends React.Component<InputProps, InputState> {

    public render(): JSX.Element {
        const { help, id, placeholder, onChange } = this.props;


        return (
            <FormGroup controlId={id}>
                <FormControl bsSize="lg" onChange={onChange} placeholder={placeholder}/>
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }
}

export default SearchInput;
