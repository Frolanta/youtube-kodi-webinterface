/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import Config from 'utils/Config';
import KodiUtils from 'utils/KodiUtils';
import PlaylistItemsList from 'components/PlaylistItemsList'

const style = {
    marginRight: 10
};

class Playlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        var self = this;
        var sock =  new WebSocket('ws://' + Config.kodi.ip + ':' + Config.kodi.wsPort + '/jsonrpc');
        sock.onopen = function() {
            console.log('ws connection opened');
        };
        sock.onmessage = function(e) {

            var res = JSON.parse(e.data);
            console.log(res);

            if (res.method) {
                switch (res.method) {
                    case 'Playlist.OnAdd':
                        self.refreshPlaylist();
                        break;
                    default:
                        break;
                }
            }

        };

        this.refreshPlaylist();

    }

    refreshPlaylist = () => {

        var self = this;

        this.getPlaylist(function (data) {
            if (data.limits.total > 0) {
                self.setState({items: data.items});
            }
        });
    };

    getPlaylist = (callback) => {

        KodiUtils.apiCall('Playlist.GetItems', {
            playlistid: 1,
            properties: ["title", "thumbnail", "file"]
        }, function (data) {
            callback(data);
        });
    };

    render () {
        return (
            <div className="playlist">
                <div className="controls">
                    <RaisedButton label="Play/Pause" style={style}/>
                    <RaisedButton label="Clear" style={style}/>
                    <RaisedButton label="Refresh" style={style} onClick={this.refreshPlaylist}/>
                </div>
                <Paper zDepth={1}>
                    <PlaylistItemsList items={this.state.items}></PlaylistItemsList>
                </Paper>

            </div>
        );
    }
}

export default Playlist