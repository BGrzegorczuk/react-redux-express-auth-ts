import * as React from 'react';
import {Image, ListGroupItem, Media} from 'react-bootstrap';
import * as YTSearch from 'youtube-api-search';

interface IVideoItemProps {
    video: YTSearch.IVideoItem;
    onClick: (video: YTSearch.IVideoItem) => void;
}

const VideoItem = (props: IVideoItemProps) => {
    const videoData = props.video;

    const onClick = (e: React.MouseEvent<ListGroupItem>) => {
        props.onClick(props.video);
    };

    return (
        <ListGroupItem className="pv-sm mb-sm" bsStyle="info" key={videoData.id.videoId} onClick={onClick}>
            <Media>
                <Media.Left>
                    <Image src={videoData.snippet.thumbnails.default.url}/>
                </Media.Left>
                <Media.Body componentClass="vam">
                    <p className="fwb m-0">{videoData.snippet.title}</p>
                </Media.Body>
            </Media>

        </ListGroupItem>
    );
}

export default VideoItem;
