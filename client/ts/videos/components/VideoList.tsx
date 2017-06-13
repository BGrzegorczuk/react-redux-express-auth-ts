import * as React from 'react';
import {map} from 'lodash';
import {ListGroup} from 'react-bootstrap';
import * as YTSearch from 'youtube-api-search';
import VideoItem from './VideoListItem';

interface IVideoListProps {
    videos: YTSearch.IVideoItem[];
    onVideoSelect: (video: YTSearch.IVideoItem) => void;
    className?: string;
}

const VideoList = (props: IVideoListProps) => {
    const videoItems = map(props.videos, (video: YTSearch.IVideoItem) => {
        return <VideoItem video={video} key={video.id.videoId} onClick={props.onVideoSelect}/>;
    });

    return <ListGroup className="video-list">{videoItems}</ListGroup>;
}

export default VideoList;
