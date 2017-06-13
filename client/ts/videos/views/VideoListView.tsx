import * as React from 'react';
import {debounce} from 'lodash';
import * as YTSearch from 'youtube-api-search';
import {Col, Grid, Row} from 'react-bootstrap';
import {RouteComponentProps as IRouteComponentProps} from 'react-router-dom';
import VideoDetails from '../components/VideoDetail';
import VideoList from '../components/VideoList';
import {Loader} from '../../common/components/Loader';


const APIKey = "AIzaSyAFXU0ZOBUe9slg1yCtJFSWP-oXJweY5CY";

interface IVideoListViewProps extends IRouteComponentProps<any> {}

interface IVideoListViewState {
    videos: YTSearch.IVideoItem[];
    selectedVideo: YTSearch.IVideoItem | null;
}


class VideoListView extends React.Component<IVideoListViewProps, IVideoListViewState> {

    private initialSearchTerm = "music";

    constructor(props: IVideoListViewProps) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.queryVideos(this.initialSearchTerm, (videos: YTSearch.IVideoItem[]) => {
            this.updateVideos(videos);
            this.setSelectedVideo(videos[0]);
        });
    }

    /**
     * Helpers
     */

    private queryVideos = (term: string, callbk: (videos: YTSearch.IVideoItem[]) => void | undefined ) => {
        return YTSearch({ key: APIKey, term: term }, (videos: YTSearch.IVideoItem[]) => {
            callbk && callbk(videos);
        });
    };

    private setSelectedVideo = (video: YTSearch.IVideoItem) => {
        this.setState({ selectedVideo : video });
    };

    private updateVideos = (videos: YTSearch.IVideoItem[]) => {
        this.setState({ videos });
    };

    /**
     * Callbacks
     */

    private onVideoSelect = (video: YTSearch.IVideoItem) => {
        this.setSelectedVideo(video);
    };

    private onVideoSearch = debounce((term: string) => {
        this.queryVideos(term, (videos: YTSearch.IVideoItem[]) => {
            this.updateVideos(videos);
        });
    }, 300);

    private renderContent(): JSX.Element {
        return (
            <Grid className="pv-xxxl h100">
                <Row>
                    <Col md={8}>
                        <VideoDetails className="col-md-8" video={this.state.selectedVideo}/>
                    </Col>

                    <Col md={4}>
                        <VideoList
                            className="col-md-4"
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
