/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import YoutubeUtils from 'utils/YoutubeUtils';


class SearchItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            thumbnail: props.item.snippet.thumbnails.high.url,
            title: props.item.snippet.title,
            channel: props.item.id.kind === 'youtube#video' ? props.item.snippet.channelTitle : 'Playlist',
            count: '...',
            nextPageToken: null
        };

        if (props.item.id.kind === 'youtube#video') {
            this.getVideoViewCount(props.item.id.videoId);
        } else {
            this.getPlaylistVideoCount(props.item.id.playlistId);
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

    render () {
        return (
            <ListItem
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
