'use strict';

export interface RequestActionTypes {
    start: string;
    success: string;
    error: string;
}

export const createRequestActionTypes = (actionName: string): RequestActionTypes => ({
    start: `${actionName}_REQUEST`,
    success: `${actionName}_SUCCESS`,
    error: `${actionName}_ERROR`,
});
