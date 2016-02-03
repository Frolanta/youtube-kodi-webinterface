/**
 * Created by Frolanta on 28/01/16.
 */
import Config from 'utils/Config';
import superagent from 'superagent';
import superagentjsonp from 'superagent-jsonp';

var KodiUtils = {
    apiCall: function (method, params, callback) {
        var url = 'http://' + Config.kodi.ip + ':' + Config.kodi.port + '/jsonrpc';

        var data = {
            request: JSON.stringify ({
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: method
            })
        };

        superagent
            .get(url)
            .query(data)
            .use(superagentjsonp)
            .end(function(err, res) {
                if (!err) {
                    callback(res.body.result);
                }
            });
    },

    removeVideo(position) {
        return new Promise (

            function (resolve, reject) {
                KodiUtils.apiCall(
                    'Playlist.Remove',
                    {
                        playlistid: 1,
                        position: this.state.pos
                    }, function (data) {
                        resolve(data);
                    });
                }

        );
    },

    isPlayerVideoOpen () {
        return new Promise(
            function (resolve, reject) {
                KodiUtils.apiCall('Player.GetActivePlayers', {}, function (data) {
                    if (data.length > 0 && data[0].playerid == 1) {
                        resolve(true);
                    }
                    resolve(false);
                });
            }
        );
    },

    isVideoPlaying () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Player.GetProperties', {
                    playerid: 1,
                    properties: ["speed"]
                }, function (data) {
                    if (data.speed !== 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        );
    },

    getPlayerPosition () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Player.GetProperties', {
                    playerid: 1,
                    properties: ["position"]
                }, function (data) {
                    resolve(data.position);
                });
            }
        );
    },

    playPause () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Player.PlayPause',  {
                    playerid: 1,
                    play: "toggle"
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    stopPlayer () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Player.Stop',  {
                    playerid: 1
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    openPlayer () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Player.Open', {
                    item: {playlistid: 1, position: 0}
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    skipVideo (directtion) {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Player.Move', {
                    playerid: 1,
                    direction: 'right'
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    changeVolume (volume) {
        return newPromise (
            function (resolve, reject) {
                KodiUtils.apiCall('Application.SetVolume', {
                    volume: volume
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    getItems () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Playlist.GetItems', {
                    playlistid: 1,
                    properties: ["title", "thumbnail", "file"]
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    clearPaylist () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Playlist.Clear', {
                    playlistid: 1
                }, function (data) {
                    resolve(data);
                });
            }
        );
    },

    getVolume () {
        return new Promise (
            function (resolve, reject) {
                KodiUtils.apiCall('Application.GetProperties', {
                    properties: ['volume']
                }, function (data) {
                    resolve(data.volume);
                });
            }
        );
    }


};

module.exports = KodiUtils;