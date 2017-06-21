'use strict';

export class Error400 extends Error {
    constructor(response: string, message?: string) {
        super();
        this.name = "Validation error";
        this.message = message || "Validation error";
        // Error.captureStackTrace(this, Error400);
    }
}

export class Error401 extends Error {
    constructor(response: string, message?: string) {
        super();
        this.name = "Unauthorized";
        this.message = message || "Unauthorized";
        // Error.captureStackTrace(this, Error401);
    }
}

export class Error403 extends Error {
    constructor(response: string, message?: string) {
        super();
        this.name = "Forbidden";
        this.message = message || "Forbidden";
        // Error.captureStackTrace(this, Error403);
    }
}

export class Error404 extends Error {
    constructor(response: string, message?: string) {
        super();
        this.name = "NotFound";
        this.message = message || "NotFound";
        // Error.captureStackTrace(this, Error404);
    }
}

export class Error500 extends Error {
    constructor(response: string, message?: string) {
        super();
        this.name = "ServerError";
        this.message = message || "ServerError";
        // Error.captureStackTrace(this, Error500);
    }
}

export class Error5xx extends Error {
    constructor(response: string, message?: string) {
        super();
        this.name = "ServerError";
        this.message = message || "ServerError";
        // Error.captureStackTrace(this, Error5xx);
    }
}

export class UnrecognizedStatusError extends Error {
    constructor(err: any, message?: string) {
        super();
        this.name = "Unrecognized status error";
        this.message = message || "Unrecognized status error";
        // Error.captureStackTrace(this, UnrecognizedStatusError);
    }
}

export class UnknownError extends Error {
    constructor(err: any, message?: string) {
        super();
        this.name = "UnknowError";
        this.message = message || "UnknowError";
        // Error.captureStackTrace(this, UnknownError);
    }
}
