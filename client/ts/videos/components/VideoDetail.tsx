'use strict';

import * as React from 'react';
import {ResponsiveEmbed} from 'react-bootstrap';
import {IVideoItem} from '../utils/yt_api_types';


interface IVideoDetailsProps {
    video: IVideoItem | null;
    className?: string;
}

const VideoDetails = (props: IVideoDetailsProps) => {
    const {video} = props;

    if (!video) {
        return <div>Loading...</div>;
    }

    const videoUrl = `http://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <article className="video-detail">
            <ResponsiveEmbed a16by9>
                <iframe className="responsive-embed-item" src={videoUrl}/>
            </ResponsiveEmbed>

            <section className="details">
                <h3>{ video.snippet.title }</h3>
                <p>{ video.snippet.description }</p>
            </section>
        </article>
    );
};

export default VideoDetails;
