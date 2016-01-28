/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import YoutubeUtils from 'utils/YoutubeUtils';
import KodiUtils from 'utils/KodiUtils';


class PlaylistItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            thumbnail: null,
            title: this.props.item.file,
            pos: this.props.key,
            file: this.props.item.file
        };

        this.getYoutubeDetails();
    }

    getYoutubeDetails = () => {

        var id = this.state.file.substring(57, this.state.file.length);
        var self = this;

        YoutubeUtils.apiCall('videos', {part: 'snippet', id}, function (data) {
            self.setState({
                title: data.items[0].snippet.title,
                thumbnail: data.items[0].snippet.thumbnails.high.url
            });
        });

    };

    render () {
        return (
            <ListItem
                key={this.props.key}
                leftAvatar={<Avatar src={this.state.thumbnail} />}
                primaryText={this.state.title}
                />
        );
    }
}

export default PlaylistItem

