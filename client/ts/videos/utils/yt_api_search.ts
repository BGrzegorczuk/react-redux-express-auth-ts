'use strict';

import {ISearchArgs} from './yt_api_types';
const ROOT_API_URL = 'https://www.googleapis.com/youtube/v3/search';
export const APIKey = "AIzaSyAFXU0ZOBUe9slg1yCtJFSWP-oXJweY5CY";     // should not be public ;)

const ytAPI = (params: ISearchArgs): Promise<Response> => {

    if (!params.key) {
        throw new Error('Youtube Search - key parameter required');
    }

    const _params = { ...params, part: 'snippet' };

    const esc = encodeURIComponent;
    const query = Object.keys(_params)
        .map(k => esc(k) + '=' + esc((_params as any)[k]))
        .join('&');

    return fetch(`${ROOT_API_URL}?${query}`);
};

export default ytAPI;
