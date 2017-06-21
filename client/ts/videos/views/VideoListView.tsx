'use strict';

import * as React from 'react';
import {debounce} from 'lodash';
import {Col, Grid, Row} from 'react-bootstrap';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import VideoDetails from '../components/VideoDetail';
import VideoList from '../components/VideoList';
import {Loader} from '../../common/components/Loader';
import SearchBar from '../components/SearchBar';
import ytAPI, {APIKey} from '../utils/yt_api_search';
import {IVideoItem} from '../utils/yt_api_types';


interface IVideoListViewProps extends IRouteComponentProps<any> {}

interface IVideoListViewState {
    videos: IVideoItem[];
    selectedVideo: IVideoItem | null;
}


class VideoListView extends React.Component<IVideoListViewProps, IVideoListViewState> {

    private initialSearchTerm = "music";

    constructor(props: IVideoListViewProps) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        // TODO: typings for response
        this.queryVideos(this.initialSearchTerm)
            .then((res: any) => {
                const [ currentVideo, ...restVideos ] = res.items;
                this.setSelectedVideo(currentVideo);
                this.updateVideos(restVideos);
            });
    }

    /**
     * Helpers
     */

    private queryVideos = (term: string): Promise<Response> => {
        const params = { key: APIKey, q: term, maxResults: 6, type: 'video' };

        return ytAPI(params)
            .then((res: Response) => res.json());
    };

    private setSelectedVideo = (video: IVideoItem) => {
        this.setState({ selectedVideo : video });
    };

    private updateVideos = (videos: IVideoItem[]) => {
        this.setState({ videos });
    };

    /**
     * Callbacks
     */

    private onVideoSelect = (video: IVideoItem) => {
        this.setSelectedVideo(video);
    };

    // TODO: typings for response
    private onVideoSearch = debounce((term: string) => {
        this.queryVideos(term)
            .then((res: any) => {
                const [ currentVideo, ...restVideos ] = res.items;
                this.updateVideos(restVideos);
            });
    }, 300);

    private renderContent(): JSX.Element {
        return (
            <Grid className="pv-xxxl h100">
                <SearchBar onVideoSearch={this.onVideoSearch} />

                <Row>
                    <Col md={8}>
                        <VideoDetails video={this.state.selectedVideo}/>
                    </Col>

                    <Col md={4}>
                        <VideoList
                            videos={this.state.videos}
                            onVideoSelect={this.onVideoSelect}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }

    public render(): JSX.Element {
        if (!this.state.selectedVideo) {
            return <Loader/>;
        } else {
            return this.renderContent();
        }
    }
}

export default VideoListView;
