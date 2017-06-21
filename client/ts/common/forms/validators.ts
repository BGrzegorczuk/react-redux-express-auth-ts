'use strict';

export const required = (value: any, msg: string = 'Field is required') => {
    return !value ? msg : '';
};

export const email = (email: string | undefined, msg: string = 'Invalid email') => {
    function validateEmail(email: string | undefined) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email || '');
    }

    return !validateEmail(email) ? msg : '';
};

export const equal = (value1: any, value2: any, msg: string = 'Fields are not identical') => {
    return value1 !== value2 ? msg : '';
};
