/**
 * Created by Frolanta on 28/01/16.
 */
import React, { Component } from 'react'
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import YoutubeUtils from 'utils/YoutubeUtils';
import KodiUtils from 'utils/KodiUtils';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Config from 'utils/Config';


const styles = {
  playing: {
      backgroundColor: Colors.blue100
  },
  played: {
      opacity: '0.5',
      backgroundColor: 'white'
  },
  notplayed: {
      backgroundColor: 'white'
  }
};


class PlaylistItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            thumbnail: null,
            title: this.props.item.file
        };

        this.getYoutubeDetails();
    }

    getYoutubeDetails = () => {

        var id = this.props.item.file.substring(Config.youtube.pluginPath.length, this.props.item.file.length);
        var self = this;

        YoutubeUtils.apiCall('videos', {part: 'snippet', id}, function (data) {
            self.setState({
                title: data.items[0].snippet.title,
                thumbnail: data.items[0].snippet.thumbnails.high.url
            });
        });
    };

    goToVideo = () => {

        KodiUtils.apiCall('Player.GoTo', {playerid: 1, to: this.props.pos}, function (data) {
            console.log(data);
        });

    };

    removeVideo = () => {
        KodiUtils.apiCall('Playlist.Remove', {playlistid: 1, position: this.props.pos}, function (data) {
            console.log(data);
        });
    };

    render () {
        return (
            <ListItem
                style={styles[this.props.item.status]}
                leftAvatar={<Avatar src={this.props.item.status === 'playing' ? './src/images/playing.gif' : this.state.thumbnail} />}
                primaryText={this.state.title}
                rightIconButton={
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Go To" onClick={this.goToVideo}/>
                  <MenuItem primaryText="Remove" onClick={this.removeVideo}/>
                </IconMenu>
                }
                />
        );
    }
}

export default PlaylistItem

