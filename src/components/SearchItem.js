/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import YoutubeUtils from 'utils/YoutubeUtils';
import KodiUtils from 'utils/KodiUtils';


class SearchItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            thumbnail: props.item.snippet.thumbnails.high.url,
            title: props.item.snippet.title,
            channel: props.item.id.kind === 'youtube#video' ? props.item.snippet.channelTitle : 'Playlist',
            count: '...',
            nextPageToken: null,
            type: props.item.id.kind === 'youtube#video' ? 'video' : 'playlist',
            id: props.item.id.kind === 'youtube#video' ? props.item.id.videoId: props.item.id.playlistId
        };

        if (this.state.type === 'video') {
            this.getVideoViewCount(this.state.id);
        } else {
            this.getPlaylistVideoCount(this.state.id);
        }

    }

    getVideoViewCount = (id) => {

        var self = this;

        YoutubeUtils.apiCall('videos', {
            part: 'statistics',
            id: id
        }, function (data) {
            self.setState({count: data.items[0].statistics.viewCount + ' views'});
        });
    };

    getPlaylistVideoCount = (id) => {

        var self = this;

        YoutubeUtils.apiCall('playlists', {
            part: 'contentDetails',
            id: id
        }, function (data) {
            self.setState({count: data.items[0].contentDetails.itemCount + ' songs'});
        });
    };

    addToPlaylist = () => {

        if (this.state.type === 'video') {
            KodiUtils.apiCall('Playlist.Add', {
                playlistid: 1,
                item: {
                    file: "plugin://plugin.video.youtube/?action=play_video&videoid=" + this.state.id
                }
            }, function (data) {
                console.log(data);
            });
        }

    };

    render () {
        return (
            <ListItem
                key={this.props.key}
                onClick={this.addToPlaylist}
                leftAvatar={<Avatar src={this.state.thumbnail} />}
                primaryText={this.state.title}
                secondaryText={
                        <p>
                          <span style={{color: Colors.darkBlack}}>
                            { this.state.channel }
                          </span><br/>
                          {this.state.count}
                        </p>
                }
                secondaryTextLines={2}
                />
        );
    }
}

export default SearchItem
