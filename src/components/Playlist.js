/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import Config from 'utils/Config';
import KodiUtils from 'utils/KodiUtils';
import PlaylistItemsList from 'components/PlaylistItemsList'

import IconPlay from 'material-ui/lib/svg-icons/av/play-arrow';
import IconPause from 'material-ui/lib/svg-icons/av/pause';
import IconPower from 'material-ui/lib/svg-icons/action/power-settings-new';
import IconStop from 'material-ui/lib/svg-icons/av/stop';
import IconNext from 'material-ui/lib/svg-icons/av/skip-next';
import IconPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import IconClear from 'material-ui/lib/svg-icons/communication/clear-all';

const style = {
    marginRight: 10
};

class Playlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            playing: true,
            items: [],
            openSnackBar: this.props.openSnackBar
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
                        if (res.params.data.playlistid === 1) {
                            self.refreshPlaylist();
                            self.state.openSnackBar('Video added to playlist.');
                        }
                        break;
                    case 'Playlist.OnRemove':
                        if (res.params.data.playlistid === 1) {

                            //console.log('splice at position: ' + res.params.data.position);
                            //console.log(self.state.items[res.params.data.position]);
                            //
                            //var items = self.state.items;
                            //items.splice(res.params.data.position, 1);
                            //self.setState({items: items});

                            self.refreshPlaylist();

                            self.state.openSnackBar('Video removed to playlist.');
                        }
                        break;
                    case 'Player.OnPlay':
                        if (res.params.data.player.playerid === 1) {

                            self.setState({playing: true, opened: true});
                            self.markActiveItem();
                        }
                        break;
                    case 'Player.OnPause':
                        if (res.params.data.player.playerid === 1) {
                            self.setState({playing: false});
                        }
                        break;
                    case 'Player.OnStop':
                        self.setState({opened: false});
                        break;
                    case 'Playlist.OnClear':
                        self.setState({items: []});
                        break;
                    default:
                        break;
                }
            }

        };

        this.isPlayerOpened();
        this.refreshPlaylist();

    }

    isPlayerOpened = () => {

        var self = this;

        KodiUtils.apiCall('Player.GetActivePlayers', {}, function (data) {
            if (data.length > 0 && data[0].playerid == 1) {
                self.setState({opened: true});
                self.isVideoPlaying();
            }
        });
    };

    isVideoPlaying = () => {

        var self = this;

        KodiUtils.apiCall('Player.GetProperties', {
            playerid: 1,
            properties: ["speed"]
        }, function (data) {
            if (data.speed !== 0) {
                self.setState({playing: true});
            } else {
                self.setState({playing: false});
            }
        });
    };

    markActiveItem = () => {
        this.getPlayerPosition(function (pos) {
            //todo
        });
    };

    refreshPlaylist = () => {

        var self = this;

        this.getPlaylist(function (data) {
            if (data.limits.total > 0) {
                self.setState({items: []});
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

    clearPlaylist = () => {
      KodiUtils.apiCall('Playlist.Clear', {playlistid: 1}, function (data) {
          console.log(data);
      });
    };

    openPlayer = () => {

        var self = this;

        this.getPlayerPosition(function (pos) {
           console.log(pos);

            if (pos === -1) {
                KodiUtils.apiCall('Player.Open', {
                    item: {playlistid: 1, position: 0}
                }, function (data) {
                    if (data == 'OK') {
                        self.setState({opened: true});
                    }
                });
            }

        });
    };

    getPlayerPosition = (callback) => {
        KodiUtils.apiCall('Player.GetProperties', {
            playerid: 1,
            properties: ["position"]
        }, function (data) {
            callback(data.position);
        });
    };

    playPause = () => {
        KodiUtils.apiCall('Player.PlayPause',  {
            playerid: 1,
            play: "toggle"
        }, function (data) {
            console.log(data);
        });
    };

    stopPlayer = () => {
        KodiUtils.apiCall('Player.Stop',  {
            playerid: 1
        }, function (data) {
            console.log(data);
        });
    };

    nextVideo = () => {
        KodiUtils.apiCall('Player.Move', {
            playerid: 1,
            direction: 'right'
        }, function (data) {
            console.log(data);
        });
    };

    prevVideo = () => {
        KodiUtils.apiCall('Player.Move', {
            playerid: 1,
            direction: 'left'
        }, function (data) {
            console.log(data);
        });
    };

    render () {
        return (
            <div className="playlist">
                <div className="controls">

                    <Paper zDepth={1}>

                        { !this.state.opened && <IconButton onClick={this.openPlayer}><IconPower /></IconButton>}
                        { this.state.opened && <IconButton onClick={this.stopPlayer}><IconStop /></IconButton>}

                        <IconButton onClick={this.prevVideo}><IconPrevious /></IconButton>
                        <IconButton onClick={this.playPause}>{ this.state.playing ? <IconPause /> : <IconPlay /> }</IconButton>
                        <IconButton onClick={this.nextVideo}><IconNext /></IconButton>
                        <IconButton onClick={this.clearPlaylist}><IconClear /></IconButton>

                    </Paper>

                </div>
                <Paper zDepth={1}>
                    <PlaylistItemsList items={this.state.items}></PlaylistItemsList>
                </Paper>
            </div>
        );
    }
}

export default Playlist