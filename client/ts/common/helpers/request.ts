'use strict';

import * as _ from 'lodash';
import * as Promise from 'bluebird';
import {Error401, UnrecognizedStatusError} from './request_errors';
import {AUTH_TOKEN_LS_KEY} from '../../consts/auth';
import {IDictionary} from '../interfaces/data';

const DEBUG = true;

interface RequestOptions {
    headers?: {[h: string]: string};
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';


// TODO: add HTML different statuses/errors handling
export function request(method: RequestMethod , url: string, data?: IDictionary<any>, opts?: RequestOptions) {

    const defaultHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": localStorage.getItem(AUTH_TOKEN_LS_KEY)
    };

    let fetchOpts: RequestInit = {
        method: method,
        headers: defaultHeaders
    };

    if (data) { fetchOpts.body = JSON.stringify(data) }
    if (opts && opts.headers) { fetchOpts.headers = _.assign({}, fetchOpts.headers, opts.headers) }

    if (DEBUG) { console.info('FETCH OPTS:',fetchOpts); }

    return Promise.resolve()
        .then(() => fetch(url, fetchOpts))
        .then((res: Response) => {
            if (DEBUG) { console.info('FETCH RESPONSE:', res.status, res); }

            switch (res.status) {
                case 200:
                    return res.json();
                case 204:
                    return {};
                case 401:
                    throw new Error401("response string", "Forbidden");
                default:
                    throw new UnrecognizedStatusError("");
            }
        })
    // .catch((err: any) => {
    //     if (DEBUG) { console.info("FETCH ERROR:", err); }
    //     throw err;
    // });
}

export function apiGET(url: string, params?: any) {
    const queryParams = '';
    const urlWithParams = `${url}?${queryParams}`;
    return request('GET', urlWithParams);
}

export function apiPOST (url: string, data?: IDictionary<any>, opts?: RequestOptions): Promise<any> {
    return request('POST', url, data);
}

export function apiPUT (url: string, data?: IDictionary<any>, opts?: RequestOptions): Promise<any> {
    return request('PUT', url, data, opts);
}

export function apiPATCH (url: string, data?: IDictionary<any>, opts?: RequestOptions): Promise<any> {
    return request('PATCH', url, data, opts);
}

export function apiDELETE (url: string): Promise<any> {
    return request('DELETE', url);
}
