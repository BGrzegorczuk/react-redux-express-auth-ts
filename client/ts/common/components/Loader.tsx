'use strict';

import * as React from 'react';


export const Loader = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <div className="double-bounce1"/>
                <div className="double-bounce2"/>
            </div>
        </div>
    );
};
