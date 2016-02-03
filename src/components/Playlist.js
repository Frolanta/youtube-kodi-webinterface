/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import Slider from 'material-ui/lib/slider';

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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onAdd, onRemove, onPlay, onPause, onStop, onClear, onVolumeChanged,
    refreshPlaylist, toggleSwipping, getVolume, isPlayerOpened, isVideoPlaying,
    changeVolume, getPlayingItem, toggleSnackBar } from 'actions/index';

const style = {
    padding: '10px'
};

const volumeStyle = {
    marginTop: '5px',
    marginBottom: '10px'

};

class Playlist extends Component {

    constructor(props) {
        super(props);

        var self = this;
        var sock =  new WebSocket('ws://' + Config.kodi.ip + ':' + Config.kodi.wsPort + '/jsonrpc');
        sock.onopen = function() {
            console.log('ws connection opened');
        };
        sock.onmessage = function(e) {

            var res = JSON.parse(e.data);

            if (res.method) {
                switch (res.method) {
                    case 'Playlist.OnAdd':
                        if (res.params.data.playlistid === 1) {

                            self.props.toggleSnackBar(true, 'Video added');
                            self.props.refreshPlaylist();
                        }
                        break;
                    case 'Playlist.OnRemove':
                        if (res.params.data.playlistid === 1) {
                            self.props.refreshPlaylist();
                        }
                        break;
                    case 'Player.OnPlay':
                        if (res.params.data.player.playerid === 1) {
                            self.props.toggleSnackBar(true, res.params.data.item.title);
                            self.props.onPlay();
                            self.props.getPlayingItem();
                        }
                        break;
                    case 'Player.OnPause':
                        if (res.params.data.player.playerid === 1) {
                            self.props.onPause();
                        }
                        break;
                    case 'Player.OnStop':
                        self.props.onStop();
                        break;
                    case 'Playlist.OnClear':

                        self.props.onClear();

                        break;
                    case 'Application.OnVolumeChanged':
                        if (!res.params.data.muted) {
                            self.props.onVolumeChanged(res.params.data.volume);
                        } else {
                            self.props.onVolumeChanged(0);
                        }
                        break;
                    default:
                        break;
                }
            }

        };

        this.props.getVolume();
        this.props.isPlayerOpened();
        this.props.isVideoPlaying();
        this.props.refreshPlaylist();
        this.props.getPlayingItem();

    }

    changeVolume = (e) => {

        var nv = parseInt(this.refs.sliderVolume.getValue());
        this.props.changeVolume(nv);

        if (!this.props.playlist.volumeDragging) {

            KodiUtils.apiCall('Application.SetVolume', {
                volume: nv
            }, function (data) {
                //console.log(data);
            });
        }
    };

    stopChangeVolume = (e) => {

        this.props.toggleSwipping(false);
        this.changeVolume(e);

    };

    startChangeVolume = (e) => {

        this.props.toggleSwipping(true);

    };


    render () {
        return (
            <div className="playlist">
                <div className="controls">

                    <Paper zDepth={1}>

                        { !this.props.playlist.opened && <IconButton onClick={ () => { KodiUtils.openPlayer(); } }><IconPower /></IconButton>}
                        { this.props.playlist.opened && <IconButton onClick={ () => { KodiUtils.stopPlayer(); } }><IconStop /></IconButton>}

                        <IconButton onClick={ () => { KodiUtils.skipVideo('left'); } }><IconPrevious /></IconButton>
                        <IconButton onClick={ () => { KodiUtils.playPause(); } }>{ this.props.playlist.playing ? <IconPause /> : <IconPlay /> }</IconButton>
                        <IconButton onClick={ () => { KodiUtils.skipVideo('right'); } }><IconNext /></IconButton>
                        <IconButton onClick={ () => { KodiUtils.clearPaylist(); } }><IconClear /></IconButton>

                        <div style={style}>
                            <Slider
                                ref="sliderVolume"
                                step={1}
                                disableFocusRipple={true}
                                style={volumeStyle}
                                defaultValue={10}
                                value={this.props.playlist.volume}
                                min={0}
                                max={100}
                                onDragStart={this.startChangeVolume}
                                onDragStop={this.stopChangeVolume}
                                onChange={this.changeVolume}/>
                        </div>


                    </Paper>

                </div>
                <Paper zDepth={1}>
                    <PlaylistItemsList items={this.props.playlist.items}></PlaylistItemsList>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps({ playlist }) {
    return { playlist };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ onAdd, onRemove, onPlay, onPause, onStop, onClear, onVolumeChanged,
        refreshPlaylist, toggleSwipping, getVolume, isPlayerOpened, isVideoPlaying, changeVolume, getPlayingItem, toggleSnackBar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
