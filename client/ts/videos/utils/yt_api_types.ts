'use strict';

export interface ISearchArgs {
    key: string;
    term?: string;
    maxResults?: number;
}

export interface IVideoResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: IVideoPageInfo;
    items: IVideoItem[];
}

export interface IVideoItem {
    etag: string;
    id: IVideoId;
    kind: string;
    snippet: IVideoSnippet;
}

export interface IVideoId {
    kind:string;
    videoId:string;
}

export interface IVideoSnippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: IVideoThumbnails;
    title: string;
}

export interface IVideoPageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface IVideoThumbnails {
    default: IThumbnail;
    high: IThumbnail;
    medium: IThumbnail;
}

export interface IThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface ISearch {
    (searchArgs: ISearchArgs, callback: (data: IVideoItem[]) => any): Promise<any>;
}
