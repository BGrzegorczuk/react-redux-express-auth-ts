'use strict';

import * as React from 'react';
import {map} from 'lodash';
import {ListGroup} from 'react-bootstrap';
import VideoItem from './VideoListItem';
import {IVideoItem} from '../utils/yt_api_types';

interface IVideoListProps {
    videos: IVideoItem[];
    onVideoSelect: (video: IVideoItem) => void;
    className?: string;
}

const VideoList = (props: IVideoListProps) => {
    const videoItems = map(props.videos, (video: IVideoItem) => {
        return <VideoItem video={video} key={video.id.videoId} onClick={props.onVideoSelect}/>;
    });

    return <ListGroup className="video-list">{videoItems}</ListGroup>;
};

export default VideoList;
